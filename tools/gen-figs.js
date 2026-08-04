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

Object.keys(figs).forEach(function (name) {
  fs.writeFileSync(path.join(OUT, name + '.svg'), figs[name]());
  console.log('✓', name + '.svg');
});
console.log('共', Object.keys(figs).length, '張');
