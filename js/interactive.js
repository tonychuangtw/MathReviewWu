/* 互動圖形（2026-08-11 Tony 核可示範版）— 純 SVG + vanilla JS，無外部套件。
 * registry：window.MATH_IFIGS = { conceptId: function(box){...} }
 * app.js 在 openUnit 時，若觀念 id 有登錄，會在觀念卡圖示下方掛 .ifig-box 並呼叫。
 * 色票同 tools/gen-figs.js（內容卡固定紙白底）：墨 #22242a、藍 #3a6ea5、橘 #e07a2f、紅 #c0392b、綠 #2e7d32 */
(function () {
  'use strict';
  var NS = 'http://www.w3.org/2000/svg';
  var INK = '#22242a', BLUE = '#3a6ea5', ORANGE = '#e07a2f', RED = '#c0392b', GREEN = '#2e7d32', SOFT = '#9aa0ad';

  function el(tag, attrs, parent) {
    var e = document.createElementNS(NS, tag);
    if (attrs) Object.keys(attrs).forEach(function (k) { e.setAttribute(k, attrs[k]); });
    if (parent) parent.appendChild(e);
    return e;
  }
  function div(cls, parent, html) {
    var d = document.createElement('div');
    if (cls) d.className = cls;
    if (html !== undefined) d.innerHTML = html;
    if (parent) parent.appendChild(d);
    return d;
  }
  function btn(label, parent, fn) {
    var b = document.createElement('button');
    b.type = 'button';
    b.className = 'chip ifig-btn';
    b.textContent = label;
    b.addEventListener('click', fn);
    if (parent) parent.appendChild(b);
    return b;
  }
  function slider(parent, label, min, max, step, val, fn) {
    var w = div('ifig-slider', parent);
    var lb = document.createElement('label');
    lb.textContent = label;
    var r = document.createElement('input');
    r.type = 'range';
    r.min = min; r.max = max; r.step = step; r.value = val;
    var out = document.createElement('b');
    out.textContent = val;
    r.addEventListener('input', function () { out.textContent = r.value; fn(parseFloat(r.value)); });
    w.appendChild(lb); w.appendChild(r); w.appendChild(out);
    return r;
  }
  /* 事件座標 → viewBox 座標（viewBox 等比縮放） */
  function evPt(svg, e, vw) {
    var r = svg.getBoundingClientRect();
    var s = vw / r.width;
    return { x: (e.clientX - r.left) * s, y: (e.clientY - r.top) * s };
  }
  /* 線段「畫出來」動畫：以 dashoffset 從全隱到全現 */
  function drawIn(elm, dur) {
    var len;
    try { len = elm.getTotalLength ? elm.getTotalLength() : 0; } catch (e) { len = 0; }
    if (!len) {
      var x1 = +elm.getAttribute('x1') || 0, y1 = +elm.getAttribute('y1') || 0;
      var x2 = +elm.getAttribute('x2') || 0, y2 = +elm.getAttribute('y2') || 0;
      len = Math.hypot(x2 - x1, y2 - y1) || 100;
    }
    var dash = elm.getAttribute('stroke-dasharray');   // 虛線樣式要疊加：用大段包住
    elm.style.transition = 'none';
    elm.style.strokeDasharray = len + ' ' + len;
    elm.style.strokeDashoffset = len;
    elm.style.opacity = 1;
    void elm.getBoundingClientRect();
    elm.style.transition = 'stroke-dashoffset ' + (dur || 0.7) + 's ease';
    elm.style.strokeDashoffset = 0;
    if (dash) setTimeout(function () {   // 畫完還原原本的虛線樣式
      elm.style.transition = 'none';
      elm.style.strokeDasharray = dash;
      elm.style.strokeDashoffset = 0;
    }, (dur || 0.7) * 1000 + 60);
  }
  function fadeIn(elm) {
    elm.style.transition = 'opacity .45s ease';
    elm.style.opacity = 1;
  }
  function hideEl(elm) {
    elm.style.transition = 'none';
    elm.style.opacity = 0;
    elm.style.strokeDasharray = '';
    elm.style.strokeDashoffset = '';
  }

  /* ---------- 逐步播放器 ----------
   * steps: [{ d:說明文字, els:[svg 元素], draw:[要用畫線動畫的元素], on:fn }] */
  function stepPlayer(box, steps, doneMsg) {
    var i = -1;
    var descWrap = div('ifig-steps', box);
    var items = steps.map(function (s, k) {
      return div('ifig-step', descWrap, '<span class="sn">' + (k + 1) + '</span>' + s.d);
    });
    var ctrl = div('ifig-controls', box);
    var next = btn('▶ 下一步', ctrl, function () { advance(); });
    var replay = btn('↺ 重播', ctrl, function () { reset(); });
    function resetEls() {
      steps.forEach(function (s) {
        (s.els || []).forEach(hideEl);
        (s.draw || []).forEach(hideEl);
      });
    }
    function reset() {
      i = -1;
      resetEls();
      items.forEach(function (it) { it.className = 'ifig-step'; });
      next.disabled = false;
      next.textContent = '▶ 下一步';
    }
    function advance() {
      if (i >= steps.length - 1) return;
      i++;
      var s = steps[i];
      (s.els || []).forEach(fadeIn);
      (s.draw || []).forEach(function (e2) { drawIn(e2, 0.8); });
      if (s.on) s.on();
      items.forEach(function (it, k) {
        it.className = 'ifig-step' + (k < i ? ' done' : k === i ? ' now' : '');
      });
      if (i === steps.length - 1) {
        next.disabled = true;
        next.textContent = doneMsg || '✓ 完成';
      }
    }
    resetEls();
    items.forEach(function (it) { it.className = 'ifig-step'; });
    return { reset: reset };
  }

  /* ---------- 座標平面底圖 ---------- */
  function plane(svg, opt) {
    var n = opt.n, pad = opt.pad, px = opt.px;   // -n..n，每格 px
    var C = pad + n * px;                        // 原點
    function X(v) { return C + v * px; }
    function Y(v) { return C - v * px; }
    var g = el('g', null, svg);
    for (var v = -n; v <= n; v++) {
      el('line', { x1: X(v), y1: Y(-n), x2: X(v), y2: Y(n), stroke: '#e3e6ec', 'stroke-width': 1 }, g);
      el('line', { x1: X(-n), y1: Y(v), x2: X(n), y2: Y(v), stroke: '#e3e6ec', 'stroke-width': 1 }, g);
    }
    el('line', { x1: X(-n) - 8, y1: Y(0), x2: X(n) + 12, y2: Y(0), stroke: INK, 'stroke-width': 2, 'marker-end': 'url(#ifarr)' }, g);
    el('line', { x1: X(0), y1: Y(-n) + 8, x2: X(0), y2: Y(n) - 12, stroke: INK, 'stroke-width': 2, 'marker-end': 'url(#ifarr)' }, g);
    var tx = el('text', { x: X(n) + 10, y: Y(0) + 18, 'font-size': 14, fill: INK }, g); tx.textContent = 'x';
    var ty = el('text', { x: X(0) + 8, y: Y(n) - 4, 'font-size': 14, fill: INK }, g); ty.textContent = 'y';
    for (var t = -n; t <= n; t++) {
      if (!t) continue;
      if (Math.abs(t) % (opt.tickEvery || 1)) continue;
      var lx = el('text', { x: X(t), y: Y(0) + 16, 'font-size': 10, fill: SOFT, 'text-anchor': 'middle' }, g); lx.textContent = t;
      var ly = el('text', { x: X(0) - 5, y: Y(t) + 4, 'font-size': 10, fill: SOFT, 'text-anchor': 'end' }, g); ly.textContent = t;
    }
    var o = el('text', { x: X(0) - 6, y: Y(0) + 16, 'font-size': 11, fill: SOFT, 'text-anchor': 'end' }, g); o.textContent = 'O';
    return { X: X, Y: Y };
  }
  function defsArrow(svg) {
    var d = el('defs', null, svg);
    var m = el('marker', { id: 'ifarr', viewBox: '0 0 10 10', refX: 8, refY: 5, markerWidth: 6, markerHeight: 6, orient: 'auto-start-reverse' }, d);
    el('path', { d: 'M0,0 L10,5 L0,10 z', fill: INK }, m);
  }

  /* ---------- 通用小工具（2026-08-11 全面鋪開新增） ---------- */
  function mkTxt(svg, x, y, s, fill, size, anchor, bold) {
    var t = el('text', { x: x, y: y, 'font-size': size || 13, fill: fill || INK, 'text-anchor': anchor || 'middle' }, svg);
    if (bold) t.setAttribute('font-weight', 700);
    t.textContent = s;
    return t;
  }
  /* 角弧：頂點 p，從方向 p→q1 掃到 p→q2（走短邊），半徑 r */
  function arcAt(svg, p, q1, q2, r, color, wide) {
    function unit(q) {
      var dx = q[0] - p[0], dy = q[1] - p[1], L = Math.hypot(dx, dy) || 1;
      return [dx / L, dy / L];
    }
    var u = unit(q1), v = unit(q2);
    var a1 = Math.atan2(u[1], u[0]), a2 = Math.atan2(v[1], v[0]);
    var d = a2 - a1;
    while (d > Math.PI) d -= 2 * Math.PI;
    while (d < -Math.PI) d += 2 * Math.PI;
    var sweep = d > 0 ? 1 : 0;
    var s1 = [p[0] + u[0] * r, p[1] + u[1] * r], s2 = [p[0] + v[0] * r, p[1] + v[1] * r];
    return el('path', {
      d: 'M' + s1[0] + ',' + s1[1] + ' A' + r + ',' + r + ' 0 0,' + sweep + ' ' + s2[0] + ',' + s2[1],
      fill: 'none', stroke: color, 'stroke-width': wide || 3, 'stroke-linecap': 'round'
    }, svg);
  }
  function ptsStr(arr) { return arr.map(function (p) { return p[0] + ',' + p[1]; }).join(' '); }
  /* 多邊形頂點內插搬移動畫 */
  function morphPoly(elm, from, to, dur) {
    var t0 = null;
    elm.setAttribute('points', ptsStr(from));
    function frame(ts) {
      if (!t0) t0 = ts;
      var k = Math.min(1, (ts - t0) / (dur || 700));
      var e = k < 0.5 ? 2 * k * k : 1 - Math.pow(-2 * k + 2, 2) / 2;
      elm.setAttribute('points', ptsStr(from.map(function (p, i) {
        return [p[0] + (to[i][0] - p[0]) * e, p[1] + (to[i][1] - p[1]) * e];
      })));
      if (k < 1) requestAnimationFrame(frame);
    }
    requestAnimationFrame(frame);
  }
  /* 數線底圖 */
  function numLine(svg, opt) {
    var from = opt.from, to = opt.to, y = opt.y, x0 = opt.x0, px = opt.px;
    function X(v) { return x0 + (v - from) * px; }
    el('line', { x1: X(from) - 14, y1: y, x2: X(to) + 20, y2: y, stroke: INK, 'stroke-width': 2.5, 'marker-end': 'url(#ifarr)' }, svg);
    for (var v = from; v <= to; v++) {
      el('line', { x1: X(v), y1: y - 6, x2: X(v), y2: y + 6, stroke: INK, 'stroke-width': 2 }, svg);
      mkTxt(svg, X(v), y + 24, v, v === 0 ? RED : SOFT, 13, 'middle', v === 0);
    }
    return { X: X };
  }
  function fmtN(v) { return String(Math.round(v * 100) / 100).replace('-', '−'); }

  var IF = {};

  /* ========== u15c5 象限探測器：拖著點跑，看座標與象限 ========== */
  IF['u15c5'] = function (box) {
    div('ifig-title', box, '🎮 動手玩：拖著紅點在坐標平面上跑，看座標怎麼變、落在第幾象限');
    var n = 5, px = 26, pad = 18, W = (pad + n * px) * 2;
    var svg = el('svg', { viewBox: '0 0 ' + W + ' ' + W, 'class': 'ifig-svg' }, null);
    defsArrow(svg);
    /* 象限底色（active 才亮） */
    var qs = {};
    var P = plane(svg, { n: n, pad: pad, px: px });
    var qDef = {
      1: { x: P.X(0), y: P.Y(n), name: '第一象限', sign: '(+, +)' },
      2: { x: P.X(-n), y: P.Y(n), name: '第二象限', sign: '(−, +)' },
      3: { x: P.X(-n), y: P.Y(0), name: '第三象限', sign: '(−, −)' },
      4: { x: P.X(0), y: P.Y(0), name: '第四象限', sign: '(+, −)' }
    };
    [1, 2, 3, 4].forEach(function (q) {
      qs[q] = el('rect', { x: qDef[q].x, y: qDef[q].y, width: n * px, height: n * px, fill: 'rgba(224,122,47,.16)', opacity: 0 }, svg);
      svg.insertBefore(qs[q], svg.childNodes[1]);   // 墊在格線下面
      var lb = el('text', { x: qDef[q].x + n * px / 2, y: qDef[q].y + n * px / 2 - 6, 'font-size': 15, fill: SOFT, 'text-anchor': 'middle', 'font-weight': 700 }, svg);
      lb.textContent = ['Ⅰ', 'Ⅱ', 'Ⅲ', 'Ⅳ'][q - 1];
      var sg = el('text', { x: qDef[q].x + n * px / 2, y: qDef[q].y + n * px / 2 + 12, 'font-size': 12, fill: SOFT, 'text-anchor': 'middle' }, svg);
      sg.textContent = qDef[q].sign;
    });
    var guideX = el('line', { stroke: ORANGE, 'stroke-width': 1.5, 'stroke-dasharray': '4 4' }, svg);
    var guideY = el('line', { stroke: ORANGE, 'stroke-width': 1.5, 'stroke-dasharray': '4 4' }, svg);
    var dot = el('circle', { r: 9, fill: RED, stroke: '#fff', 'stroke-width': 2.5, 'class': 'ifig-drag' }, svg);
    var halo = el('circle', { r: 16, fill: 'rgba(192,57,43,.15)' }, svg);
    box.appendChild(svg);
    var read = div('ifig-readout', box);
    var cx = 3, cy = -2;
    function quadOf(x, y) {
      if (x === 0 && y === 0) return '原點 (0, 0) — 同時在 x 軸與 y 軸上';
      if (x === 0) return '在 y 軸上，不屬於任何象限';
      if (y === 0) return '在 x 軸上，不屬於任何象限';
      var q = x > 0 ? (y > 0 ? 1 : 4) : (y > 0 ? 2 : 3);
      return qDef[q].name + '　' + qDef[q].sign;
    }
    function render() {
      dot.setAttribute('cx', P.X(cx)); dot.setAttribute('cy', P.Y(cy));
      halo.setAttribute('cx', P.X(cx)); halo.setAttribute('cy', P.Y(cy));
      guideX.setAttribute('x1', P.X(cx)); guideX.setAttribute('y1', P.Y(cy));
      guideX.setAttribute('x2', P.X(cx)); guideX.setAttribute('y2', P.Y(0));
      guideY.setAttribute('x1', P.X(cx)); guideY.setAttribute('y1', P.Y(cy));
      guideY.setAttribute('x2', P.X(0)); guideY.setAttribute('y2', P.Y(cy));
      var q = (cx !== 0 && cy !== 0) ? (cx > 0 ? (cy > 0 ? 1 : 4) : (cy > 0 ? 2 : 3)) : 0;
      [1, 2, 3, 4].forEach(function (k) { qs[k].setAttribute('opacity', k === q ? 1 : 0); });
      read.innerHTML = 'P(<b>' + cx + '</b>, <b>' + cy + '</b>)　<span class="q">' + quadOf(cx, cy) + '</span>';
    }
    var dragging = false;
    function toGrid(e) {
      var p = evPt(svg, e, W);
      cx = Math.max(-n, Math.min(n, Math.round((p.x - P.X(0)) / px)));
      cy = Math.max(-n, Math.min(n, Math.round((P.Y(0) - p.y) / px)));
      render();
    }
    svg.addEventListener('pointerdown', function (e) {
      e.preventDefault();
      dragging = true;
      try { svg.setPointerCapture(e.pointerId); } catch (err) {}
      toGrid(e);
    });
    svg.addEventListener('pointermove', function (e) { if (dragging) { e.preventDefault(); toGrid(e); } });
    svg.addEventListener('pointerup', function () { dragging = false; });
    svg.addEventListener('pointercancel', function () { dragging = false; });
    render();
  };

  /* ========== u16c1 直線實驗室：拉桿調 a、b，看 y=ax+b 怎麼動 ========== */
  IF['u16c1'] = function (box) {
    div('ifig-title', box, '🎮 動手玩：拉動下面兩支拉桿，看直線 y = ax + b 怎麼轉動、平移');
    var n = 5, px = 26, pad = 18, W = (pad + n * px) * 2;
    var svg = el('svg', { viewBox: '0 0 ' + W + ' ' + W, 'class': 'ifig-svg' }, null);
    defsArrow(svg);
    var clip = el('clipPath', { id: 'ifclip16' }, el('defs', null, svg));
    el('rect', { x: pad, y: pad, width: W - 2 * pad, height: W - 2 * pad }, clip);
    var P = plane(svg, { n: n, pad: pad, px: px });
    var gLine = el('g', { 'clip-path': 'url(#ifclip16)' }, svg);
    /* 斜率三角形（從截點走 +1、再走 +a） */
    var runL = el('line', { stroke: GREEN, 'stroke-width': 2, 'stroke-dasharray': '4 3' }, gLine);
    var riseL = el('line', { stroke: GREEN, 'stroke-width': 2, 'stroke-dasharray': '4 3' }, gLine);
    var line = el('line', { stroke: BLUE, 'stroke-width': 3, 'stroke-linecap': 'round' }, gLine);
    var bDot = el('circle', { r: 6, fill: ORANGE, stroke: '#fff', 'stroke-width': 2 }, svg);
    var bLab = el('text', { 'font-size': 12, fill: ORANGE, 'font-weight': 700 }, svg);
    var runT = el('text', { 'font-size': 11, fill: GREEN, 'text-anchor': 'middle', 'font-weight': 700 }, svg);
    var riseT = el('text', { 'font-size': 11, fill: GREEN, 'font-weight': 700 }, svg);
    box.appendChild(svg);
    var read = div('ifig-readout', box);
    var a = 1, b = 2;
    function fmt() {
      var ax = a === 1 ? 'x' : a === -1 ? '−x' : a === 0 ? '' : String(a).replace('-', '−') + 'x';
      var bs = b === 0 ? (a === 0 ? '0' : '') : (a === 0 ? String(b).replace('-', '−') : (b > 0 ? ' + ' + b : ' − ' + (-b)));
      return 'y = ' + (ax + bs || '0');
    }
    function render() {
      var x1 = -n - 1, x2 = n + 1;
      line.setAttribute('x1', P.X(x1)); line.setAttribute('y1', P.Y(a * x1 + b));
      line.setAttribute('x2', P.X(x2)); line.setAttribute('y2', P.Y(a * x2 + b));
      bDot.setAttribute('cx', P.X(0)); bDot.setAttribute('cy', P.Y(b));
      bLab.setAttribute('x', P.X(0) + 10); bLab.setAttribute('y', P.Y(b) - 8);
      bLab.textContent = '(0, ' + b + ')';
      /* 斜率三角形：截點 → 右 1 → 上 a */
      runL.setAttribute('x1', P.X(0)); runL.setAttribute('y1', P.Y(b));
      runL.setAttribute('x2', P.X(1)); runL.setAttribute('y2', P.Y(b));
      riseL.setAttribute('x1', P.X(1)); riseL.setAttribute('y1', P.Y(b));
      riseL.setAttribute('x2', P.X(1)); riseL.setAttribute('y2', P.Y(b + a));
      runT.setAttribute('x', P.X(0.5)); runT.setAttribute('y', P.Y(b) + (a >= 0 ? 14 : -6));
      runT.textContent = '+1';
      riseT.setAttribute('x', P.X(1) + 5); riseT.setAttribute('y', P.Y(b + a / 2) + 4);
      riseT.textContent = (a >= 0 ? '+' : '−') + Math.abs(a);
      var show = a !== 0 ? 1 : 0;
      riseL.setAttribute('opacity', show); riseT.setAttribute('opacity', show);
      read.innerHTML = '<b class="eq">' + fmt() + '</b>　斜率 a = ' + String(a).replace('-', '−') +
        (a > 0 ? '（往右上升 ↗）' : a < 0 ? '（往右下降 ↘）' : '（水平線 →）') +
        '，y 截距 b = ' + String(b).replace('-', '−');
    }
    var ctrls = div('ifig-sliders', box);
    slider(ctrls, 'a（斜率）', -3, 3, 0.5, 1, function (v) { a = v; render(); });
    slider(ctrls, 'b（y 截距）', -4, 4, 1, 2, function (v) { b = v; render(); });
    render();
  };

  /* ========== u31c1 畢氏定理拼圖：4 個三角形搬家，c² 變 a²+b² ========== */
  IF['u31c1'] = function (box) {
    div('ifig-title', box, '🎬 看動畫：同樣 4 個直角三角形搬動位置——大正方形沒變，剩下的空地從 c² 變成 a² + b²');
    var a = 90, b = 120, s = a + b, pad = 14, W = s + 2 * pad;
    var svg = el('svg', { viewBox: '0 0 ' + W + ' ' + W, 'class': 'ifig-svg ifig-narrow' }, null);
    function pt(p) { return (p[0] + pad) + ',' + (p[1] + pad); }
    el('rect', { x: pad, y: pad, width: s, height: s, fill: '#fdf6ec', stroke: INK, 'stroke-width': 2 }, svg);
    /* 兩種排法的頂點（對應同一個三角形的剛體搬移） */
    var arr1 = [
      [[0, 0], [a, 0], [0, b]],
      [[a, 0], [s, 0], [s, a]],
      [[s, s], [b, s], [s, a]],
      [[0, s], [b, s], [0, b]]
    ];
    var arr2 = [
      [[a, a], [a, 0], [s, a]],
      [[a, 0], [s, 0], [s, a]],
      [[a, s], [0, s], [a, a]],
      [[0, a], [0, s], [a, a]]
    ];
    var tris = arr1.map(function (t) {
      return el('polygon', { points: t.map(pt).join(' '), fill: 'rgba(58,110,165,.4)', stroke: BLUE, 'stroke-width': 1.5 }, svg);
    });
    function lab(x, y, txt, fill, size) {
      var t = el('text', { x: x + pad, y: y + pad, 'font-size': size || 20, fill: fill, 'text-anchor': 'middle', 'font-weight': 700, 'font-style': 'italic' }, svg);
      t.textContent = txt;
      return t;
    }
    var labC = lab(s / 2, s / 2 + 7, 'c²', RED);
    var labA = lab(a / 2, a / 2 + 7, 'a²', GREEN); labA.setAttribute('opacity', 0);
    var labB = lab((a + s) / 2, (a + s) / 2 + 7, 'b²', ORANGE); labB.setAttribute('opacity', 0);
    /* 邊長標示 */
    lab(a / 2, -3, 'a', GREEN, 14); lab(a + b / 2, -3, 'b', ORANGE, 14);
    lab(-6, a / 2 + 5, 'a', GREEN, 14); lab(-6, a + b / 2 + 5, 'b', ORANGE, 14);
    box.appendChild(svg);
    var read = div('ifig-readout', box,
      '大正方形邊長都是 (a+b)：三角形佔的面積一樣多 → 空地面積相等 → <b class="eq">c² = a² + b²</b>');
    var state = 0, animating = false;
    var ctrl = div('ifig-controls', box);
    var go = btn('▶ 搬動三角形', ctrl, function () {
      if (animating) return;
      animating = true;
      var from = state ? arr2 : arr1, to = state ? arr1 : arr2;
      var t0 = null, DUR = 800;
      function ease(t) { return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2; }
      function frame(ts) {
        if (!t0) t0 = ts;
        var k = Math.min(1, (ts - t0) / DUR), e = ease(k);
        tris.forEach(function (tri, i) {
          var pts = from[i].map(function (p, j) {
            return pt([p[0] + (to[i][j][0] - p[0]) * e, p[1] + (to[i][j][1] - p[1]) * e]);
          }).join(' ');
          tri.setAttribute('points', pts);
        });
        var toA = state === 0;   // 正在搬去 arr2？
        labC.setAttribute('opacity', toA ? 1 - e : e);
        labA.setAttribute('opacity', toA ? e : 1 - e);
        labB.setAttribute('opacity', toA ? e : 1 - e);
        if (k < 1) requestAnimationFrame(frame);
        else {
          state = 1 - state;
          animating = false;
          go.textContent = state ? '↺ 搬回去' : '▶ 搬動三角形';
        }
      }
      requestAnimationFrame(frame);
    });
  };

  /* ========== u42c1 內角和 180°：輔助線一步步畫給你看 ========== */
  IF['u42c1'] = function (box) {
    div('ifig-title', box, '🎬 看動畫：為什麼內角和是 180°？按「下一步」看輔助線怎麼畫、角怎麼搬');
    var W = 460, H = 290;
    var svg = el('svg', { viewBox: '0 0 ' + W + ' ' + H, 'class': 'ifig-svg' }, null);
    var A = [215, 70], B = [70, 245], C = [400, 245];
    function tri() {
      el('polygon', { points: A + ' ' + B + ' ' + C, fill: 'rgba(58,110,165,.08)', stroke: INK, 'stroke-width': 2.5, 'stroke-linejoin': 'round' }, svg);
    }
    function vLab(p, dx, dy, s2) {
      var t = el('text', { x: p[0] + dx, y: p[1] + dy, 'font-size': 16, fill: INK, 'font-weight': 700, 'text-anchor': 'middle' }, svg);
      t.textContent = s2;
    }
    /* 角弧：頂點 p，從方向 u 到方向 v（單位化內插），半徑 r */
    function angArc(p, q1, q2, r, color, wide) {
      function unit(q) {
        var dx = q[0] - p[0], dy = q[1] - p[1], L = Math.hypot(dx, dy);
        return [dx / L, dy / L];
      }
      var u = unit(q1), v = unit(q2);
      var a1 = Math.atan2(u[1], u[0]), a2 = Math.atan2(v[1], v[0]);
      var d = a2 - a1;
      while (d > Math.PI) d -= 2 * Math.PI;
      while (d < -Math.PI) d += 2 * Math.PI;
      var large = 0, sweep = d > 0 ? 1 : 0;
      var s1 = [p[0] + u[0] * r, p[1] + u[1] * r], s2 = [p[0] + v[0] * r, p[1] + v[1] * r];
      return el('path', {
        d: 'M' + s1[0] + ',' + s1[1] + ' A' + r + ',' + r + ' 0 ' + large + ',' + sweep + ' ' + s2[0] + ',' + s2[1],
        fill: 'none', stroke: color, 'stroke-width': wide || 3, 'stroke-linecap': 'round'
      }, svg);
    }
    function angLab(x, y, txt, color) {
      var t = el('text', { x: x, y: y, 'font-size': 13, fill: color, 'font-weight': 700, 'text-anchor': 'middle' }, svg);
      t.textContent = txt;
      return t;
    }
    tri();
    vLab(A, 0, -12, 'A'); vLab(B, -14, 6, 'B'); vLab(C, 14, 6, 'C');
    /* 固定顯示的三個內角 */
    angArc(A, B, C, 26, RED);
    angLab(A[0], A[1] + 42, '∠A', RED);
    angArc(B, C, A, 30, BLUE);
    angLab(B[0] + 44, B[1] - 12, '∠B', BLUE);
    angArc(C, A, B, 30, GREEN);
    angLab(C[0] - 44, C[1] - 12, '∠C', GREEN);
    /* step 1：過 A 的輔助線 L∥BC */
    var auxL = el('line', { x1: 40, y1: A[1], x2: 430, y2: A[1], stroke: ORANGE, 'stroke-width': 2.5, 'stroke-dasharray': '7 5', opacity: 0 }, svg);
    var auxT = el('text', { x: 438, y: A[1] + 4, 'font-size': 13, fill: ORANGE, 'font-weight': 700, 'text-anchor': 'end', opacity: 0 }, svg);
    auxT.textContent = 'L';
    var auxT2 = el('text', { x: 60, y: A[1] - 8, 'font-size': 12, fill: ORANGE, opacity: 0 }, svg);
    auxT2.textContent = 'L ∥ BC（輔助線）';
    /* step 2：∠1 = ∠B（內錯角） */
    var arc1 = angArc(A, [40, A[1]], B, 34, BLUE); hideEl(arc1);
    var lab1 = angLab(A[0] - 52, A[1] - 8, '∠1', BLUE); lab1.setAttribute('opacity', 0);
    /* step 3：∠2 = ∠C（內錯角） */
    var arc2 = angArc(A, C, [430, A[1]], 34, GREEN); hideEl(arc2);
    var lab2 = angLab(A[0] + 52, A[1] - 8, '∠2', GREEN); lab2.setAttribute('opacity', 0);
    /* step 4：平角 */
    var flat = angArc(A, [40, A[1]], [430, A[1]], 46, RED, 2); hideEl(flat);
    flat.setAttribute('stroke-dasharray', '3 4');
    var labF = angLab(A[0], A[1] - 54, '∠1 + ∠A + ∠2 = 180°（平角）', RED); labF.setAttribute('opacity', 0);
    box.appendChild(svg);
    stepPlayer(box, [
      { d: '過頂點 A 畫一條<b>輔助線 L，平行底邊 BC</b>——這就是「為什麼要畫這條線」：把 ∠B、∠C 搬到 A 點旁邊。', draw: [auxL], els: [auxT, auxT2] },
      { d: 'L ∥ BC，AB 是截線 → <b style="color:#3a6ea5">∠1 = ∠B（內錯角相等）</b>。', draw: [arc1], els: [lab1] },
      { d: 'L ∥ BC，AC 是截線 → <b style="color:#2e7d32">∠2 = ∠C（內錯角相等）</b>。', draw: [arc2], els: [lab2] },
      { d: '∠1、∠A、∠2 在 A 點拼成一直線 → <b style="color:#c0392b">∠1 + ∠A + ∠2 = 180°</b>，所以 <b>∠A + ∠B + ∠C = 180°</b> ✓', draw: [flat], els: [labF] }
    ], '✓ 證明完成');
  };

  /* ========== u01c8 絕對值：拖點看「到 0 的距離」與相反數 ========== */
  IF['u01c8'] = function (box) {
    div('ifig-title', box, '🎮 動手玩：左右拖動紅點，看絕對值（到 0 的距離）和相反數怎麼變');
    var W = 480, H = 120;
    var svg = el('svg', { viewBox: '0 0 ' + W + ' ' + H, 'class': 'ifig-svg' }, null);
    defsArrow(svg);
    var NL = numLine(svg, { from: -6, to: 6, y: 70, x0: 30, px: 35 });
    var seg = el('line', { y1: 46, y2: 46, stroke: ORANGE, 'stroke-width': 5, 'stroke-linecap': 'round' }, svg);
    var segT = mkTxt(svg, 0, 36, '', ORANGE, 13, 'middle', 1);
    var opp = el('circle', { r: 7, fill: '#fff', stroke: BLUE, 'stroke-width': 2.5 }, svg);
    var oppT = mkTxt(svg, 0, 104, '相反數', BLUE, 11);
    var dot = el('circle', { r: 9, fill: RED, stroke: '#fff', 'stroke-width': 2.5, 'class': 'ifig-drag' }, svg);
    box.appendChild(svg);
    var read = div('ifig-readout', box);
    var a = 4;
    function render() {
      dot.setAttribute('cx', NL.X(a)); dot.setAttribute('cy', 70);
      opp.setAttribute('cx', NL.X(-a)); opp.setAttribute('cy', 70);
      oppT.setAttribute('x', NL.X(-a));
      seg.setAttribute('x1', NL.X(0)); seg.setAttribute('x2', NL.X(a));
      seg.setAttribute('opacity', a === 0 ? 0 : 1);
      segT.setAttribute('x', NL.X(a / 2));
      segT.textContent = '距離 ' + Math.abs(a);
      oppT.setAttribute('opacity', a === 0 ? 0 : 1);
      read.innerHTML = 'a = <b>' + fmtN(a) + '</b>　|a| = <b class="q">' + Math.abs(a) + '</b>（到 0 的距離）　相反數 −a = <b style="color:#3a6ea5">' + fmtN(-a) + '</b>';
    }
    var dragging = false;
    function toV(e) {
      var p = evPt(svg, e, W);
      a = Math.max(-6, Math.min(6, Math.round((p.x - NL.X(0)) / 35)));
      render();
    }
    svg.addEventListener('pointerdown', function (e) { e.preventDefault(); dragging = true; try { svg.setPointerCapture(e.pointerId); } catch (er) {} toV(e); });
    svg.addEventListener('pointermove', function (e) { if (dragging) { e.preventDefault(); toV(e); } });
    svg.addEventListener('pointerup', function () { dragging = false; });
    svg.addEventListener('pointercancel', function () { dragging = false; });
    render();
  };

  /* ========== u02c5 數線上兩點的距離：拖 A、B 看 |a−b| ========== */
  IF['u02c5'] = function (box) {
    div('ifig-title', box, '🎮 動手玩：拖動 A、B 兩點，看兩點距離 |a−b| 怎麼算');
    var W = 480, H = 130;
    var svg = el('svg', { viewBox: '0 0 ' + W + ' ' + H, 'class': 'ifig-svg' }, null);
    defsArrow(svg);
    var NL = numLine(svg, { from: -6, to: 6, y: 78, x0: 30, px: 35 });
    var seg = el('line', { y1: 50, y2: 50, stroke: GREEN, 'stroke-width': 5, 'stroke-linecap': 'round' }, svg);
    var segT = mkTxt(svg, 0, 40, '', GREEN, 13, 'middle', 1);
    var dA = el('circle', { r: 9, fill: BLUE, stroke: '#fff', 'stroke-width': 2.5, 'class': 'ifig-drag' }, svg);
    var tA = mkTxt(svg, 0, 112, 'A', BLUE, 13, 'middle', 1);
    var dB = el('circle', { r: 9, fill: RED, stroke: '#fff', 'stroke-width': 2.5, 'class': 'ifig-drag' }, svg);
    var tB = mkTxt(svg, 0, 112, 'B', RED, 13, 'middle', 1);
    box.appendChild(svg);
    var read = div('ifig-readout', box);
    var a = -2, b = 3, hold = null;
    function render() {
      dA.setAttribute('cx', NL.X(a)); dA.setAttribute('cy', 78); tA.setAttribute('x', NL.X(a));
      dB.setAttribute('cx', NL.X(b)); dB.setAttribute('cy', 78); tB.setAttribute('x', NL.X(b));
      seg.setAttribute('x1', NL.X(Math.min(a, b))); seg.setAttribute('x2', NL.X(Math.max(a, b)));
      seg.setAttribute('opacity', a === b ? 0 : 1);
      segT.setAttribute('x', NL.X((a + b) / 2));
      segT.textContent = Math.abs(a - b);
      read.innerHTML = 'A(<b style="color:#3a6ea5">' + fmtN(a) + '</b>)、B(<b class="q">' + fmtN(b) + '</b>)　距離 = |' + fmtN(a) + ' − (' + fmtN(b) + ')| = <b style="color:#2e7d32">' + Math.abs(a - b) + '</b>';
    }
    function toV(e) {
      var p = evPt(svg, e, W);
      var v = Math.max(-6, Math.min(6, Math.round((p.x - NL.X(0)) / 35)));
      if (hold === 'a') a = v; else b = v;
      render();
    }
    svg.addEventListener('pointerdown', function (e) {
      e.preventDefault();
      var p = evPt(svg, e, W);
      hold = Math.abs(p.x - NL.X(a)) <= Math.abs(p.x - NL.X(b)) ? 'a' : 'b';
      try { svg.setPointerCapture(e.pointerId); } catch (er) {}
      toV(e);
    });
    svg.addEventListener('pointermove', function (e) { if (hold) { e.preventDefault(); toV(e); } });
    svg.addEventListener('pointerup', function () { hold = null; });
    svg.addEventListener('pointercancel', function () { hold = null; });
    render();
  };

  /* ========== u21c2 正比 y=kx：調 k 看直線與倍數關係 ========== */
  IF['u21c2'] = function (box) {
    div('ifig-title', box, '🎮 動手玩：調 k，看正比 y = kx 的圖形——x 變幾倍，y 就跟著變幾倍');
    var n = 5, px = 26, pad = 18, W = (pad + n * px) * 2;
    var svg = el('svg', { viewBox: '0 0 ' + W + ' ' + W, 'class': 'ifig-svg' }, null);
    defsArrow(svg);
    var clip = el('clipPath', { id: 'ifclip21' }, el('defs', null, svg));
    el('rect', { x: pad, y: pad, width: W - 2 * pad, height: W - 2 * pad }, clip);
    var P = plane(svg, { n: n, pad: pad, px: px });
    var g = el('g', { 'clip-path': 'url(#ifclip21)' }, svg);
    var line = el('line', { stroke: BLUE, 'stroke-width': 3, 'stroke-linecap': 'round' }, g);
    var d1 = el('circle', { r: 5, fill: ORANGE, stroke: '#fff', 'stroke-width': 1.5 }, svg);
    var t1 = mkTxt(svg, 0, 0, '', ORANGE, 11, 'start', 1);
    var d2 = el('circle', { r: 5, fill: RED, stroke: '#fff', 'stroke-width': 1.5 }, svg);
    var t2 = mkTxt(svg, 0, 0, '', RED, 11, 'start', 1);
    box.appendChild(svg);
    var read = div('ifig-readout', box);
    var k = 2;
    function render() {
      line.setAttribute('x1', P.X(-n - 1)); line.setAttribute('y1', P.Y(k * (-n - 1)));
      line.setAttribute('x2', P.X(n + 1)); line.setAttribute('y2', P.Y(k * (n + 1)));
      var show = k !== 0 && Math.abs(k) <= n && Math.abs(2 * k) <= n;
      d1.setAttribute('cx', P.X(1)); d1.setAttribute('cy', P.Y(k));
      t1.setAttribute('x', P.X(1) + 8); t1.setAttribute('y', P.Y(k) - 6);
      t1.textContent = '(1, ' + fmtN(k) + ')';
      d2.setAttribute('cx', P.X(2)); d2.setAttribute('cy', P.Y(2 * k));
      t2.setAttribute('x', P.X(2) + 8); t2.setAttribute('y', P.Y(2 * k) - 6);
      t2.textContent = '(2, ' + fmtN(2 * k) + ')';
      [d1, t1, d2, t2].forEach(function (o) { o.setAttribute('opacity', show ? 1 : 0); });
      read.innerHTML = k === 0
        ? 'k = 0 不是正比（y 恆為 0）——把 k 調到不是 0 試試'
        : '<b class="eq">y = ' + (k === 1 ? '' : k === -1 ? '−' : fmtN(k)) + 'x</b>　x 從 1 變 2（×2），y 從 ' + fmtN(k) + ' 變 ' + fmtN(2 * k) + '（也 ×2）；比值 y⁄x 永遠 = ' + fmtN(k);
      }
    var ctrls = div('ifig-sliders', box);
    slider(ctrls, 'k（比例常數）', -3, 3, 0.5, 2, function (v) { k = v; render(); });
    render();
  };

  /* ========== u21c3 反比 xy=k：調 k 看雙曲線與矩形面積 ========== */
  IF['u21c3'] = function (box) {
    div('ifig-title', box, '🎮 動手玩：調 k，看反比 xy = k——x 變 2 倍，y 就變一半；長方形面積永遠是 |k|');
    var n = 6, px = 22, pad = 18, W = (pad + n * px) * 2;
    var svg = el('svg', { viewBox: '0 0 ' + W + ' ' + W, 'class': 'ifig-svg' }, null);
    defsArrow(svg);
    var P = plane(svg, { n: n, pad: pad, px: px, tickEvery: 2 });
    var rect = el('rect', { fill: 'rgba(224,122,47,.18)', stroke: ORANGE, 'stroke-width': 1.5 }, svg);
    var rectT = mkTxt(svg, 0, 0, '', ORANGE, 11, 'middle', 1);
    var br1 = el('polyline', { fill: 'none', stroke: BLUE, 'stroke-width': 2.5, 'stroke-linecap': 'round' }, svg);
    var br2 = el('polyline', { fill: 'none', stroke: BLUE, 'stroke-width': 2.5, 'stroke-linecap': 'round' }, svg);
    var d1 = el('circle', { r: 5, fill: RED, stroke: '#fff', 'stroke-width': 1.5 }, svg);
    var d2 = el('circle', { r: 5, fill: RED, stroke: '#fff', 'stroke-width': 1.5 }, svg);
    box.appendChild(svg);
    var read = div('ifig-readout', box);
    var k = 8;
    function branch(sign) {
      var pts = [];
      for (var x = Math.abs(k) / n; x <= n + 0.001; x += 0.08) {
        var xx = sign * x, yy = k / xx;
        pts.push(P.X(xx) + ',' + P.Y(yy));
      }
      return pts.join(' ');
    }
    function render() {
      if (k === 0) {
        br1.setAttribute('points', ''); br2.setAttribute('points', '');
        [rect, rectT, d1, d2].forEach(function (o) { o.setAttribute('opacity', 0); });
        read.innerHTML = 'k = 0 不是反比——把 k 調到不是 0 試試';
        return;
      }
      br1.setAttribute('points', branch(1));
      br2.setAttribute('points', branch(-1));
      var x1 = 2, y1 = k / 2, x2 = 4, y2 = k / 4;
      d1.setAttribute('cx', P.X(x1)); d1.setAttribute('cy', P.Y(y1));
      d2.setAttribute('cx', P.X(x2)); d2.setAttribute('cy', P.Y(y2));
      rect.setAttribute('x', Math.min(P.X(0), P.X(x1)));
      rect.setAttribute('y', Math.min(P.Y(0), P.Y(y1)));
      rect.setAttribute('width', Math.abs(P.X(x1) - P.X(0)));
      rect.setAttribute('height', Math.abs(P.Y(y1) - P.Y(0)));
      rectT.setAttribute('x', P.X(x1 / 2)); rectT.setAttribute('y', P.Y(y1 / 2) + 4);
      rectT.textContent = '面積 ' + Math.abs(k);
      [rect, rectT, d1, d2].forEach(function (o) { o.setAttribute('opacity', 1); });
      read.innerHTML = '<b class="eq">xy = ' + fmtN(k) + '</b>　(2, ' + fmtN(y1) + ')、(4, ' + fmtN(y2) + ')：x×2 → y÷2；每個點的 x×y 都等於 ' + fmtN(k);
    }
    var ctrls = div('ifig-sliders', box);
    slider(ctrls, 'k（定值）', -12, 12, 2, 8, function (v) { k = v; render(); });
    render();
  };

  /* ========== u24c4 不等式解的圖示：空心實心＋射線 ========== */
  IF['u24c4'] = function (box) {
    div('ifig-title', box, '🎮 動手玩：調邊界數 m、切換不等號，看解在數線上怎麼畫（空心？實心？往哪邊？）');
    var W = 480, H = 120;
    var svg = el('svg', { viewBox: '0 0 ' + W + ' ' + H, 'class': 'ifig-svg' }, null);
    defsArrow(svg);
    var NL = numLine(svg, { from: -6, to: 6, y: 72, x0: 30, px: 35 });
    var ray = el('line', { y1: 48, y2: 48, stroke: ORANGE, 'stroke-width': 5, 'stroke-linecap': 'round', 'marker-end': 'url(#ifarr)' }, svg);
    var bnd = el('circle', { r: 8, 'stroke-width': 3, cy: 48 }, svg);
    box.appendChild(svg);
    var read = div('ifig-readout', box);
    var m = 2, op = '>';
    var OPS = { '>': 'x > m', '≥': 'x ≥ m', '<': 'x < m', '≤': 'x ≤ m' };
    function render() {
      var incl = op === '≥' || op === '≤';
      var right = op === '>' || op === '≥';
      bnd.setAttribute('cx', NL.X(m));
      bnd.setAttribute('fill', incl ? RED : '#fff');
      bnd.setAttribute('stroke', RED);
      ray.setAttribute('x1', NL.X(m) + (right ? 8 : -8));
      ray.setAttribute('x2', right ? NL.X(6) + 20 : NL.X(-6) - 20);
      read.innerHTML = '<b class="eq">x ' + op + ' ' + fmtN(m) + '</b>　' +
        (incl ? '<b class="q">實心點</b>：含 ' + fmtN(m) + ' 本身' : '<b class="q">空心點</b>：不含 ' + fmtN(m)) +
        '，往' + (right ? '右' : '左') + '無限延伸';
    }
    var ctrl = div('ifig-controls', box);
    var opBtns = [];
    Object.keys(OPS).forEach(function (o) {
      var b = btn('x ' + o + ' m', ctrl, function () {
        op = o;
        opBtns.forEach(function (x) { x.classList.remove('on'); });
        b.classList.add('on');
        render();
      });
      opBtns.push(b);
      if (o === op) b.classList.add('on');
    });
    var ctrls = div('ifig-sliders', box);
    slider(ctrls, 'm（邊界數）', -5, 5, 1, 2, function (v) { m = v; render(); });
    render();
  };

  /* ========== u26c2 和的平方 (a+b)²：面積模型 ========== */
  IF['u26c2'] = function (box) {
    div('ifig-title', box, '🎮 動手玩：調 a、b，看 (a+b)² 的正方形怎麼拆成 a² + 2ab + b²');
    var U = 22, pad = 34, W = 10 * U + pad + 16;
    var svg = el('svg', { viewBox: '0 0 ' + W + ' ' + W, 'class': 'ifig-svg ifig-narrow' }, null);
    var rA = el('rect', { fill: 'rgba(46,125,50,.25)', stroke: GREEN, 'stroke-width': 1.5 }, svg);
    var rB = el('rect', { fill: 'rgba(58,110,165,.25)', stroke: BLUE, 'stroke-width': 1.5 }, svg);
    var rAB1 = el('rect', { fill: 'rgba(224,122,47,.22)', stroke: ORANGE, 'stroke-width': 1.5 }, svg);
    var rAB2 = el('rect', { fill: 'rgba(224,122,47,.22)', stroke: ORANGE, 'stroke-width': 1.5 }, svg);
    var tA = mkTxt(svg, 0, 0, '', GREEN, 15, 'middle', 1);
    var tB = mkTxt(svg, 0, 0, '', BLUE, 15, 'middle', 1);
    var tAB1 = mkTxt(svg, 0, 0, 'ab', ORANGE, 14, 'middle', 1);
    var tAB2 = mkTxt(svg, 0, 0, 'ab', ORANGE, 14, 'middle', 1);
    var sTop1 = mkTxt(svg, 0, pad - 12, 'a', GREEN, 13, 'middle', 1);
    var sTop2 = mkTxt(svg, 0, pad - 12, 'b', BLUE, 13, 'middle', 1);
    var sL1 = mkTxt(svg, pad - 12, 0, 'a', GREEN, 13, 'middle', 1);
    var sL2 = mkTxt(svg, pad - 12, 0, 'b', BLUE, 13, 'middle', 1);
    box.appendChild(svg);
    var read = div('ifig-readout', box);
    var a = 3, b = 2;
    function render() {
      var A = a * U, B = b * U;
      rA.setAttribute('x', pad); rA.setAttribute('y', pad); rA.setAttribute('width', A); rA.setAttribute('height', A);
      rAB1.setAttribute('x', pad + A); rAB1.setAttribute('y', pad); rAB1.setAttribute('width', B); rAB1.setAttribute('height', A);
      rAB2.setAttribute('x', pad); rAB2.setAttribute('y', pad + A); rAB2.setAttribute('width', A); rAB2.setAttribute('height', B);
      rB.setAttribute('x', pad + A); rB.setAttribute('y', pad + A); rB.setAttribute('width', B); rB.setAttribute('height', B);
      tA.setAttribute('x', pad + A / 2); tA.setAttribute('y', pad + A / 2 + 5); tA.textContent = 'a²';
      tB.setAttribute('x', pad + A + B / 2); tB.setAttribute('y', pad + A + B / 2 + 5); tB.textContent = 'b²';
      tAB1.setAttribute('x', pad + A + B / 2); tAB1.setAttribute('y', pad + A / 2 + 5);
      tAB2.setAttribute('x', pad + A / 2); tAB2.setAttribute('y', pad + A + B / 2 + 5);
      sTop1.setAttribute('x', pad + A / 2); sTop2.setAttribute('x', pad + A + B / 2);
      sL1.setAttribute('y', pad + A / 2 + 5); sL2.setAttribute('y', pad + A + B / 2 + 5);
      read.innerHTML = '<b class="eq">(' + a + '+' + b + ')² = ' + a + '² + 2·' + a + '·' + b + ' + ' + b + '² = ' +
        (a * a) + ' + ' + (2 * a * b) + ' + ' + (b * b) + ' = ' + ((a + b) * (a + b)) + '</b>';
    }
    var ctrls = div('ifig-sliders', box);
    slider(ctrls, 'a', 1, 5, 1, 3, function (v) { a = v; render(); });
    slider(ctrls, 'b', 1, 5, 1, 2, function (v) { b = v; render(); });
    render();
  };

  /* ========== u26c4 平方差：a²−b² 剪一刀拼成 (a+b)(a−b) ========== */
  IF['u26c4'] = function (box) {
    div('ifig-title', box, '🎬 看動畫：a² 挖掉 b² 的 L 形，剪一刀搬過去，就拼成 (a+b)(a−b) 的長方形');
    var a = 150, b = 60, pad = 26, W = a + b + pad * 2 + 10, H = a + pad * 2 + 6;
    var svg = el('svg', { viewBox: '0 0 ' + W + ' ' + H, 'class': 'ifig-svg' }, null);
    function o(p) { return [p[0] + pad, p[1] + pad]; }
    /* 底：a² 正方形外框 */
    var sq = el('rect', { x: pad, y: pad, width: a, height: a, fill: 'rgba(58,110,165,.16)', stroke: BLUE, 'stroke-width': 2 }, svg);
    mkTxt(svg, pad + a / 2, pad - 10, 'a', BLUE, 13, 'middle', 1);
    mkTxt(svg, pad - 12, pad + a / 2 + 4, 'a', BLUE, 13, 'middle', 1);
    /* 挖掉的 b²（右上角） */
    var hole = el('rect', { x: pad + a - b, y: pad, width: b, height: b, fill: 'rgba(192,57,43,.3)', stroke: RED, 'stroke-width': 2, opacity: 0 }, svg);
    var holeT = mkTxt(svg, pad + a - b / 2, pad + b / 2 + 5, '挖掉 b²', RED, 12, 'middle', 1);
    holeT.setAttribute('opacity', 0);
    /* 切割線：左上塊（(a−b) 寬 × b 高）與下方大塊之間 */
    var cut = el('line', { x1: pad, y1: pad + b, x2: pad + a - b, y2: pad + b, stroke: RED, 'stroke-width': 2.5, 'stroke-dasharray': '6 5', opacity: 0 }, svg);
    /* 會搬家的上塊 */
    var pcFrom = [o([0, 0]), o([a - b, 0]), o([a - b, b]), o([0, b])];
    var pcTo = [o([a, a]), o([a, b]), o([a + b, b]), o([a + b, a])];
    var piece = el('polygon', { points: ptsStr(pcFrom), fill: 'rgba(46,125,50,.3)', stroke: GREEN, 'stroke-width': 2, opacity: 0 }, svg);
    /* 完成標示 */
    var wT = mkTxt(svg, pad + (a + b) / 2, pad + a + 18, '長 (a+b) × 寬 (a−b)', GREEN, 13, 'middle', 1); wT.setAttribute('opacity', 0);
    box.appendChild(svg);
    stepPlayer(box, [
      { d: '先有一個面積 <b>a²</b> 的大正方形。', els: [] },
      { d: '右上角<b style="color:#c0392b">挖掉一個 b²</b>，剩下 L 形，面積就是 a² − b²。', els: [hole, holeT] },
      { d: '沿虛線<b>剪一刀</b>，把 L 形分成兩塊。', draw: [cut], els: [piece], on: function () { piece.setAttribute('points', ptsStr(pcFrom)); } },
      { d: '把上面那塊<b style="color:#2e7d32">旋轉搬到右邊</b>——拼成一個長 (a+b)、寬 (a−b) 的長方形！所以 <b>a² − b² = (a+b)(a−b)</b> ✓', els: [wT], on: function () {
        morphPoly(piece, pcFrom, pcTo, 800);
      } }
    ], '✓ 拼好了');
  };

  /* ========== u36c2 配方法：x²+px 補成完全平方 ========== */
  IF['u36c2'] = function (box) {
    div('ifig-title', box, '🎬 看動畫：x² + px 的長條切一半搬下來，缺角補上 (p/2)²，就「配」成正方形');
    var x = 120, p = 60, pad = 26, W = x + p + pad * 2 + 10, H = x + p / 2 + pad * 2 + 8;
    var svg = el('svg', { viewBox: '0 0 ' + W + ' ' + H, 'class': 'ifig-svg' }, null);
    function o(q) { return [q[0] + pad, q[1] + pad]; }
    el('rect', { x: pad, y: pad, width: x, height: x, fill: 'rgba(58,110,165,.18)', stroke: BLUE, 'stroke-width': 2 }, svg);
    mkTxt(svg, pad + x / 2, pad + x / 2 + 6, 'x²', BLUE, 18, 'middle', 1);
    mkTxt(svg, pad + x / 2, pad - 10, 'x', BLUE, 13, 'middle', 1);
    var strip = el('rect', { x: pad + x, y: pad, width: p, height: x, fill: 'rgba(224,122,47,.22)', stroke: ORANGE, 'stroke-width': 2, opacity: 0 }, svg);
    var stripT = mkTxt(svg, pad + x + p / 2, pad + x / 2 + 5, 'px', ORANGE, 15, 'middle', 1); stripT.setAttribute('opacity', 0);
    var stripL = mkTxt(svg, pad + x + p / 2, pad - 10, 'p', ORANGE, 13, 'middle', 1); stripL.setAttribute('opacity', 0);
    var cut = el('line', { x1: pad + x + p / 2, y1: pad, x2: pad + x + p / 2, y2: pad + x, stroke: RED, 'stroke-width': 2.5, 'stroke-dasharray': '6 5', opacity: 0 }, svg);
    var pcFrom = [o([x + p / 2, 0]), o([x + p, 0]), o([x + p, x]), o([x + p / 2, x])];
    var pcTo = [o([0, x + p / 2]), o([0, x]), o([x, x]), o([x, x + p / 2])];
    var piece = el('polygon', { points: ptsStr(pcFrom), fill: 'rgba(224,122,47,.32)', stroke: ORANGE, 'stroke-width': 2, opacity: 0 }, svg);
    var corner = el('rect', { x: pad + x, y: pad + x, width: p / 2, height: p / 2, fill: 'rgba(46,125,50,.28)', stroke: GREEN, 'stroke-width': 2, 'stroke-dasharray': '5 4', opacity: 0 }, svg);
    var cornerT = mkTxt(svg, pad + x + p / 4, pad + x + p / 4 + 5, '(p/2)²', GREEN, 11, 'middle', 1); cornerT.setAttribute('opacity', 0);
    var doneBox = el('rect', { x: pad, y: pad, width: x + p / 2, height: x + p / 2, fill: 'none', stroke: GREEN, 'stroke-width': 3, opacity: 0 }, svg);
    box.appendChild(svg);
    stepPlayer(box, [
      { d: '<b>x²</b> 是一個正方形，<b style="color:#e07a2f">px</b> 是貼在旁邊、寬 p 的長條。', els: [strip, stripT, stripL] },
      { d: '把長條<b>切成兩半</b>，每半寬 p/2。', draw: [cut], els: [] },
      { d: '一半留在右邊，另一半<b style="color:#e07a2f">搬到下面</b>。', els: [piece], on: function () { morphPoly(piece, pcFrom, pcTo, 800); } },
      { d: '右下角剛好缺一個 <b style="color:#2e7d32">(p/2)²</b> 的小方塊——補上它，就是邊長 (x + p/2) 的完全平方：<b>x² + px + (p/2)² = (x + p/2)²</b> ✓', draw: [doneBox], els: [corner, cornerT] }
    ], '✓ 配好了');
  };

  /* ========== 母子相似（直角三角形斜邊上的高）：u31c3 / u51c2 共用 ========== */
  function motherChild(box) {
    div('ifig-title', box, '🎬 看動畫：斜邊上的高把直角三角形切成兩個小三角形——每個都和原三角形相似（母子相似）');
    var W = 460, H = 300;
    var svg = el('svg', { viewBox: '0 0 ' + W + ' ' + H, 'class': 'ifig-svg' }, null);
    var C = [110, 250], B = [410, 250], A = [110, 70];
    /* 垂足 H：C 對斜邊 AB 的投影 */
    var ab = [B[0] - A[0], B[1] - A[1]];
    var t = ((C[0] - A[0]) * ab[0] + (C[1] - A[1]) * ab[1]) / (ab[0] * ab[0] + ab[1] * ab[1]);
    var Hp = [A[0] + ab[0] * t, A[1] + ab[1] * t];
    el('polygon', { points: A + ' ' + B + ' ' + C, fill: 'rgba(58,110,165,.08)', stroke: INK, 'stroke-width': 2.5, 'stroke-linejoin': 'round' }, svg);
    mkTxt(svg, A[0] - 12, A[1] - 6, 'A', INK, 15, 'middle', 1);
    mkTxt(svg, B[0] + 14, B[1] + 6, 'B', INK, 15, 'middle', 1);
    mkTxt(svg, C[0] - 14, C[1] + 6, 'C', INK, 15, 'middle', 1);
    el('rect', { x: C[0], y: C[1] - 14, width: 14, height: 14, fill: 'none', stroke: INK, 'stroke-width': 1.5 }, svg);
    var tri1 = el('polygon', { points: A + ' ' + Hp + ' ' + C, fill: 'rgba(58,110,165,.3)', stroke: 'none', opacity: 0 }, svg);
    var tri2 = el('polygon', { points: C + ' ' + Hp + ' ' + B, fill: 'rgba(46,125,50,.3)', stroke: 'none', opacity: 0 }, svg);
    var alt = el('line', { x1: C[0], y1: C[1], x2: Hp[0], y2: Hp[1], stroke: RED, 'stroke-width': 3, 'stroke-linecap': 'round' }, svg);
    var altT = mkTxt(svg, (C[0] + Hp[0]) / 2 - 6, (C[1] + Hp[1]) / 2 - 10, 'h', RED, 14, 'middle', 1);
    var hT = mkTxt(svg, Hp[0] + 12, Hp[1] - 8, 'H', RED, 13, 'middle', 1);
    [alt, altT, hT].forEach(hideEl);
    var arcA1 = arcAt(svg, A, B, C, 26, ORANGE); hideEl(arcA1);
    var arcB1 = arcAt(svg, B, A, C, 30, BLUE); hideEl(arcB1);
    var con = mkTxt(svg, W / 2, 26, 'h² = AH × BH　　AC² = AH × AB　　BC² = BH × AB', RED, 13, 'middle', 1);
    con.setAttribute('opacity', 0);
    box.appendChild(svg);
    stepPlayer(box, [
      { d: '從直角頂點 C 作<b style="color:#c0392b">斜邊上的高 CH</b>（輔助線）——把大三角形切成左右兩個小三角形。', draw: [alt], els: [altT, hT] },
      { d: '左邊 <b style="color:#3a6ea5">△AHC</b>：和大三角形 △ACB <b>共用 ∠A</b>，又都有一個直角 → AA 相似。', els: [tri1, arcA1] },
      { d: '右邊 <b style="color:#2e7d32">△BHC</b>：和大三角形 △BCA <b>共用 ∠B</b>，也有直角 → AA 相似。兩個小三角形彼此也相似！', els: [tri2, arcB1] },
      { d: '對應邊成比例，得三條「母子相似」公式：<b>h² = AH·BH</b>、<b>AC² = AH·AB</b>、<b>BC² = BH·AB</b> ✓', els: [con] }
    ], '✓ 完成');
  }
  IF['u31c3'] = motherChild;
  IF['u51c2'] = motherChild;

  /* ========== u42c2 三角形外角定理：外角 = 兩遠內角之和 ========== */
  IF['u42c2'] = function (box) {
    div('ifig-title', box, '🎬 看動畫：為什麼外角＝兩個遠內角相加？輔助線一步步畫給你看');
    var W = 470, H = 290;
    var svg = el('svg', { viewBox: '0 0 ' + W + ' ' + H, 'class': 'ifig-svg' }, null);
    var B = [50, 245], C = [300, 245], A = [160, 85], D = [455, 245];
    el('polygon', { points: A + ' ' + B + ' ' + C, fill: 'rgba(58,110,165,.08)', stroke: INK, 'stroke-width': 2.5, 'stroke-linejoin': 'round' }, svg);
    mkTxt(svg, A[0], A[1] - 12, 'A', INK, 15, 'middle', 1);
    mkTxt(svg, B[0] - 12, B[1] + 6, 'B', INK, 15, 'middle', 1);
    mkTxt(svg, C[0] - 4, C[1] + 20, 'C', INK, 15, 'middle', 1);
    arcAt(svg, A, B, C, 24, RED);
    mkTxt(svg, A[0] + 2, A[1] + 40, '∠A', RED, 13, 'middle', 1);
    arcAt(svg, B, C, A, 28, BLUE);
    mkTxt(svg, B[0] + 42, B[1] - 10, '∠B', BLUE, 13, 'middle', 1);
    /* step1：延長 BC 到 D，標外角 */
    var ext = el('line', { x1: C[0], y1: C[1], x2: D[0], y2: D[1], stroke: INK, 'stroke-width': 2.5, 'stroke-dasharray': '2 5', opacity: 0 }, svg);
    var dT = mkTxt(svg, D[0] - 6, D[1] + 20, 'D', INK, 14, 'middle', 1); dT.setAttribute('opacity', 0);
    var extArc = arcAt(svg, C, A, D, 40, ORANGE, 2.5); hideEl(extArc);
    var extT = mkTxt(svg, C[0] + 46, C[1] - 34, '外角', ORANGE, 13, 'middle', 1); extT.setAttribute('opacity', 0);
    /* step2：CE ∥ AB */
    var E = [C[0] + 130, C[1] - 189];
    var ce = el('line', { x1: C[0], y1: C[1], x2: E[0], y2: E[1], stroke: ORANGE, 'stroke-width': 2.5, 'stroke-dasharray': '7 5', opacity: 0 }, svg);
    var eT = mkTxt(svg, E[0] + 8, E[1] - 8, 'E（CE ∥ AB）', ORANGE, 12, 'end', 1); eT.setAttribute('opacity', 0);
    /* step3：∠ACE = ∠A（內錯角） */
    var arc1 = arcAt(svg, C, A, E, 26, RED); hideEl(arc1);
    var t1 = mkTxt(svg, C[0] - 8, C[1] - 40, '∠1', RED, 12, 'middle', 1); t1.setAttribute('opacity', 0);
    /* step4：∠ECD = ∠B（同位角） */
    var arc2 = arcAt(svg, C, E, D, 30, BLUE); hideEl(arc2);
    var t2 = mkTxt(svg, C[0] + 44, C[1] - 12, '∠2', BLUE, 12, 'middle', 1); t2.setAttribute('opacity', 0);
    var con = mkTxt(svg, W / 2, 26, '∠ACD = ∠1 + ∠2 = ∠A + ∠B', RED, 14, 'middle', 1); con.setAttribute('opacity', 0);
    box.appendChild(svg);
    stepPlayer(box, [
      { d: '把 BC <b>延長到 D</b>——∠ACD 就是 C 的<b style="color:#e07a2f">外角</b>。', draw: [ext], els: [dT, extArc, extT] },
      { d: '過 C 畫<b style="color:#e07a2f">輔助線 CE，平行 AB</b>。', draw: [ce], els: [eT] },
      { d: 'CE ∥ AB，AC 當截線 → <b style="color:#c0392b">∠1 = ∠A（內錯角）</b>。', draw: [arc1], els: [t1] },
      { d: 'CE ∥ AB，BD 當截線 → <b style="color:#3a6ea5">∠2 = ∠B（同位角）</b>。', draw: [arc2], els: [t2] },
      { d: '外角 ∠ACD 剛好被拆成 ∠1 + ∠2 → <b>外角 = ∠A + ∠B（兩遠內角之和）</b> ✓', els: [con] }
    ], '✓ 證明完成');
  };

  /* ========== u42c3 n 邊形內角和：切三角形數一數 ========== */
  IF['u42c3'] = function (box) {
    div('ifig-title', box, '🎮 動手玩：調邊數 n，從一個頂點切對角線——切出幾個三角形，內角和就是幾個 180°');
    var W = 420, H = 320, cx = W / 2, cy = 158, r = 122;
    var svg = el('svg', { viewBox: '0 0 ' + W + ' ' + H, 'class': 'ifig-svg' }, null);
    var g = el('g', null, svg);
    box.appendChild(svg);
    var read = div('ifig-readout', box);
    var n = 5;
    function render() {
      while (g.firstChild) g.removeChild(g.firstChild);
      var vs = [];
      for (var i = 0; i < n; i++) {
        var ang = -Math.PI / 2 + i * 2 * Math.PI / n;
        vs.push([cx + r * Math.cos(ang), cy + r * Math.sin(ang)]);
      }
      for (var i2 = 1; i2 < n - 1; i2++) {
        el('polygon', {
          points: ptsStr([vs[0], vs[i2], vs[i2 + 1]]),
          fill: i2 % 2 ? 'rgba(58,110,165,.16)' : 'rgba(224,122,47,.16)', stroke: 'none'
        }, g);
      }
      el('polygon', { points: ptsStr(vs), fill: 'none', stroke: INK, 'stroke-width': 2.5, 'stroke-linejoin': 'round' }, g);
      for (var i3 = 2; i3 < n - 1; i3++) {
        var dg = el('line', { x1: vs[0][0], y1: vs[0][1], x2: vs[i3][0], y2: vs[i3][1], stroke: RED, 'stroke-width': 2, 'stroke-dasharray': '6 4' }, g);
        drawIn(dg, 0.5);
      }
      el('circle', { cx: vs[0][0], cy: vs[0][1], r: 6, fill: RED, stroke: '#fff', 'stroke-width': 2 }, g);
      read.innerHTML = n + ' 邊形從一個頂點切出 <b class="q">' + (n - 2) + '</b> 個三角形　→　內角和 = (' + n + '−2) × 180° = <b class="eq">' + (n - 2) * 180 + '°</b>';
    }
    var ctrls = div('ifig-sliders', box);
    slider(ctrls, 'n（邊數）', 3, 8, 1, 5, function (v) { n = v; render(); });
    render();
  };

  /* ========== u46c3 平行線的截線性質：同位角／內錯角／同側內角 ========== */
  IF['u46c3'] = function (box) {
    div('ifig-title', box, '🎮 動手玩：調截線的角度，按按鈕看三種角的關係——同位角、內錯角相等；同側內角互補');
    var W = 460, H = 300, y1 = 100, y2 = 210, mx = 230, my = 155;
    var svg = el('svg', { viewBox: '0 0 ' + W + ' ' + H, 'class': 'ifig-svg' }, null);
    defsArrow(svg);
    el('line', { x1: 24, y1: y1, x2: 436, y2: y1, stroke: INK, 'stroke-width': 2.5 }, svg);
    el('line', { x1: 24, y1: y2, x2: 436, y2: y2, stroke: INK, 'stroke-width': 2.5 }, svg);
    mkTxt(svg, 445, y1 + 4, 'L₁', INK, 13, 'middle', 1);
    mkTxt(svg, 445, y2 + 4, 'L₂', INK, 13, 'middle', 1);
    var tr = el('line', { stroke: BLUE, 'stroke-width': 2.5 }, svg);
    var dyn = el('g', null, svg);
    box.appendChild(svg);
    var read = div('ifig-readout', box);
    var th = 60, mode = 'corr';
    function pts() {
      var rad = th * Math.PI / 180;
      var dir = [Math.cos(rad), -Math.sin(rad)];
      var t1 = (y1 - my) / dir[1], t2 = (y2 - my) / dir[1];
      var P1 = [mx + dir[0] * t1, y1], P2 = [mx + dir[0] * t2, y2];
      return { P1: P1, P2: P2, dir: dir };
    }
    function render() {
      while (dyn.firstChild) dyn.removeChild(dyn.firstChild);
      var o = pts(), P1 = o.P1, P2 = o.P2, dir = o.dir;
      var E1 = [P1[0] + dir[0] * 62, P1[1] + dir[1] * 62];
      var E2 = [P2[0] - dir[0] * 62, P2[1] - dir[1] * 62];
      tr.setAttribute('x1', E1[0]); tr.setAttribute('y1', E1[1]);
      tr.setAttribute('x2', E2[0]); tr.setAttribute('y2', E2[1]);
      function R(p) { return [p[0] + 60, p[1]]; }      // 往右的方向點
      function Lf(p) { return [p[0] - 60, p[1]]; }     // 往左
      var up1 = [P1[0] + dir[0] * 60, P1[1] + dir[1] * 60];
      var dn1 = [P1[0] - dir[0] * 60, P1[1] - dir[1] * 60];
      var up2 = [P2[0] + dir[0] * 60, P2[1] + dir[1] * 60];
      var msg = '';
      if (mode === 'corr') {
        var a1 = arcAt(dyn, P1, R(P1), up1, 22, RED); drawIn(a1, 0.4);
        var a2 = arcAt(dyn, P2, R(P2), up2, 22, RED); drawIn(a2, 0.4);
        mkTxt(dyn, P1[0] + 34, P1[1] - 14, th + '°', RED, 12, 'middle', 1);
        mkTxt(dyn, P2[0] + 34, P2[1] - 14, th + '°', RED, 12, 'middle', 1);
        msg = '<b style="color:#c0392b">同位角</b>：兩個角在截線<b>同側、同位置</b>（都在右上）→ 相等，都是 ' + th + '°';
      } else if (mode === 'alt') {
        var b1 = arcAt(dyn, P1, Lf(P1), dn1, 22, GREEN); drawIn(b1, 0.4);
        var b2 = arcAt(dyn, P2, R(P2), up2, 22, GREEN); drawIn(b2, 0.4);
        mkTxt(dyn, P1[0] - 34, P1[1] + 18, th + '°', GREEN, 12, 'middle', 1);
        mkTxt(dyn, P2[0] + 34, P2[1] - 14, th + '°', GREEN, 12, 'middle', 1);
        msg = '<b style="color:#2e7d32">內錯角</b>：兩個角在兩線<b>之間、截線異側</b>（Z 字形）→ 相等，都是 ' + th + '°';
      } else {
        var c1 = arcAt(dyn, P1, R(P1), dn1, 22, ORANGE); drawIn(c1, 0.4);
        var c2 = arcAt(dyn, P2, R(P2), up2, 22, ORANGE); drawIn(c2, 0.4);
        mkTxt(dyn, P1[0] + 36, P1[1] + 18, (180 - th) + '°', ORANGE, 12, 'middle', 1);
        mkTxt(dyn, P2[0] + 34, P2[1] - 14, th + '°', ORANGE, 12, 'middle', 1);
        msg = '<b style="color:#e07a2f">同側內角</b>：兩個角在兩線<b>之間、截線同側</b>（C 字形）→ 互補：' + (180 - th) + '° + ' + th + '° = 180°';
      }
      read.innerHTML = msg;
    }
    var ctrl = div('ifig-controls', box);
    var mBtns = [];
    [['corr', '同位角'], ['alt', '內錯角'], ['co', '同側內角']].forEach(function (mopt) {
      var b = btn(mopt[1], ctrl, function () {
        mode = mopt[0];
        mBtns.forEach(function (x) { x.classList.remove('on'); });
        b.classList.add('on');
        render();
      });
      mBtns.push(b);
      if (mopt[0] === mode) b.classList.add('on');
    });
    var ctrls = div('ifig-sliders', box);
    slider(ctrls, '截線角度', 30, 150, 5, 60, function (v) { th = v; render(); });
    render();
  };

  /* ========== u47c2 平行四邊形性質：一條對角線的證明脈絡 ========== */
  IF['u47c2'] = function (box) {
    div('ifig-title', box, '🎬 看動畫：畫一條對角線，用內錯角證出兩個三角形全等——對邊、對角相等就都出來了');
    var W = 470, H = 300;
    var svg = el('svg', { viewBox: '0 0 ' + W + ' ' + H, 'class': 'ifig-svg' }, null);
    var A = [90, 90], B = [330, 90], C = [390, 230], D = [150, 230];
    el('polygon', { points: A + ' ' + B + ' ' + C + ' ' + D, fill: 'rgba(58,110,165,.08)', stroke: INK, 'stroke-width': 2.5, 'stroke-linejoin': 'round' }, svg);
    mkTxt(svg, A[0] - 12, A[1] - 8, 'A', INK, 15, 'middle', 1);
    mkTxt(svg, B[0] + 12, B[1] - 8, 'B', INK, 15, 'middle', 1);
    mkTxt(svg, C[0] + 12, C[1] + 12, 'C', INK, 15, 'middle', 1);
    mkTxt(svg, D[0] - 12, D[1] + 12, 'D', INK, 15, 'middle', 1);
    var tri1 = el('polygon', { points: A + ' ' + B + ' ' + C, fill: 'rgba(58,110,165,.22)', stroke: 'none', opacity: 0 }, svg);
    var tri2 = el('polygon', { points: A + ' ' + C + ' ' + D, fill: 'rgba(224,122,47,.2)', stroke: 'none', opacity: 0 }, svg);
    var diag = el('line', { x1: A[0], y1: A[1], x2: C[0], y2: C[1], stroke: RED, 'stroke-width': 2.5 }, svg); hideEl(diag);
    var a1 = arcAt(svg, A, B, C, 26, BLUE); hideEl(a1);
    var a2 = arcAt(svg, C, D, A, 26, BLUE); hideEl(a2);
    var t1a = mkTxt(svg, A[0] + 38, A[1] + 16, '∠1', BLUE, 12, 'middle', 1); t1a.setAttribute('opacity', 0);
    var t1b = mkTxt(svg, C[0] - 38, C[1] - 14, '∠2', BLUE, 12, 'middle', 1); t1b.setAttribute('opacity', 0);
    var b1 = arcAt(svg, A, C, D, 34, GREEN); hideEl(b1);
    var b2 = arcAt(svg, C, B, A, 34, GREEN); hideEl(b2);
    var t2a = mkTxt(svg, A[0] + 22, A[1] + 44, '∠3', GREEN, 12, 'middle', 1); t2a.setAttribute('opacity', 0);
    var t2b = mkTxt(svg, C[0] - 24, C[1] - 42, '∠4', GREEN, 12, 'middle', 1); t2b.setAttribute('opacity', 0);
    var con = mkTxt(svg, W / 2, 26, 'AB = CD、AD = CB、∠B = ∠D、∠A = ∠C', RED, 14, 'middle', 1); con.setAttribute('opacity', 0);
    box.appendChild(svg);
    stepPlayer(box, [
      { d: '畫<b style="color:#c0392b">對角線 AC</b>（輔助線）——把平行四邊形切成兩個三角形。', draw: [diag], els: [] },
      { d: 'AB ∥ DC，AC 當截線 → <b style="color:#3a6ea5">∠1 = ∠2（內錯角）</b>。', draw: [a1, a2], els: [t1a, t1b] },
      { d: 'AD ∥ BC，AC 當截線 → <b style="color:#2e7d32">∠3 = ∠4（內錯角）</b>。', draw: [b1, b2], els: [t2a, t2b] },
      { d: '兩角夾 <b>AC（共用邊）</b> → ASA 全等：<b style="color:#3a6ea5">△ABC ≅ △CDA</b>。', els: [tri1, tri2] },
      { d: '全等的對應邊、對應角相等 → <b>兩組對邊相等、兩組對角相等</b> ✓（對角線互相平分也可用同法證）', els: [con] }
    ], '✓ 證明完成');
  };

  /* ========== u49c1 同底等高：拖頂點，面積不變 ========== */
  IF['u49c1'] = function (box) {
    div('ifig-title', box, '🎮 動手玩：沿虛線左右拖動頂點 A——底不變、高不變，形狀再歪面積都一樣！');
    var W = 460, H = 300, yB = 250, yA = 100, px = 30;
    var svg = el('svg', { viewBox: '0 0 ' + W + ' ' + H, 'class': 'ifig-svg' }, null);
    el('line', { x1: 24, y1: yA, x2: 436, y2: yA, stroke: SOFT, 'stroke-width': 1.5, 'stroke-dasharray': '6 5' }, svg);
    mkTxt(svg, 436, yA - 8, '平行底邊的線', SOFT, 11, 'end');
    var B = [80, yB], C = [380, yB];
    el('line', { x1: B[0], y1: yB, x2: C[0], y2: yB, stroke: INK, 'stroke-width': 3 }, svg);
    mkTxt(svg, B[0] - 12, yB + 6, 'B', INK, 15, 'middle', 1);
    mkTxt(svg, C[0] + 12, yB + 6, 'C', INK, 15, 'middle', 1);
    mkTxt(svg, (B[0] + C[0]) / 2, yB + 22, '底 = 10', INK, 12, 'middle');
    var tri = el('polygon', { fill: 'rgba(58,110,165,.2)', stroke: BLUE, 'stroke-width': 2.5, 'stroke-linejoin': 'round' }, svg);
    var hgt = el('line', { stroke: RED, 'stroke-width': 2, 'stroke-dasharray': '5 4' }, svg);
    var hT = mkTxt(svg, 0, (yA + yB) / 2, '高 5', RED, 12, 'start', 1);
    var dot = el('circle', { r: 9, fill: RED, stroke: '#fff', 'stroke-width': 2.5, 'class': 'ifig-drag' }, svg);
    var aT = mkTxt(svg, 0, yA - 14, 'A', RED, 15, 'middle', 1);
    box.appendChild(svg);
    var read = div('ifig-readout', box);
    var ax = 150;
    function render() {
      tri.setAttribute('points', ptsStr([[ax, yA], B, C]));
      dot.setAttribute('cx', ax); dot.setAttribute('cy', yA);
      aT.setAttribute('x', ax);
      hgt.setAttribute('x1', ax); hgt.setAttribute('y1', yA);
      hgt.setAttribute('x2', ax); hgt.setAttribute('y2', yB);
      hT.setAttribute('x', ax + 8);
      read.innerHTML = '底 = 10、高 = 5（都沒變）　→　面積 = ½ × 10 × 5 = <b class="q">25</b>（恆不變！）';
    }
    var dragging = false;
    function toV(e) {
      var p = evPt(svg, e, W);
      ax = Math.max(40, Math.min(420, p.x));
      render();
    }
    svg.addEventListener('pointerdown', function (e) { e.preventDefault(); dragging = true; try { svg.setPointerCapture(e.pointerId); } catch (er) {} toV(e); });
    svg.addEventListener('pointermove', function (e) { if (dragging) { e.preventDefault(); toV(e); } });
    svg.addEventListener('pointerup', function () { dragging = false; });
    svg.addEventListener('pointercancel', function () { dragging = false; });
    render();
  };

  /* ========== u50c1 縮放與相似：調倍率 k，看邊長／周長／面積怎麼變 ========== */
  IF['u50c1'] = function (box) {
    div('ifig-title', box, '🎮 動手玩：調縮放倍率 k——邊長變 k 倍、周長變 k 倍，但面積變 k² 倍！');
    var W = 460, H = 310;
    var svg = el('svg', { viewBox: '0 0 ' + W + ' ' + H, 'class': 'ifig-svg' }, null);
    var O = [46, 270];
    var base = [[126, 270], [186, 270], [146, 200]];
    mkTxt(svg, O[0] - 4, O[1] + 20, 'O（縮放中心）', INK, 12, 'start', 1);
    el('circle', { cx: O[0], cy: O[1], r: 4, fill: INK }, svg);
    var rays = base.map(function () {
      return el('line', { stroke: SOFT, 'stroke-width': 1.2, 'stroke-dasharray': '5 5' }, svg);
    });
    var triO = el('polygon', { points: ptsStr(base), fill: 'rgba(58,110,165,.28)', stroke: BLUE, 'stroke-width': 2 }, svg);
    var triK = el('polygon', { fill: 'rgba(224,122,47,.22)', stroke: ORANGE, 'stroke-width': 2.5 }, svg);
    box.appendChild(svg);
    var read = div('ifig-readout', box);
    var k = 2;
    function render() {
      var scaled = base.map(function (p) { return [O[0] + (p[0] - O[0]) * k, O[1] + (p[1] - O[1]) * k]; });
      triK.setAttribute('points', ptsStr(scaled));
      rays.forEach(function (r, i) {
        var far = Math.max(k, 1) + 0.25;
        r.setAttribute('x1', O[0]); r.setAttribute('y1', O[1]);
        r.setAttribute('x2', O[0] + (base[i][0] - O[0]) * far);
        r.setAttribute('y2', O[1] + (base[i][1] - O[1]) * far);
      });
      read.innerHTML = 'k = <b>' + fmtN(k) + '</b>　邊長 × <b style="color:#e07a2f">' + fmtN(k) + '</b>、周長 × <b style="color:#e07a2f">' + fmtN(k) + '</b>、面積 × <b class="q">' + fmtN(k * k) + '</b>（k²）';
    }
    var ctrls = div('ifig-sliders', box);
    slider(ctrls, 'k（縮放倍率）', 0.5, 3, 0.5, 2, function (v) { k = v; render(); });
    render();
  };

  /* ========== u53c2 圓周角：拖 P、調圓心角，圓周角永遠是一半 ========== */
  IF['u53c2'] = function (box) {
    div('ifig-title', box, '🎮 動手玩：拖動圓上的 P 點、調圓心角——同弧的圓周角不管 P 在哪，永遠是圓心角的一半');
    var W = 420, H = 330, cx = W / 2, cy = 165, r = 118;
    var svg = el('svg', { viewBox: '0 0 ' + W + ' ' + H, 'class': 'ifig-svg' }, null);
    el('circle', { cx: cx, cy: cy, r: r, fill: 'none', stroke: INK, 'stroke-width': 2.5 }, svg);
    el('circle', { cx: cx, cy: cy, r: 3.5, fill: INK }, svg);
    mkTxt(svg, cx + 12, cy - 6, 'O', INK, 13, 'middle', 1);
    var arcAB = el('path', { fill: 'none', stroke: ORANGE, 'stroke-width': 5, 'stroke-linecap': 'round' }, svg);
    var rA = el('line', { stroke: RED, 'stroke-width': 2 }, svg);
    var rB = el('line', { stroke: RED, 'stroke-width': 2 }, svg);
    var cA = el('line', { stroke: BLUE, 'stroke-width': 2 }, svg);
    var cB = el('line', { stroke: BLUE, 'stroke-width': 2 }, svg);
    var cArc = el('g', null, svg);
    var dA = el('circle', { r: 5, fill: ORANGE, stroke: '#fff', 'stroke-width': 1.5 }, svg);
    var dB = el('circle', { r: 5, fill: ORANGE, stroke: '#fff', 'stroke-width': 1.5 }, svg);
    var tA = mkTxt(svg, 0, 0, 'A', ORANGE, 13, 'middle', 1);
    var tB = mkTxt(svg, 0, 0, 'B', ORANGE, 13, 'middle', 1);
    var dP = el('circle', { r: 9, fill: BLUE, stroke: '#fff', 'stroke-width': 2.5, 'class': 'ifig-drag' }, svg);
    var tP = mkTxt(svg, 0, 0, 'P', BLUE, 13, 'middle', 1);
    box.appendChild(svg);
    var read = div('ifig-readout', box);
    var th = 100, pAng = -Math.PI / 2;
    function onC(ang) { return [cx + r * Math.cos(ang), cy + r * Math.sin(ang)]; }
    function clampP() {
      var half = th * Math.PI / 360, m = 0.3;
      var lo = Math.PI / 2 + half + m, hi = Math.PI / 2 + 2 * Math.PI - half - m;
      var a = pAng;
      while (a < Math.PI / 2) a += 2 * Math.PI;
      pAng = Math.max(lo, Math.min(hi, a));
    }
    function render() {
      clampP();
      var half = th * Math.PI / 360;
      var A = onC(Math.PI / 2 + half), B = onC(Math.PI / 2 - half), P = onC(pAng);
      arcAB.setAttribute('d', 'M' + A[0] + ',' + A[1] + ' A' + r + ',' + r + ' 0 0,0 ' + B[0] + ',' + B[1]);
      rA.setAttribute('x1', cx); rA.setAttribute('y1', cy); rA.setAttribute('x2', A[0]); rA.setAttribute('y2', A[1]);
      rB.setAttribute('x1', cx); rB.setAttribute('y1', cy); rB.setAttribute('x2', B[0]); rB.setAttribute('y2', B[1]);
      cA.setAttribute('x1', P[0]); cA.setAttribute('y1', P[1]); cA.setAttribute('x2', A[0]); cA.setAttribute('y2', A[1]);
      cB.setAttribute('x1', P[0]); cB.setAttribute('y1', P[1]); cB.setAttribute('x2', B[0]); cB.setAttribute('y2', B[1]);
      dA.setAttribute('cx', A[0]); dA.setAttribute('cy', A[1]);
      dB.setAttribute('cx', B[0]); dB.setAttribute('cy', B[1]);
      tA.setAttribute('x', A[0] + (A[0] > cx ? 14 : -14)); tA.setAttribute('y', A[1] + 16);
      tB.setAttribute('x', B[0] + (B[0] > cx ? 14 : -14)); tB.setAttribute('y', B[1] + 16);
      dP.setAttribute('cx', P[0]); dP.setAttribute('cy', P[1]);
      tP.setAttribute('x', P[0] + (P[0] > cx ? 16 : -16)); tP.setAttribute('y', P[1] + (P[1] > cy ? 18 : -10));
      while (cArc.firstChild) cArc.removeChild(cArc.firstChild);
      arcAt(cArc, [cx, cy], A, B, 24, RED);
      arcAt(cArc, P, A, B, 26, BLUE);
      read.innerHTML = '圓心角 = <b class="q">' + th + '°</b>　圓周角 = <b style="color:#3a6ea5">' + (th / 2) + '°</b>（一半）' +
        (th === 180 ? '　💡 AB 是直徑 → 圓周角 = 90°（半圓的圓周角）' : '');
    }
    var dragging = false;
    svg.addEventListener('pointerdown', function (e) {
      e.preventDefault(); dragging = true;
      try { svg.setPointerCapture(e.pointerId); } catch (er) {}
    });
    svg.addEventListener('pointermove', function (e) {
      if (!dragging) return;
      e.preventDefault();
      var q = evPt(svg, e, W);
      pAng = Math.atan2(q.y - cy, q.x - cx);
      render();
    });
    svg.addEventListener('pointerup', function () { dragging = false; });
    svg.addEventListener('pointercancel', function () { dragging = false; });
    var ctrls = div('ifig-sliders', box);
    slider(ctrls, '圓心角', 40, 180, 10, 100, function (v) { th = v; render(); });
    render();
  };

  /* ========== u55c3 重心：拖頂點，中線交點永遠 2:1 ========== */
  IF['u55c3'] = function (box) {
    div('ifig-title', box, '🎮 動手玩：拖動任何一個頂點——三條中線永遠交於一點（重心 G），而且都被分成 2:1');
    var W = 460, H = 310;
    var svg = el('svg', { viewBox: '0 0 ' + W + ' ' + H, 'class': 'ifig-svg' }, null);
    var V = [[230, 60], [70, 260], [400, 260]];
    var tri = el('polygon', { fill: 'rgba(58,110,165,.1)', stroke: INK, 'stroke-width': 2.5, 'stroke-linejoin': 'round' }, svg);
    var meds = [0, 1, 2].map(function () { return el('line', { stroke: BLUE, 'stroke-width': 1.8, 'stroke-dasharray': '7 4' }, svg); });
    var mids = [0, 1, 2].map(function () { return el('circle', { r: 4, fill: '#fff', stroke: BLUE, 'stroke-width': 2 }, svg); });
    var dots = V.map(function () { return el('circle', { r: 9, fill: RED, stroke: '#fff', 'stroke-width': 2.5, 'class': 'ifig-drag' }, svg); });
    var labs = ['A', 'B', 'C'].map(function (s) { return mkTxt(svg, 0, 0, s, INK, 14, 'middle', 1); });
    var gDot = el('circle', { r: 7, fill: ORANGE, stroke: '#fff', 'stroke-width': 2 }, svg);
    var gT = mkTxt(svg, 0, 0, 'G', ORANGE, 14, 'middle', 1);
    box.appendChild(svg);
    var read = div('ifig-readout', box);
    var hold = -1;
    function render() {
      tri.setAttribute('points', ptsStr(V));
      var G = [(V[0][0] + V[1][0] + V[2][0]) / 3, (V[0][1] + V[1][1] + V[2][1]) / 3];
      for (var i = 0; i < 3; i++) {
        var M = [(V[(i + 1) % 3][0] + V[(i + 2) % 3][0]) / 2, (V[(i + 1) % 3][1] + V[(i + 2) % 3][1]) / 2];
        meds[i].setAttribute('x1', V[i][0]); meds[i].setAttribute('y1', V[i][1]);
        meds[i].setAttribute('x2', M[0]); meds[i].setAttribute('y2', M[1]);
        mids[i].setAttribute('cx', M[0]); mids[i].setAttribute('cy', M[1]);
        dots[i].setAttribute('cx', V[i][0]); dots[i].setAttribute('cy', V[i][1]);
        labs[i].setAttribute('x', V[i][0] + (V[i][0] > 235 ? 16 : -16));
        labs[i].setAttribute('y', V[i][1] + (V[i][1] > 160 ? 18 : -12));
      }
      gDot.setAttribute('cx', G[0]); gDot.setAttribute('cy', G[1]);
      gT.setAttribute('x', G[0] + 16); gT.setAttribute('y', G[1] - 8);
      var M0 = [(V[1][0] + V[2][0]) / 2, (V[1][1] + V[2][1]) / 2];
      var ag = Math.hypot(V[0][0] - G[0], V[0][1] - G[1]);
      var gm = Math.hypot(G[0] - M0[0], G[1] - M0[1]);
      read.innerHTML = '中線 AM 被 G 分成：AG = ' + Math.round(ag) + '、GM = ' + Math.round(gm) +
        '　→　AG : GM = <b class="q">' + (Math.round(10 * ag / gm) / 10) + ' : 1</b>（永遠 2:1）';
    }
    svg.addEventListener('pointerdown', function (e) {
      e.preventDefault();
      var q = evPt(svg, e, W), best = 1e9;
      hold = -1;
      V.forEach(function (p, i) {
        var d = Math.hypot(p[0] - q.x, p[1] - q.y);
        if (d < best && d < 46) { best = d; hold = i; }
      });
      if (hold >= 0) { try { svg.setPointerCapture(e.pointerId); } catch (er) {} }
    });
    svg.addEventListener('pointermove', function (e) {
      if (hold < 0) return;
      e.preventDefault();
      var q = evPt(svg, e, W);
      V[hold] = [Math.max(30, Math.min(430, q.x)), Math.max(36, Math.min(280, q.y))];
      render();
    });
    svg.addEventListener('pointerup', function () { hold = -1; });
    svg.addEventListener('pointercancel', function () { hold = -1; });
    render();
  };

  /* ========== u56c4 二次函數 y=a(x−h)²+k：三支拉桿看拋物線 ========== */
  IF['u56c4'] = function (box) {
    div('ifig-title', box, '🎮 動手玩：調 a、h、k，看拋物線開口、平移怎麼變——頂點就是 (h, k)');
    var n = 5, px = 26, pad = 18, W = (pad + n * px) * 2;
    var svg = el('svg', { viewBox: '0 0 ' + W + ' ' + W, 'class': 'ifig-svg' }, null);
    defsArrow(svg);
    var clip = el('clipPath', { id: 'ifclip56' }, el('defs', null, svg));
    el('rect', { x: pad, y: pad, width: W - 2 * pad, height: W - 2 * pad }, clip);
    var P = plane(svg, { n: n, pad: pad, px: px });
    var g = el('g', { 'clip-path': 'url(#ifclip56)' }, svg);
    var axis = el('line', { stroke: ORANGE, 'stroke-width': 1.5, 'stroke-dasharray': '5 4' }, g);
    var curve = el('polyline', { fill: 'none', stroke: BLUE, 'stroke-width': 3, 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }, g);
    var vx = el('circle', { r: 6, fill: RED, stroke: '#fff', 'stroke-width': 2 }, svg);
    var vT = mkTxt(svg, 0, 0, '', RED, 12, 'start', 1);
    box.appendChild(svg);
    var read = div('ifig-readout', box);
    var a = 1, h = 1, k = -2;
    function fmt() {
      var as = a === 1 ? '' : a === -1 ? '−' : fmtN(a);
      var hs = h === 0 ? 'x²' : '(x ' + (h > 0 ? '− ' + h : '+ ' + (-h)) + ')²';
      var ks = k === 0 ? '' : (k > 0 ? ' + ' + k : ' − ' + (-k));
      return 'y = ' + as + hs + ks;
    }
    function render() {
      if (a === 0) {
        curve.setAttribute('points', '');
        vx.setAttribute('opacity', 0); vT.setAttribute('opacity', 0); axis.setAttribute('opacity', 0);
        read.innerHTML = 'a = 0 就不是二次函數了（變成水平線）——把 a 調到不是 0 試試';
        return;
      }
      var pts = [];
      for (var x = -n - 0.5; x <= n + 0.5; x += 0.1) {
        pts.push(P.X(x) + ',' + P.Y(a * (x - h) * (x - h) + k));
      }
      curve.setAttribute('points', pts.join(' '));
      axis.setAttribute('x1', P.X(h)); axis.setAttribute('y1', P.Y(-n));
      axis.setAttribute('x2', P.X(h)); axis.setAttribute('y2', P.Y(n));
      vx.setAttribute('cx', P.X(h)); vx.setAttribute('cy', P.Y(k));
      vT.setAttribute('x', P.X(h) + 10); vT.setAttribute('y', P.Y(k) + 16);
      vT.textContent = '頂點 (' + fmtN(h) + ', ' + fmtN(k) + ')';
      [vx, vT, axis].forEach(function (o2) { o2.setAttribute('opacity', 1); });
      read.innerHTML = '<b class="eq">' + fmt() + '</b>　開口向' + (a > 0 ? '上' : '下') + '（a ' + (a > 0 ? '>' : '<') + ' 0）、|a| 越大開口越窄；對稱軸 x = ' + fmtN(h) + '；' + (a > 0 ? '最小值' : '最大值') + ' = ' + fmtN(k);
    }
    var ctrls = div('ifig-sliders', box);
    slider(ctrls, 'a（開口）', -2, 2, 0.5, 1, function (v) { a = v; render(); });
    slider(ctrls, 'h（左右移）', -3, 3, 1, 1, function (v) { h = v; render(); });
    slider(ctrls, 'k（上下移）', -3, 3, 1, -2, function (v) { k = v; render(); });
    render();
  };

  /* ---------- 共用註冊：同一個互動掛在多個相關觀念 ---------- */
  IF['u23c2'] = IF['u16c1'];   // 線型函數 y=ax+b＝同一個直線實驗室
  IF['u57c1'] = IF['u56c4'];   // 二次函數極值＝同一個拋物線實驗室

  window.MATH_IFIGS = IF;
})();
