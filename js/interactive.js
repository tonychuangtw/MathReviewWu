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

  window.MATH_IFIGS = IF;
})();
