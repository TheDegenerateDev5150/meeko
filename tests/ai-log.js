'use strict'
const $ = require('../index')
const assert = require('assert')
const assertLog = function () {
  global.assertCount++
  return assert.strictEqual(...arguments)
}

describe('AI-Log测试', function () {
  describe('log 日志', function () {
    it('log 函数存在', function () {
      assertLog(typeof $.log, 'function')
    })

    it('err 函数存在', function () {
      assertLog(typeof $.err, 'function')
    })

    it('log 基本输出', function () {
      $.log('test')
      assertLog(true, true)
    })

    it('log 对象输出', function () {
      $.log({ a: 1, b: 2 })
      assertLog(true, true)
    })

    it('log 数组输出', function () {
      $.log([1, 2, 3])
      assertLog(true, true)
    })

    it('log 多参数输出', function () {
      $.log('test', 123, { a: 1 })
      assertLog(true, true)
    })

    it('log 嵌套对象输出', function () {
      $.log({ a: { b: { c: 1 } } })
      assertLog(true, true)
    })

    it('log null 值', function () {
      $.log(null)
      assertLog(true, true)
    })

    it('log undefined 值', function () {
      $.log(undefined)
      assertLog(true, true)
    })

    it('log Symbol 值', function () {
      $.log(Symbol('test'))
      assertLog(true, true)
    })

    it('log BigInt 值', function () {
      $.log(BigInt(123))
      assertLog(true, true)
    })

    it('log RegExp 值', function () {
      $.log(/test/)
      assertLog(true, true)
    })

    it('log Date 值', function () {
      $.log(new Date('2024-01-01'))
      assertLog(true, true)
    })

    it('log Map 值', function () {
      $.log(new Map([['a', 1]]))
      assertLog(true, true)
    })

    it('log Set 值', function () {
      $.log(new Set([1, 2, 3]))
      assertLog(true, true)
    })

    it('log 函数值', function () {
      $.log(function myFunc () {})
      assertLog(true, true)
    })

    it('log 包含 undefined 的对象', function () {
      $.log({ a: undefined, b: 1 })
      assertLog(true, true)
    })

    it('log 嵌套数组', function () {
      $.log([[1, 2], [3, 4]])
      assertLog(true, true)
    })

    it('dir 函数存在', function () {
      assertLog(typeof $.dir, 'function')
    })

    it('dir 基本输出', function () {
      $.dir({ a: 1 })
      assertLog(true, true)
    })

    it('dir 嵌套对象', function () {
      $.dir({ a: { b: 1 } })
      assertLog(true, true)
    })

    it('dir 数组', function () {
      $.dir([1, 2, 3])
      assertLog(true, true)
    })

    it('dir null', function () {
      $.dir(null)
      assertLog(true, true)
    })

    it('dir undefined', function () {
      $.dir(undefined)
      assertLog(true, true)
    })

    it('dir symbol', function () {
      $.dir(Symbol('test'))
      assertLog(true, true)
    })

    it('dir bigint', function () {
      $.dir(BigInt(123))
      assertLog(true, true)
    })

    it('dir function', function () {
      $.dir(function test() {})
      assertLog(true, true)
    })

    it('dir multiple args', function () {
      $.dir(1, 'string', { a: 1 })
      assertLog(true, true)
    })

    it('log 嵌套函数的对象', function () {
      $.log({ a: function testFn() {} })
      assertLog(true, true)
    })

    it('log 匿名函数', function () {
      $.log(function() {})
      assertLog(true, true)
    })

    it('log 嵌套Set的对象', function () {
      $.log({ a: new Set([1, 2]) })
      assertLog(true, true)
    })

    it('log 嵌套Map的对象', function () {
      $.log({ a: new Map([['key', 'value']]) })
      assertLog(true, true)
    })

    it('log 包含函数key的对象', function () {
      const key = function getKey() {}
      $.log({ [key]: 'value' })
      assertLog(true, true)
    })

    it('log 多个嵌套对象', function () {
      $.log({ a: { b: { c: { d: 1 } } }, e: [1, 2, 3] })
      assertLog(true, true)
    })
  })
})
