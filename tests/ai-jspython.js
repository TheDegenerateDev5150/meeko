'use strict'
const $ = require('../index')
const assert = require('assert')
const assertLog = function () {
  global.assertCount++
  return assert.strictEqual(...arguments)
}

describe('AI-JSPython测试', function () {
  describe('np NumPy风格函数', function () {
    it('np 对象存在', function () {
      assertLog(typeof $.math.np, 'object')
    })

    it('np.diff 差分', function () {
      const result = $.math.np.diff([1, 2, 4, 7, 0])
      assertLog(result.length, 4)
    })

    it('np.mean 平均值', function () {
      const result = $.math.np.mean([1, 2, 3])
      assertLog(result, 2)
    })

    it('np.wmean 加权平均', function () {
      const result = $.math.np.wmean([1, 2, 3], [0.5, 0.25, 0.25])
      assertLog(result, 1.75)
    })

    it('np.median 中位数', function () {
      const result = $.math.np.median([1, 2, 3])
      assertLog(result, 2)
    })

    it('np.std 标准差', function () {
      const result = $.math.np.std([1, 2, 3, 4, 5])
      assertLog(typeof result, 'number')
    })

    it('np.cv 变异系数', function () {
      const result = $.math.np.cv([1, 2, 3, 4, 5])
      assertLog(typeof result, 'number')
    })

    it('np.arange 范围数组', function () {
      const result = $.math.np.arange(5)
      assertLog(Array.isArray(result), true)
    })

    it('np.arange2 带步长', function () {
      const result = $.math.np.arange(0, 10, 2)
      assertLog(Array.isArray(result), true)
    })

    it('np.reshape 数组重塑', function () {
      const result = $.math.np.reshape([1, 2, 3, 4, 5, 6], 2, 3)
      assertLog(Array.isArray(result), true)
    })

    it('np.linspace 线性空间', function () {
      const result = $.math.np.linspace(0, 10, 5)
      assertLog(result.length, 5)
    })

    it('np.linspace2 线性空间不含端点', function () {
      const result = $.math.np.linspace(0, 10, 5, false)
      assertLog(result.length, 6)
    })

    it('np.dot 点积', function () {
      const result = $.math.np.dot([1, 2], [3, 4])
      assertLog(result, 11)
    })

    it('np.inv 矩阵逆', function () {
      const result = $.math.np.inv([[1, 2], [3, 4]])
      assertLog(Array.isArray(result), true)
    })
  })

  describe('stats 统计函数', function () {
    it('stats 对象存在', function () {
      assertLog(typeof $.math.stats, 'object')
    })

    it('stats.gmean 几何平均', function () {
      const result = $.math.stats.gmean([1, 2, 3])
      assertLog(result > 0, true)
    })

    it('stats.hmean 调和平均', function () {
      const result = $.math.stats.hmean([1, 2, 3])
      assertLog(result > 0, true)
    })

    it('stats.norm.cdf 负数值-覆盖erf负数分支', function () {
      const result = $.math.stats.norm.cdf([-2, -1, 0], 0, 1)
      assertLog(result[0] < 0.1, true)
      assertLog(result[1] < 0.5, true)
      assertLog(result[2] === 0.5, true)
    })

    it('stats.poisson.cdf - 覆盖110行无效输入', function () {
      const result = $.math.stats.poisson.cdf([-1, 0.5, 1], -1)
      assertLog(Array.isArray(result), true)
    })
  })
})
