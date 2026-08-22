/* MathReviewWu cloud sync — Google Identity Services + progress sync API.
 * 比照 LanExamMock/poker 同一套後端（app=mathwu），跨裝置同步 localStorage 進度。
 * 2026-08-04 分級授權：擁有者可授權其他帳號「檢視(viewer)」或「共編(editor)」自己的資料；
 * 被授權人登入後可切換檢視對象（老師看學生、家長看小孩），身分各自獨立不共用帳號。 */
(function () {
  var CLIENT_ID = "481860179039-gb37qsdogd4vgnn2g5umh73jen02avj4.apps.googleusercontent.com";
  var API_BASE = "https://claudebot500.tailfcf67f.ts.net";

  if (!CLIENT_ID || !API_BASE || typeof window === "undefined") return;

  // App 內建瀏覽器（LINE/Telegram/FB 等 webview）偵測：Google 封鎖 webview 內的 OAuth，
  // GSI 元件就算載得進來，點登入也只會開出一片空白的 accounts.google.com（2026-08-15 Tony 實測）。
  var IN_WEBVIEW = (function () {
    var ua = navigator.userAgent || "";
    return /\bwv\b/.test(ua) ||
      (/iPhone|iPad|iPod/.test(ua) && !/Safari\//.test(ua)) ||
      /Line\/|FBAN|FBAV|Instagram|MicroMessenger|Telegram|LIFF/i.test(ua) ||
      !!window.TelegramWebviewProxy ||                             // Telegram iOS（UA 無任何標記，只能認注入物件）
      !!(window.webkit && window.webkit.messageHandlers);          // 其他 App 的 WKWebView（Safari 本體不會有）
  })();
  var WEBVIEW_MSG = "Google 不允許在 App 內建瀏覽器（LINE／Telegram 等）裡登入，硬走只會看到空白頁。\n請點畫面角落的選單（⋯ 或分享鈕），選「用 Safari／Chrome 開啟」，再登入即可同步進度。";

  // UIDialog 可能因混版快取（舊 HTML 沒載 dialog.js + 新 sync.js）不存在——退回原生框保底
  function dlgAlert(msg) { if (window.UIDialog) UIDialog.alert(msg); else alert(msg); }
  function dlgConfirm(msg, ok) { if (window.UIDialog) UIDialog.confirm(msg, ok); else if (confirm(msg)) ok(); }

  var TOKEN_KEY = "sync.token";
  // 長效 session（2026-08-22 Tony：「不要一直要求登入」）：Google ID token 只有 1 小時，
  // 又存在 sessionStorage，關掉分頁就沒了 → 手機幾乎每次開站都要重登。
  // 改成登入後打 POST /api/session 換一顆後端簽的 30 天 token 存 localStorage，
  // 每次開頁再換新（滾動續期，30 天內有用過就不會過期）。後端本來就有這支。
  // ⚠️ 這兩個 key 不能用 PREFIX 開頭：gatherKeys() 會把 PREFIX 開頭的 key 整包推上雲端，
  //    再同步到別台裝置 —— token 會跟著跑到別人的瀏覽器。
  var SESS_KEY = "sync.sess";
  var PROFILE_KEY = "sync.profile";
  var PREFIX = "mathwu";              // 同步所有這個前綴的 key（主 state 在 mathwu-v1）
  var MAIN_KEY = "mathwu-v1";
  var SYNC_TS_KEY = "mathwu.sync_ts";
  var VIEWAS_KEY = "mathwu.viewas";     // sessionStorage: {email, role}
  var BACKUP_KEY = "mathwu-own-backup"; // 檢視他人時，自己的 mathwu-v1 暫存於此
  var PUSH_INTERVAL_MS = 60000;
  var lastPushedHash = null;
  var grants = { granted: [], received: [] };

  function ls(k) { try { return localStorage.getItem(k) || ""; } catch (e) { return ""; } }
  // 長效 token 優先；剛登入還沒換到手時才用 sessionStorage 裡的 Google ID token
  function token() { try { return ls(SESS_KEY) || sessionStorage.getItem(TOKEN_KEY) || ""; } catch (e) { return ""; } }
  function setToken(t) { try { sessionStorage.setItem(TOKEN_KEY, t); } catch (e) {} }
  function setSess(t) {
    try { localStorage.setItem(SESS_KEY, t); sessionStorage.removeItem(TOKEN_KEY); } catch (e) {}
  }
  function clearToken() {
    try { sessionStorage.removeItem(TOKEN_KEY); } catch (e) {}
    try { localStorage.removeItem(SESS_KEY); localStorage.removeItem(PROFILE_KEY); } catch (e) {}
  }

  function viewAs() {
    try { return JSON.parse(sessionStorage.getItem(VIEWAS_KEY) || "null"); } catch (e) { return null; }
  }
  function setViewAs(v) {
    try {
      if (v) sessionStorage.setItem(VIEWAS_KEY, JSON.stringify(v));
      else sessionStorage.removeItem(VIEWAS_KEY);
    } catch (e) {}
  }

  function b64Payload(seg) {
    try { return JSON.parse(atob(seg.replace(/-/g, "+").replace(/_/g, "/"))); }
    catch (e) { return null; }
  }
  function jwtPayload(t) { return t ? b64Payload(String(t).split(".")[1] || "") : null; }
  function profile() { try { return JSON.parse(ls(PROFILE_KEY) || "null"); } catch (e) { return null; } }
  // 兩種 token 格式都吃：sess.<payload>.<sig>（後端 HMAC，payload {e:email, s:sub, x:到期毫秒}）
  // 與 Google ID token（JWT）
  function signedIn() {
    var t = token();
    if (!t) return null;
    if (t.indexOf("sess.") === 0) {
      var s = b64Payload(t.split(".")[1] || "");
      if (!s || !s.e || !(s.x > Date.now())) return null;
      var pr = profile() || {};
      return { email: s.e, sub: s.s, exp: Math.floor(s.x / 1000), name: pr.name, given_name: pr.given_name };
    }
    var p = jwtPayload(t);
    return p && p.exp * 1000 > Date.now() ? p : null;
  }

  // 拿現有 token（Google ID token 或還沒過期的 sess）換一顆新的 30 天 token。
  // 登入當下呼叫一次，之後每次開頁再呼叫一次 → 只要 30 天內開過站就永遠不用重登。
  function refreshSession(done) {
    if (!token()) { if (done) done("no token"); return; }
    grantsApi("POST", "/api/session", {}, function (err, res) {
      if (!err && res && res.token) { setSess(res.token); renderUi(); }
      if (done) done(err || null);
    });
  }

  function gatherKeys() {
    var out = {};
    try {
      for (var i = 0; i < localStorage.length; i++) {
        var k = localStorage.key(i);
        if (k && k.indexOf(PREFIX) === 0 && k !== SYNC_TS_KEY && k !== BACKUP_KEY) {
          out[k] = localStorage.getItem(k);
        }
      }
    } catch (e) {}
    return out;
  }
  function blobHash(obj) {
    var s = JSON.stringify(obj), h = 0;
    for (var i = 0; i < s.length; i++) { h = (h * 31 + s.charCodeAt(i)) | 0; }
    return h + ":" + s.length;
  }

  function api(method, body, cb, ownerEmail) {
    var xhr = new XMLHttpRequest();
    var url = API_BASE + "/api/progress?level=main&app=mathwu";
    if (ownerEmail) url += "&owner=" + encodeURIComponent(ownerEmail);
    xhr.open(method, url);
    xhr.setRequestHeader("Authorization", "Bearer " + token());
    if (body) xhr.setRequestHeader("Content-Type", "application/json");
    xhr.onload = function () {
      if (xhr.status === 401) { clearToken(); renderUi(); cb("auth"); return; }
      if (xhr.status === 403) { cb("forbidden"); return; }
      if (xhr.status < 200 || xhr.status >= 300) { cb("http " + xhr.status); return; }
      var data = null;
      try { data = JSON.parse(xhr.responseText); } catch (e) {}
      cb(null, data);
    };
    xhr.onerror = function () { cb("network"); };
    xhr.send(body ? JSON.stringify(body) : null);
  }

  function grantsApi(method, path, body, cb) {
    var xhr = new XMLHttpRequest();
    xhr.open(method, API_BASE + path);
    xhr.setRequestHeader("Authorization", "Bearer " + token());
    if (body) xhr.setRequestHeader("Content-Type", "application/json");
    xhr.onload = function () {
      var data = null;
      try { data = JSON.parse(xhr.responseText); } catch (e) {}
      if (xhr.status < 200 || xhr.status >= 300) { cb((data && data.error) || ("http " + xhr.status)); return; }
      cb(null, data);
    };
    xhr.onerror = function () { cb("network"); };
    xhr.send(body ? JSON.stringify(body) : null);
  }

  function loadGrants(cb) {
    grantsApi("GET", "/api/grants?app=mathwu", null, function (err, data) {
      if (!err && data) grants = data;
      renderUi();
      if (cb) cb();
    });
  }

  function syncTs() {
    try { return parseInt(localStorage.getItem(SYNC_TS_KEY) || "0", 10) || 0; } catch (e) { return 0; }
  }
  function setSyncTs(ts) {
    try { localStorage.setItem(SYNC_TS_KEY, String(ts)); } catch (e) {}
  }

  /* ---------------- 自己帳號的同步 ---------------- */
  function pull(done) {
    api("GET", null, function (err, res) {
      if (err || !res || !res.blob) { if (done) done(err); return; }
      var serverTs = res.updatedAt || 0;
      if (serverTs > syncTs()) {
        try {
          Object.keys(res.blob).forEach(function (k) {
            if (k.indexOf(PREFIX) === 0 && k !== BACKUP_KEY) localStorage.setItem(k, res.blob[k]);
          });
        } catch (e) {}
        setSyncTs(serverTs);
        if (done) done(null, true);   // applied → caller should reload
        return;
      }
      if (done) done(null, false);
    });
  }

  function push(done) {
    var data = gatherKeys();
    var h = blobHash(data);
    if (h === lastPushedHash) { if (done) done(null, false); return; }
    api("PUT", data, function (err, res) {
      if (err) { if (done) done(err); return; }
      lastPushedHash = h;
      if (res && res.updatedAt) setSyncTs(res.updatedAt);
      setStatus("✓ 已同步");
      if (done) done(null, true);
    });
  }

  /* ---------------- 檢視他人（老師/家長） ---------------- */
  function enterViewAs(email, role) {
    function proceed() {
      api("GET", null, function (err, res) {
        if (err) { dlgAlert(err === "forbidden" ? "對方尚未授權你（或授權已移除）" : "讀取失敗：" + err); return; }
        try {
          localStorage.setItem(BACKUP_KEY, localStorage.getItem(MAIN_KEY) || "");
          var blob = (res && res.blob) || {};
          localStorage.setItem(MAIN_KEY, blob[MAIN_KEY] || "{}");
        } catch (e) {}
        setViewAs({ email: email, role: role });
        location.reload();
      }, email);
    }
    // 先把自己的資料推上去再切換，避免切換瞬間的變更遺失
    push(function () { proceed(); });
  }

  function exitViewAs(skipPush) {
    var v = viewAs();
    function restore() {
      try {
        var backup = localStorage.getItem(BACKUP_KEY);
        if (backup !== null) {
          if (backup) localStorage.setItem(MAIN_KEY, backup);
          else localStorage.removeItem(MAIN_KEY);
          localStorage.removeItem(BACKUP_KEY);
        }
      } catch (e) {}
      setViewAs(null);
      location.reload();
    }
    if (v && v.role === "editor" && !skipPush && signedIn()) {
      pushToOwner(v.email, function () { restore(); });
    } else {
      restore();
    }
  }

  function pushToOwner(email, done) {
    var body = {};
    try { body[MAIN_KEY] = localStorage.getItem(MAIN_KEY) || "{}"; } catch (e) {}
    var h = blobHash(body);
    if (h === lastPushedHash) { if (done) done(); return; }
    api("PUT", body, function (err) {
      if (!err) { lastPushedHash = h; setStatus("✓ 已同步給對方"); }
      if (done) done(err);
    }, email);
  }

  /* ---------------- UI ---------------- */
  var ui = null, statusEl = null, statusTimer = null, panel = null;

  function setStatus(msg) {
    if (!statusEl) return;
    statusEl.textContent = msg;
    clearTimeout(statusTimer);
    statusTimer = setTimeout(function () { statusEl.textContent = ""; }, 3000);
  }

  function roleLabel(r) { return r === "editor" ? "共編" : "檢視"; }

  function renderBanner() {
    var old = document.getElementById("viewasBanner");
    if (old) old.remove();
    var v = viewAs();
    if (!v) return;
    var bar = document.createElement("div");
    bar.id = "viewasBanner";
    bar.className = "viewas-banner";
    var span = document.createElement("span");
    span.innerHTML = "👀 正在檢視 <b>" + v.email + "</b>（" + roleLabel(v.role) + "模式" +
      (v.role === "viewer" ? "，變更不會儲存" : "，變更會同步給對方") + "）";
    bar.appendChild(span);
    var btn = document.createElement("button");
    btn.className = "chip";
    btn.textContent = "返回自己";
    btn.addEventListener("click", function () { exitViewAs(); });
    bar.appendChild(btn);
    document.body.insertBefore(bar, document.getElementById("main"));
  }

  function togglePanel() {
    if (panel) { panel.remove(); panel = null; return; }
    panel = document.createElement("div");
    panel.className = "grant-panel";
    var html = "";
    if (grants.received && grants.received.length) {
      html += '<div class="gp-title">檢視對象</div>';
      html += '<div class="gp-row gp-switch" data-email="">👤 自己</div>';
      grants.received.forEach(function (g) {
        html += '<div class="gp-row gp-switch" data-email="' + g.ownerEmail + '" data-role="' + g.role + '">🎓 ' +
          g.ownerEmail + ' <span class="gp-tag">' + roleLabel(g.role) + "</span></div>";
      });
    }
    html += '<div class="gp-title">我的授權（讓別人看我的資料）</div>';
    (grants.granted || []).forEach(function (g) {
      html += '<div class="gp-row">' + g.viewer_email + ' <span class="gp-tag">' + roleLabel(g.role) +
        '</span><button class="gp-del" data-email="' + g.viewer_email + '">移除</button></div>';
    });
    html += '<div class="gp-add"><input type="email" id="gpEmail" placeholder="對方的 Gmail">' +
      '<select id="gpRole"><option value="viewer">檢視（家長）</option><option value="editor">共編（老師）</option></select>' +
      '<button id="gpAdd" class="chip">授權</button></div>' +
      '<div class="gp-hint">檢視＝只能看，變更不儲存；共編＝可標進度、寫筆記並同步給你。</div>';
    panel.innerHTML = html;
    document.body.appendChild(panel);

    panel.querySelectorAll(".gp-switch").forEach(function (row) {
      row.addEventListener("click", function () {
        var email = row.getAttribute("data-email");
        var cur = viewAs();
        panel.remove(); panel = null;
        if (!email) { if (cur) exitViewAs(); return; }
        if (cur && cur.email === email) return;
        if (cur) { dlgAlert("請先「返回自己」再切換其他對象"); return; }
        enterViewAs(email, row.getAttribute("data-role"));
      });
    });
    panel.querySelectorAll(".gp-del").forEach(function (btn) {
      btn.addEventListener("click", function (e) {
        e.stopPropagation();
        dlgConfirm("移除對 " + btn.getAttribute("data-email") + " 的授權？", function () {
          grantsApi("DELETE", "/api/grants?app=mathwu&viewerEmail=" + encodeURIComponent(btn.getAttribute("data-email")), null, function (err, data) {
            if (err) { dlgAlert("移除失敗：" + err); return; }
            grants.granted = data.granted;
            panel.remove(); panel = null; togglePanel();
          });
        });
      });
    });
    panel.querySelector("#gpAdd").addEventListener("click", function () {
      var email = panel.querySelector("#gpEmail").value.trim().toLowerCase();
      var role = panel.querySelector("#gpRole").value;
      if (!email) return;
      grantsApi("POST", "/api/grants?app=mathwu", { viewerEmail: email, role: role }, function (err, data) {
        if (err) { dlgAlert("授權失敗：" + err); return; }
        grants.granted = data.granted;
        panel.remove(); panel = null; togglePanel();
      });
    });
  }

  function renderUi() {
    if (!ui) return;
    var p = signedIn();
    if (p) {
      ui.innerHTML = "";
      statusEl = document.createElement("span");
      statusEl.className = "sync-status";
      ui.appendChild(statusEl);

      var shareBtn = document.createElement("button");
      shareBtn.className = "chip";
      shareBtn.title = "授權管理／切換檢視對象";
      shareBtn.textContent = "👥";
      shareBtn.addEventListener("click", function (e) { e.stopPropagation(); togglePanel(); });
      ui.appendChild(shareBtn);

      var chip = document.createElement("button");
      chip.className = "chip sync-chip";
      chip.title = (p.email || "") + " — 點擊登出";
      chip.textContent = (p.given_name || p.name || p.email || "?").charAt(0).toUpperCase();
      chip.addEventListener("click", function () {
        dlgConfirm("登出雲端同步？（本機進度會保留在此裝置）", function () {
          if (viewAs()) { exitViewAs(true); return; }
          clearToken(); lastPushedHash = null; renderUi();
        });
      });
      ui.appendChild(chip);
    } else {
      ui.innerHTML = "";
      statusEl = null;
      var wrap = document.createElement("div");
      wrap.className = "sync-login-wrap";
      var pill = document.createElement("button");
      pill.type = "button";
      pill.className = "chip sync-login";
      pill.textContent = "登入";
      pill.title = "Google 登入，跨裝置同步進度";
      // GSI 載入後，透明的官方按鈕會蓋在 pill 上接走點擊；
      // 沒載入（App 內建瀏覽器常擋 accounts.google.com）時 pill 仍可點，給指引
      pill.addEventListener("click", function () {
        if (!IN_WEBVIEW && window.google && google.accounts && google.accounts.id) {
          google.accounts.id.prompt();
        } else {
          dlgAlert(WEBVIEW_MSG);
        }
      });
      var slot = document.createElement("div");
      slot.className = "gsi-slot";
      // 空 slot 是蓋在 pill 上的透明層，會把點擊整個吃掉（2026-08-16 Tony 在 K12Review
      // 實測：LINE webview 裡 GSI 不載入、slot 永遠是空的 → 登入鈕完全按不動）。
      // 預設關掉 pointer-events，等官方按鈕真的掛上去才打開；webview 乾脆不掛 slot。
      slot.style.pointerEvents = "none";
      wrap.appendChild(pill);
      if (!IN_WEBVIEW) wrap.appendChild(slot);
      ui.appendChild(wrap);
      // webview 裡不掛官方按鈕：它會蓋在 pill 上把點擊帶進空白登入頁
      if (!IN_WEBVIEW && window.google && google.accounts && google.accounts.id) {
        slot.style.pointerEvents = "";
        google.accounts.id.renderButton(slot, { type: "icon", shape: "circle", size: "large" });
      }
    }
  }

  function onCredential(resp) {
    if (!resp || !resp.credential) return;
    setToken(resp.credential);
    // sess token 裡只有 email，頭像字母要用的名字先留一份在本機
    var p = jwtPayload(resp.credential) || {};
    try {
      localStorage.setItem(PROFILE_KEY, JSON.stringify({
        email: p.email || "", name: p.name || "", given_name: p.given_name || "",
      }));
    } catch (e) {}
    renderUi();
    setStatus("同步中…");
    loadGrants();
    if (viewAs()) { refreshSession(); return; }   // 檢視模式中重新登入（token 過期），不動資料
    // 先換長效 token 再同步：換到手才算真的「登入一次就好」
    refreshSession(function () {
      pull(function (err, applied) {
        if (applied) { location.reload(); return; }
        push();
      });
    });
  }

  function initGis() {
    google.accounts.id.initialize({ client_id: CLIENT_ID, callback: onCredential, auto_select: true });
    renderUi();
  }

  function boot() {
    // 安全復原：上次檢視他人途中瀏覽器被關（sessionStorage 消失），把自己的資料還原
    if (!viewAs()) {
      try {
        var backup = localStorage.getItem(BACKUP_KEY);
        if (backup !== null) {
          if (backup) localStorage.setItem(MAIN_KEY, backup);
          localStorage.removeItem(BACKUP_KEY);
          location.reload();
          return;
        }
      } catch (e) {}
    }

    var controls = document.querySelector(".topbar-controls");
    if (!controls) return;
    ui = document.createElement("div");
    ui.className = "sync-ui";
    controls.appendChild(ui);
    renderUi(); // 先畫出登入鈕：GSI 被擋（App 內建瀏覽器）時入口也不能消失（2026-08-15 Tony 回報）

    renderBanner();

    if (!IN_WEBVIEW) {
      var s = document.createElement("script");
      s.src = "https://accounts.google.com/gsi/client";
      s.async = true;
      s.onload = initGis;
      document.head.appendChild(s);
    }

    // 開頁時若已是登入狀態（30 天 sess token）：續期一次再拉雲端進度
    if (signedIn()) {
      refreshSession();
      loadGrants();
      if (!viewAs()) pull(function (err, applied) { if (applied) location.reload(); });
    }

    setInterval(function () {
      if (!signedIn()) return;
      var v = viewAs();
      if (v) { if (v.role === "editor") pushToOwner(v.email); return; }
      push();
    }, PUSH_INTERVAL_MS);
    document.addEventListener("visibilitychange", function () {
      if (document.visibilityState !== "hidden" || !signedIn()) return;
      var v = viewAs();
      if (v) { if (v.role === "editor") pushToOwner(v.email); return; }
      push();
    });
    document.addEventListener("click", function (e) {
      if (panel && !panel.contains(e.target)) { panel.remove(); panel = null; }
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
})();
