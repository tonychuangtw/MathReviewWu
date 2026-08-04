#!/usr/bin/env node
/* 產生 img/figs/*.svg — 數線類圖形以座標計算繪製，保證位置精準。
 * 用法：node tools/gen-figs.js  （全部重生，覆蓋舊檔）
 * 顏色對應 css 紙卡：墨 #22242a、藍 #3a6ea5、橘 #e07a2f、紅 #c0392b、綠 #2e7d32
 */
'use strict';
var fs = require('fs');
var path = require('path');
var OUT = path.join(__dirname, '..', 'img', 'figs');
fs.mkdirSync(OUT, { recursive: true });

var INK = '#22242a', BLUE = '#3a6ea5', ORANGE = '#e07a2f', RED = '#c0392b', GREEN = '#2e7d32', SOFT = '#8a8ea0';
var FONT = 'font-family="Noto Sans TC,PingFang TC,Microsoft JhengHei,sans-serif"';

function svg(w, h, body) {
  return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ' + w + ' ' + h + '" ' + FONT + ' font-size="15">\n' +
    '<defs><marker id="arr" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">' +
    '<path d="M0,0 L10,5 L0,10 z" fill="' + INK + '"/></marker>' +
    '<marker id="arrB" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">' +
    '<path d="M0,0 L10,5 L0,10 z" fill="' + BLUE + '"/></marker>' +
    '<marker id="arrR" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">' +
    '<path d="M0,0 L10,5 L0,10 z" fill="' + RED + '"/></marker></defs>\n' + body + '</svg>\n';
}
function txt(x, y, s, opt) {
  opt = opt || {};
  return '<text x="' + x + '" y="' + y + '" fill="' + (opt.fill || INK) + '"' +
    (opt.anchor ? ' text-anchor="' + opt.anchor + '"' : ' text-anchor="middle"') +
    (opt.size ? ' font-size="' + opt.size + '"' : '') +
    (opt.bold ? ' font-weight="700"' : '') + '>' + s + '</text>';
}
function line(x1, y1, x2, y2, stroke, w, extra) {
  return '<line x1="' + x1 + '" y1="' + y1 + '" x2="' + x2 + '" y2="' + y2 + '" stroke="' + (stroke || INK) +
    '" stroke-width="' + (w || 2) + '"' + (extra || '') + '/>';
}

/* 標準數線：from..to 整數刻度，y 為軸高，px 每單位 */
function numberLine(opt) {
  var from = opt.from, to = opt.to, y = opt.y, x0 = opt.x0, px = opt.px;
  var X = function (v) { return x0 + (v - from) * px; };
  var b = line(X(from) - 18, y, X(to) + 26, y, INK, 2.5, ' marker-end="url(#arr)"');
  for (var v = from; v <= to; v++) {
    b += line(X(v), y - 6, X(v), y + 6, INK, 2);
    if (!opt.noNums) b += txt(X(v), y + 26, (opt.labels && opt.labels[v] !== undefined) ? opt.labels[v] : v, { size: 14 });
  }
  return { body: b, X: X };
}

var figs = {};

/* 1-1 正數與負數：數線分區 */
figs['u01-posneg'] = function () {
  var nl = numberLine({ from: -4, to: 4, y: 62, x0: 60, px: 58 });
  var b = nl.body;
  b += '<rect x="' + (nl.X(-4) - 10) + '" y="30" width="' + (4 * 58 - 10) + '" height="20" rx="10" fill="rgba(58,110,165,.12)"/>';
  b += '<rect x="' + (nl.X(0) + 20) + '" y="30" width="' + (4 * 58 - 10) + '" height="20" rx="10" fill="rgba(224,122,47,.14)"/>';
  b += txt(nl.X(-2), 45, '負數（比 0 小）', { fill: BLUE, size: 14, bold: 1 });
  b += txt(nl.X(2), 45, '正數（比 0 大）', { fill: ORANGE, size: 14, bold: 1 });
  b += txt(nl.X(0), 108, '0 是中立數（不正也不負）', { fill: RED, size: 14 });
  b += line(nl.X(0), 74, nl.X(0), 92, RED, 1.5, ' stroke-dasharray="3 3"');
  return svg(560, 118, b);
};

