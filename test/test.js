#!/usr/bin/env node
/* 資料完整性測試：node test/test.js */
'use strict';
var fs = require('fs');
var path = require('path');
var vm = require('vm');

var ctx = {};
vm.createContext(ctx);
vm.runInContext(fs.readFileSync(path.join(__dirname, '..', 'js', 'data', 'units.js'), 'utf8'), ctx);
var UNITS = ctx.MATH_UNITS, TODO = ctx.MATH_UNITS_TODO || [];

var fails = 0;
function t(name, fn) {
  try { fn(); console.log('  ✓ ' + name); }
  catch (e) { fails++; console.log('  ✗ ' + name + ' — ' + e.message); }
}
function assert(cond, msg) { if (!cond) throw new Error(msg); }

console.log('資料完整性');

t('已轉錄單元 ≥1', function () { assert(UNITS.length >= 1, '目前 ' + UNITS.length); });

t('id 不重複（含 TODO）', function () {
  var seen = {};
  UNITS.concat(TODO).forEach(function (u) {
    assert(!seen[u.id], '重複 id: ' + u.id);
    seen[u.id] = 1;
  });
});

t('全 63 單元盤點（轉錄+TODO）', function () {
  assert(UNITS.length + TODO.length === 63, '共 ' + (UNITS.length + TODO.length) + ' ≠ 63');
});

t('book 1-6、sec 格式、title/page 齊全', function () {
  UNITS.concat(TODO).forEach(function (u) {
    assert(u.book >= 1 && u.book <= 6, u.id + ' book=' + u.book);
    assert(/^\d+-\d+$/.test(u.sec), u.id + ' sec=' + u.sec);
    assert(u.title && u.page > 0, u.id + ' 缺 title/page');
  });
});

t('觀念卡欄位完整', function () {
  UNITS.forEach(function (u) {
    assert(u.concepts && u.concepts.length, u.id + ' 沒有 concepts');
    u.concepts.forEach(function (c) {
      assert(c.id && c.id.indexOf(u.id) === 0, u.id + ' 觀念 id 錯: ' + c.id);
      assert(c.title, c.id + ' 缺 title');
      assert(c.body && c.body.length > 20, c.id + ' body 太短');
    });
  });
});

t('每個觀念至少 1 題例題，例題欄位完整', function () {
  UNITS.forEach(function (u) {
    u.concepts.forEach(function (c) {
      assert(c.examples && c.examples.length >= 1, c.id + ' 沒有例題');
      c.examples.forEach(function (ex, i) {
        assert(ex.q && ex.q.length > 5, c.id + ' 例' + (i + 1) + ' q 缺');
        assert(ex.steps && ex.steps.length >= 1, c.id + ' 例' + (i + 1) + ' steps 缺');
        assert(ex.ans, c.id + ' 例' + (i + 1) + ' ans 缺');
      });
    });
  });
});

t('KaTeX $ 定界符成對', function () {
  function check(id, s) {
    if (!s) return;
    var n = (s.replace(/\\\$/g, '').match(/\$/g) || []).length;
    assert(n % 2 === 0, id + ' 有奇數個 $（' + n + '）');
  }
  UNITS.forEach(function (u) {
    u.concepts.forEach(function (c) {
      check(c.id + ' body', c.body);
      (c.examples || []).forEach(function (ex, i) {
        check(c.id + ' 例' + (i + 1) + ' q', ex.q);
        ex.steps.forEach(function (st, j) { check(c.id + ' 例' + (i + 1) + ' step' + (j + 1), st); });
        check(c.id + ' 例' + (i + 1) + ' ans', ex.ans);
      });
    });
  });
});

t('引用的 fig 檔案存在', function () {
  UNITS.forEach(function (u) {
    u.concepts.forEach(function (c) {
      if (c.fig) {
        var p = path.join(__dirname, '..', 'img', 'figs', c.fig + '.svg');
        assert(fs.existsSync(p), c.id + ' 缺圖 ' + c.fig + '.svg');
      }
    });
  });
});

t('id 依目次序排列', function () {
  var last = '';
  UNITS.forEach(function (u) {
    assert(u.id > last, u.id + ' 順序錯（前一個 ' + last + '）');
    last = u.id;
  });
});

if (fails) { console.log('\n✗ ' + fails + ' 項失敗'); process.exit(1); }
console.log('\n全部通過');
