/* 國中數學總複習 — 應用邏輯（vanilla JS，資料存 localStorage，key: mathwu-v1） */
(function () {
  'use strict';
  var LS_KEY = 'mathwu-v1';
  var BOOK_NAMES = { 1:'第一冊', 2:'第二冊', 3:'第三冊', 4:'第四冊', 5:'第五冊', 6:'第六冊' };
  var BOOK_GRADE = { 1:'七上', 2:'七下', 3:'八上', 4:'八下', 5:'九上', 6:'九下' };
  var STATUS = [
    { key:'taught', label:'已教過', cls:'on-taught' },
    { key:'weak',   label:'需加強', cls:'on-weak' },
    { key:'master', label:'已精熟', cls:'on-master' }
  ];
  var BOOK_ICON = { 1:'📘', 2:'📗', 3:'📙', 4:'📕', 5:'📔', 6:'📓' };
  var THEMES = [
    { key:'',       name:'深夜藍', dot:'#1b2130' },
    { key:'white',  name:'純淨白', dot:'#f2f0ea' },
    { key:'forest', name:'森林綠', dot:'#1a2b22' },
    { key:'sakura', name:'櫻花粉', dot:'#fbdde6' },
    { key:'sunny',  name:'暖陽杏', dot:'#f5e3c8' },
    { key:'violet', name:'紫夜',   dot:'#332752' }
  ];

  function $(id) { return document.getElementById(id); }

  /* ---------- state ---------- */
  var state = load();
  function load() {
    try {
      var s = JSON.parse(localStorage.getItem(LS_KEY) || '{}');
      s.status = s.status || {};   // unitId -> taught|weak|master
      s.notes = s.notes || {};     // conceptId -> text
      s.hl = s.hl || {};           // conceptId -> [{t:文字, n:第幾次出現, c:顏色}]
      s.ink = s.ink || {};         // conceptId -> {h:高度/寬度比, s:[{c:筆, p:[x,y,...] 以寬度正規化}]}（白紙畫布）
      s.ol = s.ol || {};           // conceptId -> {s:[...]}（整頁覆蓋層筆跡，座標以卡片寬正規化）
      s.book = s.book || 1;
      return s;
    } catch (e) { return { status:{}, notes:{}, hl:{}, ink:{}, ol:{}, book:1 }; }
  }
  function save() {
    try { localStorage.setItem(LS_KEY, JSON.stringify(state)); } catch (e) {}
  }

  /* ---------- helpers ---------- */
  var ALL = MATH_UNITS.concat();           // 已轉錄
  var TODO = (typeof MATH_UNITS_TODO !== 'undefined') ? MATH_UNITS_TODO : [];
  function unitById(id) { for (var i = 0; i < ALL.length; i++) if (ALL[i].id === id) return ALL[i]; return null; }
  function unitsOfBook(b) {
    var done = ALL.filter(function (u) { return u.book === b; });
    var todo = TODO.filter(function (u) { return u.book === b; });
    return { done:done, todo:todo };
  }
  function noteCount(u) {
    var n = 0;
    (u.concepts || []).forEach(function (c) { if ((state.notes[c.id] || '').trim()) n++; });
    return n;
  }
  function inkCount(u) {
    var n = 0;
    (u.concepts || []).forEach(function (c) {
      var a = state.ink[c.id], b = state.ol[c.id];
      if ((a && a.s && a.s.length) || (b && b.s && b.s.length)) n++;
    });
    return n;
  }
  function renderMath(el) {
    if (typeof renderMathInElement === 'function') {
      renderMathInElement(el, {
        delimiters: [
          { left:'$$', right:'$$', display:true },
          { left:'$', right:'$', display:false }
        ],
        throwOnError: false
      });
    }
  }

  /* ---------- views ---------- */
  var views = ['view-home', 'view-unit', 'view-progress', 'view-help', 'view-formulas', 'view-search'];
  function show(v) {
    views.forEach(function (id) { $(id).classList.toggle('hidden', id !== v); });
    if (v !== 'view-unit' && OL.mode) olToggle(false);
    window.scrollTo(0, 0);
  }

  /* ---------- home ---------- */
  function renderHome() {
    var tabs = $('bookTabs');
    tabs.innerHTML = '';
    for (var b = 1; b <= 6; b++) {
      (function (b) {
        var t = document.createElement('div');
        t.className = 'book-tab' + (state.book === b ? ' active' : '');
        t.innerHTML = '<span class="bicon">' + BOOK_ICON[b] + '</span>' + BOOK_NAMES[b] + '<small>' + BOOK_GRADE[b] + '</small>';
        t.addEventListener('click', function () { state.book = b; save(); renderHome(); });
        tabs.appendChild(t);
      })(b);
    }
    var list = $('unitList');
    list.innerHTML = '';
    var g = unitsOfBook(state.book);
    g.done.forEach(function (u) {
      var st = state.status[u.id] || '';
      var item = document.createElement('div');
      item.className = 'unit-item' + (st ? ' st-' + st : '');
      var stDef = STATUS.filter(function (s) { return s.key === st; })[0];
      var nc = noteCount(u);
      var ik = inkCount(u);
      item.innerHTML =
        '<span class="sec">' + u.sec + '</span>' +
        '<span class="name">' + u.title +
          '<small>' + (u.concepts || []).length + ' 個觀念' + (nc ? ' · 📝 ' + nc + ' 則筆記' : '') + (ik ? ' · ✍️ ' + ik + ' 則手寫' : '') + '</small></span>' +
        '<span class="st-label ' + (st || 'none') + '">' + (stDef ? stDef.label : '未教') + '</span>';
      item.addEventListener('click', function () { openUnit(u.id); });
      list.appendChild(item);
    });
    g.todo.forEach(function (u) {
      var item = document.createElement('div');
      item.className = 'unit-item todo';
      item.innerHTML =
        '<span class="sec">' + u.sec + '</span>' +
        '<span class="name">' + u.title + '<small>整理中，即將上線</small></span>' +
        '<span class="st-label none">⋯</span>';
      list.appendChild(item);
    });
  }

  /* ---------- unit ---------- */
  var currentUnit = null;
  function openUnit(id) {
    var u = unitById(id);
    if (!u) return;
    currentUnit = u;
    $('unitCrumb').textContent = BOOK_NAMES[u.book] + '（' + BOOK_GRADE[u.book] + '）· 講義第 ' + u.page + ' 頁';
    $('unitTitle').textContent = u.sec + ' ' + u.title;
    renderStatusBtns();
    var list = $('conceptList');
    list.innerHTML = '';
    inkLive.length = 0;
    if (!Object.keys(state.hl).length && !Object.keys(state.ink).length) {
      var hint = document.createElement('div');
      hint.className = 'use-hint';
      hint.innerHTML = '💡 選取重點文字可畫<b>螢光筆</b>；按右下 ✍️ 可<b>直接寫在重點上</b>；卡片底部另有白紙手寫區';
      list.appendChild(hint);
    }
    (u.concepts || []).forEach(function (c, ci) {
      var card = document.createElement('div');
      card.className = 'concept';
      var html = '<div class="c-body" data-cid="' + c.id + '">' +
        '<h3><span class="cnum">' + (ci + 1) + '</span>' + c.title + '</h3>' + c.body;
      if (c.fig) {
        html += '<div class="concept-fig"><img src="img/figs/' + c.fig + '.svg" alt="' + c.title + ' 圖示" onerror="this.parentNode.style.display=\'none\'"></div>';
      }
      if (c.examples && c.examples.length) {
        html += '<div class="ex-block"><div class="ex-head">✏️ 例題練習</div>';
        var D_LABEL = { '易':'基礎', '中':'一般', '難':'精熟' };
        c.examples.forEach(function (ex, ei) {
          var tag = ex.d && D_LABEL[ex.d]
            ? '<span class="exnum ex-d-' + ex.d + '">' + D_LABEL[ex.d] + '</span>'
            : '<span class="exnum">例' + (ei + 1) + '</span>';
          html += '<div class="example">' +
            '<div class="q">' + tag + ex.q + '</div>' +
            '<button class="toggle-sol" data-c="' + c.id + '" data-e="' + ei + '">看解答</button>' +
            '<div class="sol hidden"><ol>' +
              ex.steps.map(function (s) { return '<li class="s-hide">' + s + '</li>'; }).join('') +
            '</ol><button type="button" class="step-next">下一步 ▶</button>' +
            '<div class="ans s-hide">答：' + ex.ans + '</div></div></div>';
        });
        html += '</div>';
      }
      html += '</div>';   // /.c-body（螢光筆作用範圍）
      // 互動圖形放 c-body 外：內容會隨操作即時變動，不能影響螢光筆的文字定位
      if (window.MATH_IFIGS && MATH_IFIGS[c.id]) {
        html += '<div class="ifig-box" data-ifig="' + c.id + '"></div>';
      }
      html += '<div class="note-area"><label>📝 我的筆記 <span class="note-saved" id="saved-' + c.id + '">✓ 已存</span></label>' +
        '<textarea id="note-' + c.id + '" placeholder="寫下老師補充、易錯點、自己的想法…"></textarea></div>';
      var hasInk = state.ink[c.id] && state.ink[c.id].s && state.ink[c.id].s.length;
      html += '<div class="ink-area" data-cid="' + c.id + '">' +
        '<button type="button" class="ink-toggle">✍️ 手寫筆記 <span class="ink-dot' + (hasInk ? '' : ' hidden') + '">●</span><span class="ink-arrow">▾</span></button>' +
        '<div class="ink-wrap hidden"></div></div>';
      card.innerHTML = html;
      list.appendChild(card);
    });
    // 筆記載入 + 自動儲存
    (u.concepts || []).forEach(function (c) {
      var ta = $('note-' + c.id);
      if (!ta) return;
      ta.value = state.notes[c.id] || '';
      var timer = null;
      ta.addEventListener('input', function () {
        clearTimeout(timer);
        timer = setTimeout(function () {
          state.notes[c.id] = ta.value;
          save();
          var badge = $('saved-' + c.id);
          if (badge) { badge.classList.add('show'); setTimeout(function () { badge.classList.remove('show'); }, 1500); }
        }, 500);
      });
    });
    // 解答開關＋逐步展開（2026-08-11）：打開只亮第 1 步，「下一步」逐步揭示，最後才給答案
    function solReset(sol) {
      var lis = sol.querySelectorAll('ol li');
      lis.forEach(function (li) { li.classList.add('s-hide'); li.classList.remove('s-show'); });
      var ans = sol.querySelector('.ans');
      ans.classList.add('s-hide'); ans.classList.remove('s-show');
      var nx = sol.querySelector('.step-next');
      nx.classList.remove('hidden');
      if (lis[0]) { lis[0].classList.remove('s-hide'); lis[0].classList.add('s-show'); }
      nx.textContent = lis.length > 1 ? '下一步 ▶' : '看答案 ▶';
    }
    list.querySelectorAll('.toggle-sol').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var sol = btn.nextElementSibling;
        var open = sol.classList.toggle('hidden');
        btn.textContent = open ? '看解答' : '收起解答';
        if (!open) solReset(sol);   // 每次打開都從第 1 步重來
      });
    });
    list.querySelectorAll('.step-next').forEach(function (nx) {
      nx.addEventListener('click', function () {
        var sol = nx.closest('.sol');
        var hid = sol.querySelectorAll('ol li.s-hide');
        if (hid.length) {
          hid[0].classList.remove('s-hide'); hid[0].classList.add('s-show');
          nx.textContent = hid.length > 1 ? '下一步 ▶' : '看答案 ▶';
        } else {
          var ans = sol.querySelector('.ans');
          ans.classList.remove('s-hide'); ans.classList.add('s-show');
          nx.classList.add('hidden');
        }
      });
    });
    // 手寫筆記開關（首次展開才建畫布）
    list.querySelectorAll('.ink-toggle').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var area = btn.parentNode;
        var wrap = area.querySelector('.ink-wrap');
        var nowHidden = wrap.classList.toggle('hidden');
        btn.classList.toggle('open', !nowHidden);
        if (!nowHidden && !wrap.getAttribute('data-init')) {
          wrap.setAttribute('data-init', '1');
          initInk(area.getAttribute('data-cid'), wrap, btn);
        }
      });
    });
    // 上一/下一單元
    var idx = ALL.indexOf(u);
    $('prevUnit').style.visibility = idx > 0 ? 'visible' : 'hidden';
    $('nextUnit').style.visibility = idx < ALL.length - 1 ? 'visible' : 'hidden';
    renderMath(list);
    OL.live = {};
    (u.concepts || []).forEach(function (c) {
      applyHl(c.id);
      var body = cBody(c.id);
      if (body) setupOverlay(body.parentNode, c.id);   // .concept 卡片
    });
    show('view-unit');
    // 互動圖形（js/interactive.js 有登錄的觀念才有）
    if (window.MATH_IFIGS) {
      list.querySelectorAll('.ifig-box').forEach(function (b) {
        if (b.getAttribute('data-init')) return;
        b.setAttribute('data-init', '1');
        try { MATH_IFIGS[b.getAttribute('data-ifig')](b); } catch (e) {}
      });
    }
  }

  function renderStatusBtns() {
    var wrap = $('statusBtns');
    wrap.innerHTML = '';
    var cur = state.status[currentUnit.id] || '';
    STATUS.forEach(function (s) {
      var b = document.createElement('button');
      b.className = 'chip' + (cur === s.key ? ' ' + s.cls : '');
      b.textContent = s.label;
      b.addEventListener('click', function () {
        state.status[currentUnit.id] = (state.status[currentUnit.id] === s.key) ? '' : s.key;
        save();
        renderStatusBtns();
      });
      wrap.appendChild(b);
    });
  }

  /* ---------- progress ---------- */
  function renderProgress() {
    var grid = $('progressGrid');
    var counts = { taught:0, weak:0, master:0, none:0 };
    ALL.forEach(function (u) {
      var st = state.status[u.id];
      if (st && counts[st] !== undefined) counts[st]++; else counts.none++;
    });
    var noteTotal = 0;
    Object.keys(state.notes).forEach(function (k) { if ((state.notes[k] || '').trim()) noteTotal++; });
    var inkTotal = 0, inkSeen = {};
    [state.ink, state.ol].forEach(function (m) {
      Object.keys(m).forEach(function (k) {
        var r = m[k];
        if (r && r.s && r.s.length && !inkSeen[k]) { inkSeen[k] = 1; inkTotal++; }
      });
    });
    var html = '<div class="pg-stats">' +
      '<div class="pg-stat"><b>' + counts.master + '</b><small>已精熟</small></div>' +
      '<div class="pg-stat"><b>' + counts.taught + '</b><small>已教過</small></div>' +
      '<div class="pg-stat"><b>' + counts.weak + '</b><small>需加強</small></div>' +
      '<div class="pg-stat"><b>' + noteTotal + '</b><small>筆記則數</small></div>' +
      '<div class="pg-stat"><b>' + inkTotal + '</b><small>手寫筆記</small></div></div>';
    grid.innerHTML = html;
    for (var b = 1; b <= 6; b++) {
      var g = unitsOfBook(b);
      if (!g.done.length) continue;
      var sec = document.createElement('div');
      sec.className = 'pg-book';
      sec.innerHTML = '<h3>' + BOOK_NAMES[b] + '（' + BOOK_GRADE[b] + '）</h3>';
      g.done.forEach(function (u) {
        var st = state.status[u.id] || '';
        var stDef = STATUS.filter(function (s) { return s.key === st; })[0];
        var row = document.createElement('div');
        row.className = 'pg-row';
        row.innerHTML = '<span class="sec">' + u.sec + '</span><span class="name">' + u.title + '</span>' +
          '<span class="note-badge">' + (noteCount(u) ? '📝' + noteCount(u) : '') + (inkCount(u) ? ' ✍️' + inkCount(u) : '') + '</span>' +
          '<span class="st-label ' + (st || 'none') + '">' + (stDef ? stDef.label : '未教') + '</span>';
        (function (id) { row.addEventListener('click', function () { openUnit(id); }); })(u.id);
        sec.appendChild(row);
      });
      grid.appendChild(sec);
    }
    show('view-progress');
  }

  /* ---------- 螢光筆 ----------
   * 存法：state.hl[conceptId] = [{t:選取文字, n:在卡片全文第幾次出現, c:'y|g|p'}]
   * 以「文字＋出現序」定位而非 DOM 偏移，重新渲染（含 KaTeX）後仍能還原；找不到就靜默跳過。 */
  function cBody(cid) { return document.querySelector('.c-body[data-cid="' + cid + '"]'); }
  function textNodesOf(el) {
    var w = document.createTreeWalker(el, NodeFilter.SHOW_TEXT, null, false), out = [], n;
    while ((n = w.nextNode())) out.push(n);
    return out;
  }
  function unwrapHl(el) {
    var marks = el.querySelectorAll('mark.hl');
    for (var i = 0; i < marks.length; i++) {
      var m = marks[i], p = m.parentNode;
      while (m.firstChild) p.insertBefore(m.firstChild, m);
      p.removeChild(m);
      p.normalize();
    }
  }
  function applyHl(cid) {
    var body = cBody(cid);
    if (!body) return;
    unwrapHl(body);
    (state.hl[cid] || []).forEach(function (r, ri) {
      if (!r.t) return;
      var nodes = textNodesOf(body);
      var full = nodes.map(function (n) { return n.nodeValue; }).join('');
      var pos = -1, from = 0;
      for (var k = 0; k <= (r.n || 0); k++) {
        pos = full.indexOf(r.t, from);
        if (pos < 0) return;
        from = pos + 1;
      }
      var end = pos + r.t.length, off = 0, segs = [];
      for (var i = 0; i < nodes.length && off < end; i++) {
        var len = nodes[i].nodeValue.length;
        if (off + len > pos && off < end) {
          segs.push({ node: nodes[i], s: Math.max(0, pos - off), e: Math.min(len, end - off) });
        }
        off += len;
      }
      for (var j = segs.length - 1; j >= 0; j--) {   // 由後往前包，前面的偏移才不會失效
        var sg = segs[j];
        if (sg.e <= sg.s || !sg.node.nodeValue.slice(sg.s, sg.e).trim()) continue;
        var rg = document.createRange();
        rg.setStart(sg.node, sg.s);
        rg.setEnd(sg.node, sg.e);
        var mk = document.createElement('mark');
        mk.className = 'hl hl-' + (r.c || 'y');
        mk.setAttribute('data-cid', cid);
        mk.setAttribute('data-ri', ri);
        try { rg.surroundContents(mk); } catch (e) {}
      }
    });
  }

  var hlBubble = null;
  function hideHlBubble() { if (hlBubble) { hlBubble.remove(); hlBubble = null; } }
  function placeBubble(rect) {
    document.body.appendChild(hlBubble);
    var bw = hlBubble.offsetWidth;
    var x = Math.max(8, Math.min(window.innerWidth - bw - 8, rect.left + rect.width / 2 - bw / 2));
    hlBubble.style.left = (x + window.scrollX) + 'px';
    hlBubble.style.top = (rect.bottom + window.scrollY + 8) + 'px';
  }
  function showHlBubble() {
    hideHlBubble();
    var sel = window.getSelection();
    if (!sel || sel.isCollapsed || !sel.rangeCount) return;
    var rg = sel.getRangeAt(0);
    var anc = rg.commonAncestorContainer;
    var el = anc.nodeType === 1 ? anc : anc.parentNode;
    if (!el || !el.closest) return;
    var body = el.closest('.c-body');
    if (!body || !rg.toString().trim()) return;
    hlBubble = document.createElement('div');
    hlBubble.className = 'hl-bubble';
    hlBubble.innerHTML = '<span class="hl-tip">🖊️</span>' + ['y', 'g', 'p'].map(function (c) {
      return '<button type="button" class="hl-dot ' + c + '" data-hlc="' + c + '" title="畫螢光筆"></button>';
    }).join('');
    hlBubble.addEventListener('pointerdown', function (e) {
      e.preventDefault();          // 別讓點按清掉選取
      e.stopPropagation();
      var c = e.target.getAttribute && e.target.getAttribute('data-hlc');
      if (c) commitHl(body, c);
    });
    placeBubble(rg.getBoundingClientRect());
  }
  function commitHl(body, color) {
    var sel = window.getSelection();
    if (!sel || !sel.rangeCount) return;
    var rg = sel.getRangeAt(0);
    var t = rg.toString();
    if (!t) return;
    var cid = body.getAttribute('data-cid');
    var pre = document.createRange();
    pre.selectNodeContents(body);
    pre.setEnd(rg.startContainer, rg.startOffset);
    var start = pre.toString().length;
    var nodes = textNodesOf(body);
    var full = nodes.map(function (n) { return n.nodeValue; }).join('');
    if (full.substr(start, t.length) !== t) {
      start = full.indexOf(t);
      if (start < 0) return;
    }
    var n = 0, idx = full.indexOf(t);
    while (idx >= 0 && idx < start) { n++; idx = full.indexOf(t, idx + 1); }
    if (!state.hl[cid]) state.hl[cid] = [];
    state.hl[cid].push({ t: t, n: n, c: color });
    save();
    sel.removeAllRanges();
    hideHlBubble();
    applyHl(cid);
  }
  function showHlRemove(mk) {
    hideHlBubble();
    hlBubble = document.createElement('div');
    hlBubble.className = 'hl-bubble';
    var btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'hl-del';
    btn.textContent = '🧽 移除螢光筆';
    btn.addEventListener('pointerdown', function (e) {
      e.preventDefault();
      e.stopPropagation();
      var cid = mk.getAttribute('data-cid');
      var ri = parseInt(mk.getAttribute('data-ri'), 10);
      if (state.hl[cid] && ri >= 0 && ri < state.hl[cid].length) {
        state.hl[cid].splice(ri, 1);
        if (!state.hl[cid].length) delete state.hl[cid];
        save();
        applyHl(cid);
      }
      hideHlBubble();
    });
    hlBubble.appendChild(btn);
    placeBubble(mk.getBoundingClientRect());
  }

  /* ---------- 手寫筆記 ----------
   * 存法：state.ink[conceptId] = {h:畫布高/寬比, s:[{c:筆, p:[x,y,x,y,...] 以畫布寬正規化}]}
   * 向量筆跡：換裝置換寬度時等比重畫，資料量小、可同步。 */
  var INK_PENS = [
    { k: 'k', c: '#222831', w: 2.5, name: '黑筆' },
    { k: 'r', c: '#c0392b', w: 2.5, name: '紅筆' },
    { k: 'b', c: '#1a5fb4', w: 2.5, name: '藍筆' },
    { k: 'h', c: 'rgba(255,205,0,.45)', w: 14, name: '螢光筆刷' }
  ];
  var inkLive = [];   // 已開畫布的 resize 函式，視窗變寬時重畫
  function penOf(k) {
    for (var i = 0; i < INK_PENS.length; i++) if (INK_PENS[i].k === k) return INK_PENS[i];
    return INK_PENS[0];
  }
  function rnd3(v) { return Math.round(v * 1000) / 1000; }
  function inkLW(pen, cssW) { return pen.w * Math.max(0.6, Math.min(1.5, cssW / 560)); }
  function inkPath(ctx, p, cssW) {
    ctx.beginPath();
    var n = p.length;
    ctx.moveTo(p[0] * cssW, p[1] * cssW);
    if (n < 4) {
      ctx.lineTo(p[0] * cssW + 0.1, p[1] * cssW);
    } else {
      for (var i = 2; i + 3 < n; i += 2) {
        var mx = (p[i] + p[i + 2]) / 2 * cssW, my = (p[i + 1] + p[i + 3]) / 2 * cssW;
        ctx.quadraticCurveTo(p[i] * cssW, p[i + 1] * cssW, mx, my);
      }
      ctx.lineTo(p[n - 2] * cssW, p[n - 1] * cssW);
    }
    ctx.stroke();
  }
  function inkRedrawAll(ctx, strokes, cssW, cssH) {
    ctx.clearRect(0, 0, cssW, cssH);
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    strokes.forEach(function (st) {
      var pen = penOf(st.c);
      ctx.strokeStyle = pen.c;
      ctx.lineWidth = inkLW(pen, cssW);
      inkPath(ctx, st.p, cssW);
    });
  }
  function inkSegment(ctx, cur, cssW) {   // 畫進行中筆畫的最後一小段
    var pen = penOf(cur.c), n = cur.p.length;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.strokeStyle = pen.c;
    ctx.lineWidth = inkLW(pen, cssW);
    ctx.beginPath();
    ctx.moveTo(cur.p[n - 4] * cssW, cur.p[n - 3] * cssW);
    ctx.lineTo(cur.p[n - 2] * cssW, cur.p[n - 1] * cssW);
    ctx.stroke();
  }
  function initInk(cid, wrap, toggleBtn) {
    var rec = state.ink[cid] || { h: 0.6, s: [] };
    var tool = 'k', undoStack = [];
    var tools = document.createElement('div');
    tools.className = 'ink-tools';
    var canvas = document.createElement('canvas');
    canvas.className = 'ink-canvas';
    var ctx = canvas.getContext('2d');

    function mkTool(icon, title, fn) {
      var b = document.createElement('button');
      b.type = 'button';
      b.className = 'ink-tool';
      b.textContent = icon;
      b.title = title;
      b.addEventListener('click', fn);
      tools.appendChild(b);
      return b;
    }
    function setOn(btn) {
      tools.querySelectorAll('.ink-pen').forEach(function (x) { x.classList.remove('on'); });
      btn.classList.add('on');
    }
    INK_PENS.forEach(function (p) {
      var b = document.createElement('button');
      b.type = 'button';
      b.className = 'ink-tool ink-pen' + (p.k === tool ? ' on' : '');
      b.style.background = p.c;
      b.title = p.name;
      b.addEventListener('click', function () { tool = p.k; setOn(b); });
      tools.appendChild(b);
    });
    var eraser = mkTool('🧽', '橡皮擦（擦到的整筆刪除）', function () { tool = 'e'; setOn(eraser); });
    eraser.classList.add('ink-pen');
    mkTool('↩️', '復原', function () {
      if (!undoStack.length) return;
      rec.s = undoStack.pop();
      redraw();
      commit();
    });
    mkTool('⬇️', '加高畫布', function () {
      rec.h = Math.min(3, (rec.h || 0.6) + 0.3);
      resize();
      commit();
    });
    mkTool('🗑️', '全部清除', function () {
      if (!rec.s.length) return;
      UIDialog.confirm('清除這個觀念的手寫筆記？', function () {
        pushUndo();
        rec.s = [];
        redraw();
        commit();
      });
    });
    wrap.appendChild(tools);
    wrap.appendChild(canvas);

    var cssW = 0, cssH = 0;
    function resize() {
      cssW = wrap.clientWidth || 300;
      cssH = Math.round(cssW * (rec.h || 0.6));
      var dpr = window.devicePixelRatio || 1;
      canvas.style.height = cssH + 'px';
      canvas.width = Math.round(cssW * dpr);
      canvas.height = Math.round(cssH * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      redraw();
    }
    function redraw() { inkRedrawAll(ctx, rec.s, cssW, cssH); }
    function commit() {
      if (rec.s.length) state.ink[cid] = rec;
      else delete state.ink[cid];
      save();
      var dot = toggleBtn.querySelector('.ink-dot');
      if (dot) dot.classList.toggle('hidden', !rec.s.length);
    }
    function pushUndo() {
      undoStack.push(rec.s.slice());
      if (undoStack.length > 30) undoStack.shift();
    }
    function xy(e) {
      var r = canvas.getBoundingClientRect();
      return { x: e.clientX - r.left, y: e.clientY - r.top };
    }
    function eraseAt(pt) {
      var th = 14, hit = false;
      for (var i = rec.s.length - 1; i >= 0; i--) {
        var p = rec.s[i].p;
        for (var j = 0; j + 1 < p.length; j += 2) {
          var dx = p[j] * cssW - pt.x, dy = p[j + 1] * cssW - pt.y;
          if (dx * dx + dy * dy < th * th) {
            if (!hit) { pushUndo(); hit = true; }
            rec.s.splice(i, 1);
            break;
          }
        }
      }
      if (hit) { redraw(); commit(); }
    }

    var drawing = false, erasing = false, cur = null, lastX = 0, lastY = 0;
    canvas.addEventListener('pointerdown', function (e) {
      e.preventDefault();
      try { canvas.setPointerCapture(e.pointerId); } catch (err) {}
      var pt = xy(e);
      if (tool === 'e') { erasing = true; eraseAt(pt); return; }
      drawing = true;
      cur = { c: tool, p: [rnd3(pt.x / cssW), rnd3(pt.y / cssW)] };
      lastX = pt.x;
      lastY = pt.y;
    });
    canvas.addEventListener('pointermove', function (e) {
      var pt = xy(e);
      if (erasing) { eraseAt(pt); return; }
      if (!drawing || !cur) return;
      var dx = pt.x - lastX, dy = pt.y - lastY;
      if (dx * dx + dy * dy < 4) return;
      cur.p.push(rnd3(pt.x / cssW), rnd3(pt.y / cssW));
      lastX = pt.x;
      lastY = pt.y;
      inkSegment(ctx, cur, cssW);
    });
    function endStroke() {
      if (erasing) { erasing = false; return; }
      if (!drawing) return;
      drawing = false;
      if (cur && cur.p.length >= 2) {
        pushUndo();
        rec.s.push(cur);
        redraw();
        commit();
      }
      cur = null;
    }
    canvas.addEventListener('pointerup', endStroke);
    canvas.addEventListener('pointercancel', endStroke);

    inkLive.push(resize);
    resize();
  }

  /* ---------- 整頁手寫（覆蓋在重點上） ----------
   * 每張觀念卡疊一層透明 canvas，開「寫字模式」後直接在重點旁邊寫；
   * 平常 pointer-events:none 不擋點擊與選字，筆跡永遠顯示。
   * 存法：state.ol[conceptId] = {s:[{c,p[]}]}，座標以卡片寬正規化。 */
  var OL = { mode: false, tool: 'k', tools: null, live: {}, undo: [] };
  function olCommit(cid, rec) {
    if (rec.s.length) state.ol[cid] = rec;
    else delete state.ol[cid];
    save();
  }
  function olUndo() {
    var u = OL.undo.pop();
    if (!u) return;
    var live = OL.live[u.cid];
    if (live) {
      live.rec.s = u.snap;
      olCommit(u.cid, live.rec);
      live.redraw();
    } else {
      var rec = state.ol[u.cid] || { s: [] };
      rec.s = u.snap;
      olCommit(u.cid, rec);
    }
  }
  function olPushUndo(cid, rec) {
    OL.undo.push({ cid: cid, snap: rec.s.slice() });
    if (OL.undo.length > 50) OL.undo.shift();
  }
  function setupOverlay(card, cid) {
    var canvas = document.createElement('canvas');
    canvas.className = 'ol-canvas';
    card.appendChild(canvas);
    var ctx = canvas.getContext('2d');
    var rec = state.ol[cid] || { s: [] };
    var cssW = 0, cssH = 0;
    function resize() {
      var r = card.getBoundingClientRect();
      cssW = r.width || card.offsetWidth || 300;
      cssH = r.height || card.offsetHeight || 200;
      var dpr = window.devicePixelRatio || 1;
      canvas.width = Math.round(cssW * dpr);
      canvas.height = Math.round(cssH * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      redraw();
    }
    function redraw() { inkRedrawAll(ctx, rec.s, cssW, cssH); }
    function xy(e) {
      var r = canvas.getBoundingClientRect();
      return { x: e.clientX - r.left, y: e.clientY - r.top };
    }
    function eraseAt(pt) {
      var th = 14, hit = false;
      for (var i = rec.s.length - 1; i >= 0; i--) {
        var p = rec.s[i].p;
        for (var j = 0; j + 1 < p.length; j += 2) {
          var dx = p[j] * cssW - pt.x, dy = p[j + 1] * cssW - pt.y;
          if (dx * dx + dy * dy < th * th) {
            if (!hit) { olPushUndo(cid, rec); hit = true; }
            rec.s.splice(i, 1);
            break;
          }
        }
      }
      if (hit) { redraw(); olCommit(cid, rec); }
    }
    var drawing = false, erasing = false, cur = null, lastX = 0, lastY = 0;
    canvas.addEventListener('pointerdown', function (e) {
      if (!OL.mode) return;
      e.preventDefault();
      try { canvas.setPointerCapture(e.pointerId); } catch (err) {}
      var pt = xy(e);
      if (OL.tool === 'e') { erasing = true; eraseAt(pt); return; }
      drawing = true;
      cur = { c: OL.tool, p: [rnd3(pt.x / cssW), rnd3(pt.y / cssW)] };
      lastX = pt.x;
      lastY = pt.y;
    });
    canvas.addEventListener('pointermove', function (e) {
      var pt = xy(e);
      if (erasing) { eraseAt(pt); return; }
      if (!drawing || !cur) return;
      var dx = pt.x - lastX, dy = pt.y - lastY;
      if (dx * dx + dy * dy < 4) return;
      cur.p.push(rnd3(pt.x / cssW), rnd3(pt.y / cssW));
      lastX = pt.x;
      lastY = pt.y;
      inkSegment(ctx, cur, cssW);
    });
    function endStroke() {
      if (erasing) { erasing = false; return; }
      if (!drawing) return;
      drawing = false;
      if (cur && cur.p.length >= 2) {
        olPushUndo(cid, rec);
        rec.s.push(cur);
        redraw();
        olCommit(cid, rec);
      }
      cur = null;
    }
    canvas.addEventListener('pointerup', endStroke);
    canvas.addEventListener('pointercancel', endStroke);

    // 卡片高度會變（開解答、載圖），跟著重設畫布
    if (window.ResizeObserver) {
      var rot = null;
      var ro = new ResizeObserver(function () { clearTimeout(rot); rot = setTimeout(resize, 120); });
      ro.observe(card);
    }
    inkLive.push(resize);
    OL.live[cid] = { rec: rec, redraw: redraw, resize: resize };
    resize();
  }
  function olToolbar() {
    if (OL.tools) return;
    var t = document.createElement('div');
    t.className = 'ol-tools hidden';
    function setOn(btn) {
      t.querySelectorAll('.ink-pen').forEach(function (x) { x.classList.remove('on'); });
      btn.classList.add('on');
    }
    INK_PENS.forEach(function (p) {
      var b = document.createElement('button');
      b.type = 'button';
      b.className = 'ink-tool ink-pen' + (p.k === OL.tool ? ' on' : '');
      b.style.background = p.c;
      b.title = p.name;
      b.addEventListener('click', function () { OL.tool = p.k; setOn(b); });
      t.appendChild(b);
    });
    var eraser = document.createElement('button');
    eraser.type = 'button';
    eraser.className = 'ink-tool ink-pen';
    eraser.textContent = '🧽';
    eraser.title = '橡皮擦（擦到的整筆刪除）';
    eraser.addEventListener('click', function () { OL.tool = 'e'; setOn(eraser); });
    t.appendChild(eraser);
    var undoBtn = document.createElement('button');
    undoBtn.type = 'button';
    undoBtn.className = 'ink-tool';
    undoBtn.textContent = '↩️';
    undoBtn.title = '復原';
    undoBtn.addEventListener('click', olUndo);
    t.appendChild(undoBtn);
    var done = document.createElement('button');
    done.type = 'button';
    done.className = 'chip ol-done';
    done.textContent = '完成';
    done.addEventListener('click', function () { olToggle(false); });
    t.appendChild(done);
    document.body.appendChild(t);
    OL.tools = t;
  }
  function olToggle(on) {
    OL.mode = (on === undefined) ? !OL.mode : !!on;
    document.body.classList.toggle('write-mode', OL.mode);
    olToolbar();
    OL.tools.classList.toggle('hidden', !OL.mode);
    var b = $('olBtn');
    if (b) {
      b.textContent = OL.mode ? '✅' : '✍️';
      b.title = OL.mode ? '完成手寫' : '直接寫在重點上';
    }
    if (OL.mode) hideHlBubble();
  }

  /* ---------- 公式速查（資料在 js/data/formulas.js） ---------- */
  var fmBook = 0;   // 0 = 未渲染
  function renderFormulas() {
    var data = window.MATH_FORMULAS || [];
    if (!fmBook) fmBook = state.book || 1;
    var tabs = $('fmTabs');
    tabs.innerHTML = '';
    data.forEach(function (bk) {
      var t = document.createElement('div');
      t.className = 'book-tab' + (fmBook === bk.book ? ' active' : '');
      t.innerHTML = '<span class="bicon">' + BOOK_ICON[bk.book] + '</span>' + BOOK_NAMES[bk.book] + '<small>' + BOOK_GRADE[bk.book] + '</small>';
      t.addEventListener('click', function () { fmBook = bk.book; renderFormulas(); });
      tabs.appendChild(t);
    });
    var wrap = $('fmList');
    wrap.innerHTML = '';
    var cur = data.filter(function (bk) { return bk.book === fmBook; })[0];
    if (!cur) return;
    cur.sections.forEach(function (sec) {
      var card = document.createElement('div');
      card.className = 'concept fm-card';
      card.innerHTML = '<h3>' + sec.t + '</h3><ul class="fm-rows">' +
        sec.rows.map(function (r) { return '<li>' + r + '</li>'; }).join('') + '</ul>';
      wrap.appendChild(card);
    });
    renderMath(wrap);
    show('view-formulas');
  }

  /* ---------- 搜尋（單元標題／觀念標題／重點內文／例題題目） ---------- */
  var searchIdx = null;
  function stripHtml(s) {
    return String(s || '').replace(/<[^>]+>/g, '').replace(/\s+/g, ' ');
  }
  function buildSearchIdx() {
    searchIdx = [];
    ALL.forEach(function (u) {
      (u.concepts || []).forEach(function (c) {
        var text = c.title + ' ' + stripHtml(c.body) + ' ' +
          (c.examples || []).map(function (ex) { return stripHtml(ex.q); }).join(' ');
        searchIdx.push({ uid: u.id, cid: c.id, book: u.book, sec: u.sec, ut: u.title, ct: c.title, text: text });
      });
    });
  }
  function doSearch(q) {
    var box = $('searchResults');
    box.innerHTML = '';
    q = q.trim();
    if (q.length < 1) { box.innerHTML = '<div class="use-hint">輸入關鍵字，如「畢氏定理」「因式分解」「內錯角」…</div>'; return; }
    if (!searchIdx) buildSearchIdx();
    var terms = q.toLowerCase().split(/\s+/).filter(Boolean);
    var hits = searchIdx.filter(function (r) {
      var hay = (r.ut + ' ' + r.text).toLowerCase();
      return terms.every(function (t) { return hay.indexOf(t) >= 0; });
    });
    if (!hits.length) { box.innerHTML = '<div class="use-hint">找不到「' + q.replace(/</g, '&lt;') + '」，換個關鍵字試試。</div>'; return; }
    var MAX = 40;
    hits.slice(0, MAX).forEach(function (r) {
      var row = document.createElement('div');
      row.className = 'search-row';
      var pos = r.text.toLowerCase().indexOf(terms[0]);
      var snip = pos >= 0 ? r.text.slice(Math.max(0, pos - 12), pos + 34) : r.text.slice(0, 46);
      row.innerHTML = '<span class="sr-crumb">' + BOOK_NAMES[r.book] + ' ' + r.sec + ' ' + r.ut + '</span>' +
        '<span class="sr-title">' + r.ct + '</span><small class="sr-snip">…' + snip.replace(/</g, '&lt;') + '…</small>';
      row.addEventListener('click', function () { jumpToConcept(r.uid, r.cid); });
      box.appendChild(row);
    });
    if (hits.length > MAX) {
      var more = document.createElement('div');
      more.className = 'use-hint';
      more.textContent = '還有 ' + (hits.length - MAX) + ' 筆，輸入更精確的關鍵字縮小範圍。';
      box.appendChild(more);
    }
  }
  function jumpToConcept(uid, cid) {
    openUnit(uid);
    setTimeout(function () {
      var body = cBody(cid);
      if (!body) return;
      var card = body.parentNode;
      card.scrollIntoView({ behavior: 'smooth', block: 'start' });
      card.classList.add('c-flash');
      setTimeout(function () { card.classList.remove('c-flash'); }, 2200);
    }, 80);
  }

  /* ---------- theme ---------- */
  function applyTheme() {
    if (state.theme) document.documentElement.setAttribute('data-theme', state.theme);
    else document.documentElement.removeAttribute('data-theme');
  }
  var themePop = null;
  function toggleThemePop() {
    if (themePop) { themePop.remove(); themePop = null; return; }
    themePop = document.createElement('div');
    themePop.className = 'theme-pop';
    THEMES.forEach(function (t) {
      var opt = document.createElement('div');
      opt.className = 'theme-opt' + ((state.theme || '') === t.key ? ' on' : '');
      opt.innerHTML = '<span class="theme-dot" style="background:' + t.dot + '"></span>' + t.name;
      opt.addEventListener('click', function () {
        state.theme = t.key;
        save();
        applyTheme();
        toggleThemePop();
      });
      themePop.appendChild(opt);
    });
    document.body.appendChild(themePop);
  }

  /* ---------- boot ---------- */
  applyTheme();
  $('themeBtn').addEventListener('click', function (e) { e.stopPropagation(); toggleThemePop(); });
  document.addEventListener('click', function (e) {
    if (themePop && !themePop.contains(e.target)) { themePop.remove(); themePop = null; }
  });
  // 螢光筆：選取穩定後跳出選色泡泡；點畫記顯示移除鈕
  var selTimer = null;
  document.addEventListener('selectionchange', function () {
    clearTimeout(selTimer);
    selTimer = setTimeout(function () {
      var sel = window.getSelection();
      if (!sel || sel.isCollapsed) {
        if (hlBubble && !hlBubble.querySelector('.hl-del')) hideHlBubble();
        return;
      }
      showHlBubble();
    }, 350);
  });
  document.addEventListener('click', function (e) {
    if (hlBubble && hlBubble.contains(e.target)) return;
    var mk = e.target && e.target.closest ? e.target.closest('mark.hl') : null;
    var s = window.getSelection();
    if (mk && (!s || s.isCollapsed)) { showHlRemove(mk); return; }
    if (hlBubble && hlBubble.querySelector('.hl-del')) hideHlBubble();
  });
  // 手寫畫布跟著視窗寬度重畫
  var inkRszTimer = null;
  window.addEventListener('resize', function () {
    clearTimeout(inkRszTimer);
    inkRszTimer = setTimeout(function () { inkLive.forEach(function (f) { f(); }); }, 200);
  });
  $('homeLink').addEventListener('click', function () { renderHome(); show('view-home'); });
  $('backBtn').addEventListener('click', function () { renderHome(); show('view-home'); });
  $('backBtn2').addEventListener('click', function () { renderHome(); show('view-home'); });
  $('progressBtn').addEventListener('click', renderProgress);
  $('formulaBtn').addEventListener('click', renderFormulas);
  $('fmBack').addEventListener('click', function () { renderHome(); show('view-home'); });
  $('searchBtn').addEventListener('click', function () {
    show('view-search');
    doSearch($('searchInput').value || '');
    $('searchInput').focus();
  });
  $('searchBack').addEventListener('click', function () { renderHome(); show('view-home'); });
  var schTimer = null;
  $('searchInput').addEventListener('input', function () {
    clearTimeout(schTimer);
    schTimer = setTimeout(function () { doSearch($('searchInput').value); }, 200);
  });
  /* ℹ️ 使用說明與版本紀錄（資料在 js/versions.js） */
  var helpRendered = false;
  $('helpBtn').addEventListener('click', function () {
    if (!helpRendered) {
      helpRendered = true;
      var el = $('verList');
      (window.APP_VERSIONS || []).forEach(function (ver) {
        var box = document.createElement('div');
        box.className = 'ver-item';
        var h = document.createElement('div');
        h.className = 'ver-head';
        h.innerHTML = '<b>' + ver.v + '</b><span class="ver-date">' + ver.date + '</span>';
        box.appendChild(h);
        var ul = document.createElement('ul');
        ver.items.forEach(function (t) {
          var li = document.createElement('li');
          li.textContent = t;
          ul.appendChild(li);
        });
        box.appendChild(ul);
        el.appendChild(box);
      });
    }
    show('view-help');
  });
  $('helpBack').addEventListener('click', function () { renderHome(); show('view-home'); });
  $('olBtn').addEventListener('click', function () { olToggle(); });
  $('prevUnit').addEventListener('click', function () {
    var i = ALL.indexOf(currentUnit);
    if (i > 0) openUnit(ALL[i - 1].id);
  });
  $('nextUnit').addEventListener('click', function () {
    var i = ALL.indexOf(currentUnit);
    if (i < ALL.length - 1) openUnit(ALL[i + 1].id);
  });

  renderHome();
})();
