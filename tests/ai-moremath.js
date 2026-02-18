'use strict'
const $ = require('../index')
const assert = require('assert')
const assertLog = function () {
  global.assertCount++
  return assert.strictEqual(...arguments)
}

describe('AI-MoreMath测试', function () {
  describe('更多数学函数', function () {
    it('allList 全排列', function () {
      const result = $.math.allList([1, 2, 3])
      assertLog(Array.isArray(result), true)
    })

    it('qr QR分解', function () {
      const QrDc = $.math.QrDc
      const result = new QrDc([[1, 2], [3, 4]])
      assertLog(typeof result, 'object')
    })

    it('cholesky Cholesky分解', function () {
      const CholeskyDc = $.math.CholeskyDc
      const result = new CholeskyDc([[4, 2], [2, 3]])
      assertLog(typeof result, 'object')
    })

    it('stats 对象存在', function () {
      assertLog(typeof $.math.stats, 'object')
    })

    it('fourierAnalysis 傅里叶分析', function () {
      const result = $.math.fourierAnalysis([1, 2, 3, 4])
      assertLog(typeof result, 'object')
    })

    it('autoCorrelation 自相关', function () {
      const result = $.math.autoCorrelation([1, 2, 3, 4, 5])
      assertLog(typeof result, 'number')
    })
  })
})
