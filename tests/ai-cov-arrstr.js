'use strict'
const $ = require('../index')
const assert = require('assert')
const assertLog = function () {
  global.assertCount++
  return assert.strictEqual(...arguments)
}

describe('AI-覆盖率补充测试 array/string/tpl', function () {
  describe('lib/array.js', function () {
    it('countBy 传入属性名(非函数) - 覆盖89行 val=>val[fn]', function () {
      const r = [{ a: 1 }, { a: 2 }, { a: 1 }].countBy('a')
      assertLog(r['1'], 2)
      assertLog(r['2'], 1)
    })

    it('groupBy 默认参数 + Null分组键 - 覆盖119默认参数,127的??与cond-expr', function () {
      assertLog(JSON.stringify([{ x: null }].groupBy(['x'])), '[{"x":"<Null>"}]')
      assertLog(JSON.stringify([{ x: 'a' }].groupBy(['x'])), '[{"x":"a"}]')
    })

    it('groupBy colFunc为函数 - 覆盖127 cond-expr真分支', function () {
      const r = [{ x: 5, v: 1 }].groupBy(['x'], ['v'], ['count'], ['c'], [item => item.x * 2])
      assertLog(JSON.stringify(r), '[{"x":"10","c":1}]')
    })

    it('groupBy 已有分组 count默认 - 覆盖134/161 binary-expr假分支', function () {
      const r = [{ g: 'a', v: 1 }, { g: 'a', v: 2 }].groupBy(['g'], ['v'])
      assertLog(JSON.stringify(r), '[{"g":"a","count(v)":2}]')
    })

    it('groupBy sum - 覆盖134/161 binary-expr真分支', function () {
      const r = [{ g: 'a', v: 1 }, { g: 'a', v: 3 }, { g: 'b', v: 2 }].groupBy(['g'], ['v'], ['sum'])
      assertLog(JSON.stringify(r), '[{"g":"a","sum(v)":4},{"g":"b","sum(v)":2}]')
    })

    it('groupBy min 更新与不更新 - 覆盖150 cond-expr两分支', function () {
      const r = [{ g: 'a', v: 5 }, { g: 'a', v: 3 }, { g: 'a', v: 7 }].groupBy(['g'], ['v'], ['min'])
      assertLog(JSON.stringify(r), '[{"g":"a","min(v)":3}]')
    })

    it('groupBy 未知聚合操作 - 覆盖152/179 switch default分支', function () {
      const r = [{ g: 'a', v: 1 }, { g: 'a', v: 2 }].groupBy(['g'], ['v'], ['noop'])
      assertLog(JSON.stringify(r), '[{"g":"a"}]')
    })

    it('groupBy groupCol含假值 - 覆盖189 if假分支', function () {
      const r = [{ x: 'a' }].groupBy(['x', 0])
      assertLog(JSON.stringify(r), '[{"x":"a"}]')
    })

    it('subset 默认参数 - 覆盖288 default-arg', function () {
      assertLog([1].subset(), false)
    })

    it('zip this非数组 - 覆盖363 cond-expr假分支', function () {
      const arrayMod = require('../lib/array.js')
      const r = arrayMod.zip.call(null, [1, 2], [3, 4])
      assertLog(JSON.stringify(r), '[[1,3],[2,4]]')
    })
  })

  describe('lib/string.js', function () {
    it('times 无原生repeat的fallback - 覆盖198 cond-expr假分支', function () {
      const orig = String.prototype.repeat
      delete String.prototype.repeat
      const r = 'ab'.times(3)
      Reflect.defineProperty(String.prototype, 'repeat', { value: orig, writable: true, configurable: true })
      assertLog(r, 'ababab')
    })

    it('format 参数缺失保留占位符 - 覆盖217 binary-expr', function () {
      assertLog('a{0}{9}'.format('x'), 'ax{9}')
    })

    it('replaceAll 无原生replaceAll的fallback - 覆盖261 cond-expr假分支', function () {
      const stringMod = require('../lib/string.js')
      const orig = String.prototype.replaceAll
      delete String.prototype.replaceAll
      const r = stringMod.replaceAll.call('aabbcc', 'b', 'x')
      Reflect.defineProperty(String.prototype, 'replaceAll', { value: orig, writable: true, configurable: true })
      assertLog(r, 'aaxxcc')
    })
  })

  describe('lib/tpl.js', function () {
    it('tpl 空插值{{}} - 覆盖61 cond-expr真分支', function () {
      assertLog($.tpl('x{{}}y').render({}), 'xy')
    })

    it('tpl 二次渲染走缓存 - 覆盖76 cond-expr真分支', function () {
      const t = $.tpl('a{{d.x}}b')
      assertLog(t.render({ x: 1 }), 'a1b')
      assertLog(t.render({ x: 2 }), 'a2b')
    })

    it('tpl render回调方式 - 覆盖81 cond-expr真分支', function () {
      const t = $.tpl('a{{d.x}}b')
      let out = null
      const r = t.render({ x: 1 }, function (s) {
        out = s
      })
      assertLog(r, undefined)
      assertLog(out, 'a1b')
    })

    it('tpl AMD define分支 - 覆盖95 cond-expr真分支与96行语句', function () {
      const tplPath = require.resolve('../lib/tpl.js')
      let captured = null
      global.define = function (fn) {
        captured = fn()
      }
      delete require.cache[tplPath]
      require('../lib/tpl.js')
      delete global.define
      delete require.cache[tplPath]
      require('../lib/tpl.js') // 恢复正常模块缓存
      assertLog(typeof captured, 'function')
      assertLog(captured.v, '1.1')
    })

    it('tpl 浏览器window分支 - 覆盖98/100 cond-expr window.laytpl分支', function () {
      const Module = require('module')
      const tplPath = require.resolve('../lib/tpl.js')
      const fakeWindow = {}
      globalThis.__fakeWinTpl__ = fakeWindow
      const origCompile = Module.prototype._compile
      // 在模块包装函数内遮蔽 exports/module 并注入 window,保留nyc插桩
      Module.prototype._compile = function (content, filename) {
        if (filename === tplPath) {
          content = 'var exports = undefined, module = undefined, window = globalThis.__fakeWinTpl__\n' + content
        }
        return origCompile.call(this, content, filename)
      }
      delete require.cache[tplPath]
      require('../lib/tpl.js')
      Module.prototype._compile = origCompile
      delete require.cache[tplPath]
      require('../lib/tpl.js') // 恢复正常模块缓存
      delete globalThis.__fakeWinTpl__
      assertLog(typeof fakeWindow.laytpl, 'function')
      assertLog(fakeWindow.laytpl.v, '1.1')
      assertLog(fakeWindow.laytpl('a{{d.x}}b').render({ x: 1 }), 'a1b')
    })
  })
})
