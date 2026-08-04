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
      s.book = s.book || 1;
      return s;
    } catch (e) { return { status:{}, notes:{}, book:1 }; }
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
  var views = ['view-home', 'view-unit', 'view-progress'];
  function show(v) {
    views.forEach(function (id) { $(id).classList.toggle('hidden', id !== v); });
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
      item.innerHTML =
        '<span class="sec">' + u.sec + '</span>' +
        '<span class="name">' + u.title +
          '<small>' + (u.concepts || []).length + ' 個觀念' + (nc ? ' · 📝 ' + nc + ' 則筆記' : '') + '</small></span>' +
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
    (u.concepts || []).forEach(function (c, ci) {
      var card = document.createElement('div');
      card.className = 'concept';
      var html = '<h3><span class="cnum">' + (ci + 1) + '</span>' + c.title + '</h3>' + c.body;
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
              ex.steps.map(function (s) { return '<li>' + s + '</li>'; }).join('') +
            '</ol><div class="ans">答：' + ex.ans + '</div></div></div>';
        });
        html += '</div>';
      }
      html += '<div class="note-area"><label>📝 我的筆記 <span class="note-saved" id="saved-' + c.id + '">✓ 已存</span></label>' +
        '<textarea id="note-' + c.id + '" placeholder="寫下老師補充、易錯點、自己的想法…"></textarea></div>';
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
    // 解答開關
    list.querySelectorAll('.toggle-sol').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var sol = btn.nextElementSibling;
        var open = sol.classList.toggle('hidden');
        btn.textContent = open ? '看解答' : '收起解答';
      });
    });
    // 上一/下一單元
    var idx = ALL.indexOf(u);
    $('prevUnit').style.visibility = idx > 0 ? 'visible' : 'hidden';
    $('nextUnit').style.visibility = idx < ALL.length - 1 ? 'visible' : 'hidden';
    renderMath(list);
    show('view-unit');
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
    var html = '<div class="pg-stats">' +
      '<div class="pg-stat"><b>' + counts.master + '</b><small>已精熟</small></div>' +
      '<div class="pg-stat"><b>' + counts.taught + '</b><small>已教過</small></div>' +
      '<div class="pg-stat"><b>' + counts.weak + '</b><small>需加強</small></div>' +
      '<div class="pg-stat"><b>' + noteTotal + '</b><small>筆記則數</small></div></div>';
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
          '<span class="note-badge">' + (noteCount(u) ? '📝' + noteCount(u) : '') + '</span>' +
          '<span class="st-label ' + (st || 'none') + '">' + (stDef ? stDef.label : '未教') + '</span>';
        (function (id) { row.addEventListener('click', function () { openUnit(id); }); })(u.id);
        sec.appendChild(row);
      });
      grid.appendChild(sec);
    }
    show('view-progress');
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
  $('homeLink').addEventListener('click', function () { renderHome(); show('view-home'); });
  $('backBtn').addEventListener('click', function () { renderHome(); show('view-home'); });
  $('backBtn2').addEventListener('click', function () { renderHome(); show('view-home'); });
  $('progressBtn').addEventListener('click', renderProgress);
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