/* 1-1 整數的結構 */
figs['u01-integers'] = function () {
  var b = '';
  b += txt(280, 30, '整數 ℤ', { bold: 1, size: 18 });
  b += line(280, 40, 120, 70, SOFT, 1.5) + line(280, 40, 280, 70, SOFT, 1.5) + line(280, 40, 440, 70, SOFT, 1.5);
  b += '<rect x="40" y="74" width="160" height="34" rx="17" fill="rgba(58,110,165,.12)"/>';
  b += '<rect x="238" y="74" width="84" height="34" rx="17" fill="rgba(192,57,43,.10)"/>';
  b += '<rect x="360" y="74" width="160" height="34" rx="17" fill="rgba(224,122,47,.14)"/>';
  b += txt(120, 97, '負整數 −1,−2,−3⋯', { fill: BLUE, size: 14 });
  b += txt(280, 97, '0', { fill: RED, size: 15, bold: 1 });
  b += txt(440, 97, '正整數 ℕ 1,2,3⋯', { fill: ORANGE, size: 14 });
  return svg(560, 122, b);
};

/* 1-1 數線三元素 */
figs['u01-numberline'] = function () {
  var nl = numberLine({ from: -3, to: 3, y: 66, x0: 80, px: 66 });
  var b = nl.body;
  b += txt(nl.X(0), 34, '原點', { fill: RED, size: 14, bold: 1 });
  b += line(nl.X(0), 40, nl.X(0), 56, RED, 1.5, ' marker-end="url(#arrR)"');
  b += txt(nl.X(3) + 40, 60, '正向', { fill: BLUE, size: 14, bold: 1, anchor: 'start' });
  b += '<path d="M ' + nl.X(1) + ' 96 Q ' + ((nl.X(1) + nl.X(2)) / 2) + ' 112 ' + nl.X(2) + ' 96" fill="none" stroke="' + GREEN + '" stroke-width="2"/>';
  b += txt((nl.X(1) + nl.X(2)) / 2, 130, '單位長', { fill: GREEN, size: 14, bold: 1 });
  return svg(600, 140, b);
};

/* 1-1 數的大小 */
figs['u01-compare'] = function () {
  var nl = numberLine({ from: -4, to: 4, y: 56, x0: 60, px: 58 });
  var b = nl.body;
  b += line(nl.X(-1.2), 96, nl.X(-3.6), 96, BLUE, 2, ' marker-end="url(#arrB)"');
  b += line(nl.X(1.2), 96, nl.X(3.6), 96, RED, 2, ' marker-end="url(#arrR)"');
  b += txt(nl.X(-2.4), 118, '愈左愈小', { fill: BLUE, size: 14 });
  b += txt(nl.X(2.4), 118, '愈右愈大', { fill: RED, size: 14 });
  return svg(560, 130, b);
};

/* 1-1 相反數 */
figs['u01-opposite'] = function () {
  var nl = numberLine({ from: -5, to: 5, y: 70, x0: 46, px: 47 });
  var b = nl.body;
  ['-4', '4'].forEach(function (v) {
    b += '<circle cx="' + nl.X(+v) + '" cy="70" r="6" fill="' + (v < 0 ? BLUE : ORANGE) + '"/>';
  });
  b += '<path d="M ' + nl.X(-4) + ' 52 Q ' + nl.X(0) + ' 10 ' + nl.X(4) + ' 52" fill="none" stroke="' + SOFT + '" stroke-width="1.8" stroke-dasharray="5 4"/>';
  b += txt(nl.X(0), 24, '與原點距離相等 → 互為相反數', { fill: INK, size: 14, bold: 1 });
  b += txt(nl.X(-4), 110, '−4', { fill: BLUE, size: 15, bold: 1 });
  b += txt(nl.X(4), 110, '+4', { fill: ORANGE, size: 15, bold: 1 });
  return svg(520, 122, b);
};

