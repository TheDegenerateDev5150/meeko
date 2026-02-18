'use strict'
const $ = require('../index')
const assert = require('assert')
const assertLog = function () {
  global.assertCount++
  return assert.strictEqual(...arguments)
}

describe('AI-Bench测试', function () {
  describe('bench 性能测试', function () {
    it('bench 对象存在', function () {
      assertLog(typeof $.bench, 'object')
    })

    it('bench.json 函数存在', function () {
      assertLog(typeof $.bench.json, 'function')
    })

    it('bench.print 函数存在', function () {
      assertLog(typeof $.bench.print, 'function')
    })

    it('bench.suite 函数存在', function () {
      assertLog(typeof $.bench.suite, 'function')
    })

    it('benchmark 函数存在', function () {
      assertLog(typeof $.benchmark, 'function')
    })

    it('benchmark 执行', function () {
      $.benchmark(function () {
        let sum = 0
        for (let i = 0; i < 100; i++) {
          sum += i
        }
      }, { iterations: 5 })
      assertLog(true, true)
    })

    it('benchmark - 默认参数', function () {
      const result = $.bench.json()
      assertLog(typeof result, 'object')
      assertLog(result.perSecVal >= 0, true)
    })

    it('benchmark suite - 测试', function () {
      $.bench.suite([
        {
          name: '测试组',
          testArr: [
            [function () { return 1 }, '测试1', 10],
            [function () { return 2 }, '测试2', 10]
          ]
        }
      ])
      assertLog(true, true)
    })
  })
})
