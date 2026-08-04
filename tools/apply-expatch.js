#!/usr/bin/env node
/* 套用例題難度補丁：node tools/apply-expatch.js <patch.js>
 * patch 格式（手工撰寫，內容不可機器生成）：
 *   module.exports = {
 *     u01c1: { tags: ['易','中'],            // 依序給既有例題標難度
 *              add: [{ d:'難', q:'…', steps:[…], ans:'…' }] },  // 補缺的難度
 *     ...
 *   }
 * 合併後每個被補丁的觀念會重排為 易→中→難，並驗證恰好各一題。
 * 整份 units.js 以 vm 載入後重新序列化（字串內容 bit-for-bit 保留）。
 */
'use strict';
var fs = require('fs');
var path = require('path');
var vm = require('vm');

var patchFile = process.argv[2];
if (!patchFile) { console.error('用法: node tools/apply-expatch.js <patch.js>'); process.exit(1); }
var patch = require(path.resolve(patchFile));

var unitsPath = path.join(__dirname, '..', 'js', 'data', 'units.js');
var ctx = {};
vm.createContext(ctx);
vm.runInContext(fs.readFileSync(unitsPath, 'utf8'), ctx);
var UNITS = ctx.MATH_UNITS;

var ORDER = { '易': 0, '中': 1, '難': 2 };
var applied = 0, skipped = [];

UNITS.forEach(function (u) {
  u.concepts.forEach(function (c) {
    var p = patch[c.id];
    if (!p) return;
    var ex = c.examples || [];
    (p.tags || []).forEach(function (d, i) {
      if (!ex[i]) throw new Error(c.id + ' tags[' + i + '] 沒有對應的既有例題');
      if (!ORDER.hasOwnProperty(d)) throw new Error(c.id + ' 非法難度 ' + d);
      ex[i].d = d;
    });
    (p.add || []).forEach(function (e) {
      if (!ORDER.hasOwnProperty(e.d)) throw new Error(c.id + ' add 非法難度 ' + e.d);
      if (!e.q || !e.steps || !e.steps.length || !e.ans) throw new Error(c.id + ' add 欄位不完整');
      ex.push(e);
    });
    ex.sort(function (a, b) { return ORDER[a.d] - ORDER[b.d]; });
    // 驗證：恰好 易中難 各一
    var ds = ex.map(function (e) { return e.d; }).join('');
    if (ds !== '易中難') throw new Error(c.id + ' 合併後難度為 [' + ds + ']，需恰好 易中難 各一');
    c.examples = ex;
    applied++;
  });
});

Object.keys(patch).forEach(function (id) {
  var found = UNITS.some(function (u) { return u.concepts.some(function (c) { return c.id === id; }); });
  if (!found) skipped.push(id);
});
if (skipped.length) throw new Error('patch 中找不到的觀念 id: ' + skipped.join(', '));

var header = '/* MathReviewWu 資料層 — 國中數學總複習重點整理（吳老師家教講義轉錄）\n' +
  ' * schema：MATH_UNITS = [{ id, book, sec, title, page, concepts:[{ id, title, body(HTML,$KaTeX$),\n' +
  ' *   fig?, examples:[{ d:易|中|難, q, steps[], ans }] }] }]\n' +
  ' * 轉錄原則：講義填空答案以 <b class="key"> 標記；例題原創，每觀念 基礎(易)/一般(中)/精熟(難) 各一題。\n' +
  ' * ⚠️ 本檔由 tools/apply-expatch.js 重新序列化過；內容修改直接編輯本檔即可。 */\n';

fs.writeFileSync(unitsPath,
  header + 'var MATH_UNITS = ' + JSON.stringify(UNITS, null, 1) + ';\n\nvar MATH_UNITS_TODO = [];\n');
console.log('✓ 套用', applied, '個觀念；重新序列化完成');