/* 1-1 絕對值 */
figs['u01-abs'] = function () {
  var nl = numberLine({ from: -6, to: 6, y: 66, x0 : 40, px: 40 });
  var b = nl.body;
  b += '<circle cx="' + nl.X(-5) + '" cy="66" r="6" fill="' + BLUE + '"/>';
  b += '<circle cx="' + nl.X(0) + '" cy="66" r="5" fill="' + RED + '"/>';
  b += line(nl.X(-5), 40, nl.X(0), 40, BLUE, 2.5, ' marker-start="url(#arrB)" marker-end="url(#arrB)"');
  b += txt((nl.X(-5) + nl.X(0)) / 2, 28, '|−5| = 5（與原點的距離）', { fill: BLUE, size: 14, bold: 1 });
  b += txt(nl.X(-5), 106, 'A(−5)', { fill: BLUE, size: 14 });
  b += txt(nl.X(0), 106, '原點', { fill: RED, size: 13 });
  return svg(560, 118, b);
};

/* 1-2 異號數相加：(-3)+(+1) 數線示意 */
figs['u02-add'] = function () {
  var nl = numberLine({ from: -5, to: 2, y: 70, x0: 60, px: 62 });
  var b = nl.body;
  b += line(nl.X(0), 34, nl.X(-3), 34, BLUE, 2.5, ' marker-end="url(#arrB)"');
  b += txt((nl.X(0) + nl.X(-3)) / 2, 24, '先走 −3', { fill: BLUE, size: 14, bold: 1 });
  b += line(nl.X(-3), 50, nl.X(-2), 50, RED, 2.5, ' marker-end="url(#arrR)"');
  b += txt(nl.X(-2.5), 62 - 18, '再走 +1', { fill: RED, size: 13, bold: 1 });
  b += '<circle cx="' + nl.X(-2) + '" cy="70" r="6" fill="' + ORANGE + '"/>';
  b += txt(nl.X(-2), 112, '(−3)+(+1)=−2', { fill: ORANGE, size: 15, bold: 1 });
  return svg(560, 126, b);
};

/* 1-2 兩點距離：A(−7) B(5) */
figs['u02-dist'] = function () {
  var nl = numberLine({ from: -8, to: 6, y: 66, x0: 36, px: 36, labels: { '-8':'', '-6':'-6', '-5':'', '-3':'', '-1':'', 1:'', 3:'', 5:'5' } });
  var nl2 = numberLine({ from: -8, to: 6, y: 66, x0: 36, px: 36 });
  var b = nl2.body;
  b += '<circle cx="' + nl2.X(-7) + '" cy="66" r="6" fill="' + BLUE + '"/>';
  b += '<circle cx="' + nl2.X(5) + '" cy="66" r="6" fill="' + ORANGE + '"/>';
  b += txt(nl2.X(-7), 40, 'A(−7)', { fill: BLUE, size: 14, bold: 1 });
  b += txt(nl2.X(5), 40, 'B(5)', { fill: ORANGE, size: 14, bold: 1 });
  b += line(nl2.X(-7), 100, nl2.X(5), 100, GREEN, 2.5, ' marker-start="url(#arr)" marker-end="url(#arr)"');
  b += txt(nl2.X(-1), 122, '距離 = 5−(−7) = 12（大減小）', { fill: GREEN, size: 14, bold: 1 });
  return svg(560, 134, b);
};

