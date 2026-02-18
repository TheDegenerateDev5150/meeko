'use strict'
const $ = require('../index')
const assert = require('assert')
const assertLog = function () {
  global.assertCount++
  return assert.strictEqual(...arguments)
}

$.ext(Array.prototype)
$.ext(String.prototype)

describe('AI-ArrayString测试', function () {
  describe('array 扩展', function () {
    it('countAdv 计数', function () {
      const result = [1, 2, 2, 3, 3, 3].countAdv()
      assertLog(result[0].v, 1)
    })

    it('unique 去重', function () {
      const result = [1, 2, 2, 3].unique()
      assertLog(result.length, 3)
    })

    it('shuffle 洗牌', function () {
      const arr = [1, 2, 3, 4, 5]
      arr.shuffle()
      assertLog(arr.length, 5)
    })

    it('max 最大值', function () {
      assertLog([1, 2, 3].max(), 3)
    })

    it('min 最小值', function () {
      assertLog([1, 2, 3].min(), 1)
    })

    it('sum 求和', function () {
      assertLog([1, 2, 3].sum(), 6)
    })

    it('copy 拷贝', function () {
      const arr = [1, 2, 3]
      const copy = arr.copy()
      assertLog(copy.length, 3)
    })

    it('copy 拷贝 - 模拟低版本node无structuredClone', function () {
      const orig = global.structuredClone
      global.structuredClone = undefined
      const arr = [1, 2, { a: 3 }]
      const copy = arr.copy()
      assertLog(copy.length, 3)
      assertLog(copy[2].a, 3)
      global.structuredClone = orig
    })

    it('mode 众数', function () {
      const result = [1, 2, 2, 3].mode()
      assertLog(Array.isArray(result), true)
    })
  })

  describe('string 扩展', function () {
    it('replaceAll 替换所有', function () {
      const result = 'aabbcc'.replaceAll('b', 'x')
      assertLog(result, 'aaxxcc')
    })

    it('replaceAll 模拟低版本node覆盖fallback分支', function () {
      const stringMod = require('../lib/string')
      const orig = String.prototype.replaceAll
      String.prototype.replaceAll = function (s1, s2) { return this.split(s1).join(s2) }
      const result = stringMod.replaceAll.call('aabbcc', 'b', 'x')
      assertLog(result, 'aaxxcc')
      String.prototype.replaceAll = orig
    })

    it('trim 去除首尾空格', function () {
      assertLog('  test  '.trim(), 'test')
    })

    it('repeat 重复', function () {
      assertLog('ab'.repeat(3), 'ababab')
    })

    it('startsWith 开始匹配', function () {
      assertLog('hello'.startsWith('hel'), true)
    })

    it('endsWith 结束匹配', function () {
      assertLog('hello'.endsWith('llo'), true)
    })

    it('$.string 对象方法调用-覆盖prototypeExt.js第8行', function () {
      assertLog($.string.upperFirst('hello'), 'Hello')
      assertLog($.string.fillStr('abc', 'x', 5, 1), 'abcxx')
    })
  })
})