/* 3-2 等量公理：天平 3x = 10 */
figs['u11-balance'] = function () {
  var b = '';
  function pan(cx, label, fill) {
    return '<path d="M ' + (cx - 55) + ' 60 Q ' + cx + ' 96 ' + (cx + 55) + ' 60" fill="none" stroke="' + INK + '" stroke-width="2.5"/>' +
      line(cx - 55, 60, cx, 30, SOFT, 1.5) + line(cx + 55, 60, cx, 30, SOFT, 1.5) +
      '<rect x="' + (cx - 40) + '" y="62" width="80" height="30" rx="8" fill="' + fill + '"/>' +
      txt(cx, 83, label, { fill: '#fff', size: 16, bold: 1 });
  }
  b += line(130, 30, 430, 30, INK, 4);                                  // 橫梁
  b += '<path d="M 280 30 L 260 108 L 300 108 z" fill="' + SOFT + '"/>'; // 支點
  b += '<rect x="230" y="108" width="100" height="10" rx="4" fill="' + INK + '"/>';
  b += pan(130, '3x', BLUE) + pan(430, '10', ORANGE);
  b += txt(280, 140, '平衡 → 3x = 10；兩邊同加、同減、同乘、同除，仍平衡', { size: 14 });
  return svg(560, 152, b);
};

/* 座標平面基礎工具：軸 + 格線 */
function axes(opt) {
  var cx = opt.cx, cy = opt.cy, px = opt.px, range = opt.range;
  var b = '';
  for (var i = -range; i <= range; i++) {
    if (i === 0) continue;
    b += line(cx + i * px, cy - range * px, cx + i * px, cy + range * px, '#eceadf', 1);
    b += line(cx - range * px, cy + i * px, cx + range * px, cy + i * px, '#eceadf', 1);
  }
  b += line(cx - range * px - 12, cy, cx + range * px + 18, cy, INK, 2, ' marker-end="url(#arr)"');
  b += line(cx, cy + range * px + 12, cx, cy - range * px - 18, INK, 2, ' marker-end="url(#arr)"');
  b += txt(cx + range * px + 24, cy + 5, 'x', { size: 15, bold: 1, anchor: 'start' });
  b += txt(cx, cy - range * px - 24, 'y', { size: 15, bold: 1 });
  b += txt(cx - 10, cy + 16, 'O', { size: 13, fill: SOFT });
  return b;
}

/* 2-1 直角坐標平面：A(4,3) */
figs['u15-plane'] = function () {
  var cx = 260, cy = 150, px = 26, R = 5;
  var b = axes({ cx: cx, cy: cy, px: px, range: R });
  var ax = cx + 4 * px, ay = cy - 3 * px;
  b += line(ax, cy, ax, ay, BLUE, 1.5, ' stroke-dasharray="4 3"');
  b += line(cx, ay, ax, ay, BLUE, 1.5, ' stroke-dasharray="4 3"');
  b += '<circle cx="' + ax + '" cy="' + ay + '" r="5" fill="' + RED + '"/>';
  b += txt(ax + 12, ay - 8, 'A(4,3)', { fill: RED, size: 15, bold: 1, anchor: 'start' });
  b += txt(ax, cy + 16, '4', { fill: BLUE, size: 13 });
  b += txt(cx - 10, ay + 5, '3', { fill: BLUE, size: 13 });
  b += txt(cx + R * px - 20, cy + 30, 'x 軸（水平）', { fill: SOFT, size: 12 });
  b += txt(cx + 46, cy - R * px + 8, 'y 軸（鉛垂）', { fill: SOFT, size: 12 });
  return svg(520, 300, b);
};

/* 2-1 象限 */
figs['u15-quadrants'] = function () {
  var cx = 260, cy = 148, px = 26, R = 5;
  var b = '';
  var q = [
    { x: 1, y: -1, t: '第一象限', s: '(+,+)', f: 'rgba(224,122,47,.10)' },
    { x: -1, y: -1, t: '第二象限', s: '(−,+)', f: 'rgba(58,110,165,.10)' },
    { x: -1, y: 1, t: '第三象限', s: '(−,−)', f: 'rgba(46,125,50,.10)' },
    { x: 1, y: 1, t: '第四象限', s: '(+,−)', f: 'rgba(192,57,43,.10)' }
  ];
  q.forEach(function (o) {
    b += '<rect x="' + (o.x > 0 ? cx : cx - R * px) + '" y="' + (o.y > 0 ? cy : cy - R * px) + '" width="' + (R * px) + '" height="' + (R * px) + '" fill="' + o.f + '"/>';
    b += txt(cx + o.x * R * px / 2, cy + o.y * R * px / 2 - 6, o.t, { size: 15, bold: 1 });
    b += txt(cx + o.x * R * px / 2, cy + o.y * R * px / 2 + 14, o.s, { size: 14, fill: SOFT });
  });
  b += axes({ cx: cx, cy: cy, px: px, range: R });
  b += txt(cx + R * px + 6, cy - 14, '(m,0) 在 x 軸', { fill: SOFT, size: 12, anchor: 'end' });
  b += txt(cx + 8, cy - R * px + 4, '(0,n) 在 y 軸', { fill: SOFT, size: 12, anchor: 'start' });
  return svg(520, 296, b);
};

/* 2-2 y=3x+2 直線圖 */
figs['u16-line'] = function () {
  var cx = 240, cy = 160, px = 28, R = 5;
  var b = axes({ cx: cx, cy: cy, px: px, range: R });
  function P(x, y) { return [cx + x * px, cy - y * px]; }
  var p1 = P(-2, -4), p2 = P(1.2, 5.6);
  b += line(p1[0], p1[1], p2[0], p2[1], BLUE, 2.5);
  [[0, 2], [1, 5]].forEach(function (pt) {
    var p = P(pt[0], pt[1]);
    b += '<circle cx="' + p[0] + '" cy="' + p[1] + '" r="5" fill="' + RED + '"/>';
    b += txt(p[0] + 12, p[1] + 2, '(' + pt[0] + ',' + pt[1] + ')', { fill: RED, size: 13, anchor: 'start' });
  });
  b += txt(cx + 3.4 * px, cy - 3.4 * px, 'y = 3x + 2', { fill: BLUE, size: 15, bold: 1, anchor: 'start' });
  b += txt(cx, cy + R * px + 24, '找 2 組解 → 描點 → 連成直線', { size: 13, fill: SOFT });
  return svg(520, 330, b);
};

/* 2-2 聯立方程式三種圖形關係 */
figs['u16-three'] = function () {
  var b = '', W = 186;
  function mini(ox, title, sub, draw) {
    var r = '<rect x="' + ox + '" y="18" width="170" height="150" rx="10" fill="#faf8f0" stroke="#e3dfd0"/>';
    var cx = ox + 85, cy = 96;
    r += line(cx - 70, cy, cx + 70, cy, SOFT, 1.5) + line(cx, cy + 62, cx, cy - 62, SOFT, 1.5);
    r += draw(cx, cy);
    r += txt(cx, 190, title, { size: 14, bold: 1 });
    r += txt(cx, 208, sub, { size: 12, fill: SOFT });
    return r;
  }
  b += mini(10, '交於一點', '恰一組解', function (cx, cy) {
    return line(cx - 60, cy + 44, cx + 60, cy - 44, BLUE, 2.2) +
      line(cx - 60, cy - 30, cx + 60, cy + 30, ORANGE, 2.2) +
      '<circle cx="' + (cx - 5) + '" cy="' + (cy + 3) + '" r="4.5" fill="' + RED + '"/>';
  });
  b += mini(10 + W, '平行', '無解', function (cx, cy) {
    return line(cx - 60, cy + 40, cx + 60, cy - 40, BLUE, 2.2) +
      line(cx - 60, cy + 62, cx + 60, cy - 18, ORANGE, 2.2);
  });
  b += mini(10 + 2 * W, '重合', '無限多組解', function (cx, cy) {
    return line(cx - 60, cy + 40, cx + 60, cy - 40, BLUE, 4.5) +
      line(cx - 60, cy + 40, cx + 60, cy - 40, ORANGE, 1.8, ' stroke-dasharray="7 6"');
  });
  return svg(570, 222, b);
};

/* 5-1 不等式解的圖示 */
figs['u24-ineq'] = function () {
  var b = '';
  function ray(ox, oy, label, closed, dir) {
    var ax = ox + 60;
    b += line(ox, oy, ox + 120, oy, INK, 2) ;
    b += line(ax, oy - 5, ax, oy + 5, INK, 1.5);
    b += txt(ax, oy + 20, 'a', { size: 13 });
    b += line(ax, oy - 14, dir > 0 ? ox + 118 : ox + 2, oy - 14, BLUE, 2.5, ' marker-end="url(#arrB)"');
    b += '<circle cx="' + ax + '" cy="' + (oy - 14) + '" r="5" fill="' + (closed ? BLUE : '#fdfcf7') + '" stroke="' + BLUE + '" stroke-width="2"/>';
    b += txt(ax, oy - 30, label, { size: 14, bold: 1, fill: BLUE });
  }
  ray(20, 56, 'x < a', false, -1);
  ray(160, 56, 'x ≤ a', true, -1);
  ray(300, 56, 'x > a', false, 1);
  ray(440, 56, 'x ≥ a', true, 1);
  // 區間
  function seg(ox, oy, label, closed) {
    var a1 = ox + 30, a2 = ox + 110;
    b += line(ox, oy, ox + 140, oy, INK, 2);
    [a1, a2].forEach(function (x, i) {
      b += line(x, oy - 5, x, oy + 5, INK, 1.5);
      b += txt(x, oy + 20, i ? 'b' : 'a', { size: 13 });
      b += '<circle cx="' + x + '" cy="' + (oy - 14) + '" r="5" fill="' + (closed ? BLUE : '#fdfcf7') + '" stroke="' + BLUE + '" stroke-width="2"/>';
    });
    b += line(a1 + 5, oy - 14, a2 - 5, oy - 14, BLUE, 2.5);
    b += txt((a1 + a2) / 2, oy - 30, label, { size: 14, bold: 1, fill: BLUE });
  }
  seg(90, 132, 'a < x < b', false);
  seg(330, 132, 'a ≤ x ≤ b', true);
  b += txt(285, 168, '空心＝不含端點（＞、＜）；實心＝含端點（≧、≦）', { size: 13, fill: SOFT });
  return svg(580, 180, b);
};

/* 3-1-1 (a+b)² 面積圖 */
figs['u26-square'] = function () {
  var ox = 150, oy = 30, A = 150, B = 70;
  var b = '';
  b += '<rect x="' + ox + '" y="' + oy + '" width="' + A + '" height="' + A + '" fill="rgba(58,110,165,.16)" stroke="' + BLUE + '" stroke-width="2"/>';
  b += '<rect x="' + (ox + A) + '" y="' + oy + '" width="' + B + '" height="' + A + '" fill="rgba(224,122,47,.16)" stroke="' + ORANGE + '" stroke-width="2"/>';
  b += '<rect x="' + ox + '" y="' + (oy + A) + '" width="' + A + '" height="' + B + '" fill="rgba(224,122,47,.16)" stroke="' + ORANGE + '" stroke-width="2"/>';
  b += '<rect x="' + (ox + A) + '" y="' + (oy + A) + '" width="' + B + '" height="' + B + '" fill="rgba(46,125,50,.16)" stroke="' + GREEN + '" stroke-width="2"/>';
  b += txt(ox + A / 2, oy + A / 2 + 6, 'a²', { size: 22, bold: 1, fill: BLUE });
  b += txt(ox + A + B / 2, oy + A / 2 + 5, 'ab', { size: 17, bold: 1, fill: ORANGE });
  b += txt(ox + A / 2, oy + A + B / 2 + 5, 'ab', { size: 17, bold: 1, fill: ORANGE });
  b += txt(ox + A + B / 2, oy + A + B / 2 + 5, 'b²', { size: 16, bold: 1, fill: GREEN });
  b += txt(ox + A / 2, oy - 10, 'a', { size: 15 }) + txt(ox + A + B / 2, oy - 10, 'b', { size: 15 });
  b += txt(ox - 14, oy + A / 2 + 5, 'a', { size: 15 }) + txt(ox - 14, oy + A + B / 2 + 5, 'b', { size: 15 });
  b += txt(ox + (A + B) / 2, oy + A + B + 34, '(a+b)² = a² + 2ab + b²', { size: 17, bold: 1 });
  return svg(520, 300, b);
};

/* 3-1-1 平方差面積圖 */
figs['u26-diffsq'] = function () {
  var b = '';
  var ox = 40, oy = 40, A = 150, B = 60;
  b += '<rect x="' + ox + '" y="' + oy + '" width="' + A + '" height="' + A + '" fill="rgba(58,110,165,.14)" stroke="' + BLUE + '" stroke-width="2"/>';
  b += '<rect x="' + ox + '" y="' + oy + '" width="' + B + '" height="' + B + '" fill="#fdfcf7" stroke="' + RED + '" stroke-width="2" stroke-dasharray="5 4"/>';
  b += txt(ox + B / 2, oy + B / 2 + 5, 'b²', { size: 15, fill: RED });
  b += txt(ox + A / 2 + 25, oy + A / 2 + 25, 'a² − b²', { size: 18, bold: 1, fill: BLUE });
  b += txt(ox + A / 2, oy + A + 20, 'a', { size: 14 });
  b += txt(280, 130, '⟹', { size: 26, fill: SOFT });
  var ox2 = 320, oy2 = 70, W = 210, H = 90;
  b += '<rect x="' + ox2 + '" y="' + oy2 + '" width="' + W + '" height="' + H + '" fill="rgba(46,125,50,.14)" stroke="' + GREEN + '" stroke-width="2"/>';
  b += txt(ox2 + W / 2, oy2 + H / 2 + 6, '(a+b)(a−b)', { size: 17, bold: 1, fill: GREEN });
  b += txt(ox2 + W / 2, oy2 - 10, 'a+b', { size: 14 });
  b += txt(ox2 - 20, oy2 + H / 2 + 5, 'a−b', { size: 13 });
  b += txt(285, 230, '剪下拼接：a² − b² = (a+b)(a−b)', { size: 16, bold: 1 });
  return svg(570, 250, b);
};

/* 2-3 畢氏定理直角三角形 */
figs['u31-pyth'] = function () {
  var bx = 120, by = 200, W = 240, H = 150;   // 直角在左下
  var b = '';
  b += '<path d="M ' + bx + ' ' + by + ' L ' + (bx + W) + ' ' + by + ' L ' + bx + ' ' + (by - H) + ' z" fill="rgba(58,110,165,.12)" stroke="' + BLUE + '" stroke-width="2.5"/>';
  b += '<path d="M ' + bx + ' ' + (by - 18) + ' L ' + (bx + 18) + ' ' + (by - 18) + ' L ' + (bx + 18) + ' ' + by + '" fill="none" stroke="' + RED + '" stroke-width="2"/>';
  b += txt(bx + W / 2, by + 24, 'a（股）', { size: 15, fill: BLUE, bold: 1 });
  b += txt(bx - 34, by - H / 2, 'b（股）', { size: 15, fill: BLUE, bold: 1 });
  b += txt(bx + W / 2 + 30, by - H / 2 - 14, 'c（斜邊）', { size: 15, fill: ORANGE, bold: 1 });
  b += txt(bx + W / 2 + 60, by - H - 10, 'a² + b² = c²', { size: 18, bold: 1 });
  return svg(520, 250, b);
};

Object.keys(figs).forEach(function (name) {
  fs.writeFileSync(path.join(OUT, name + '.svg'), figs[name]());
  console.log('✓', name + '.svg');
});
console.log('共', Object.keys(figs).length, '張');
