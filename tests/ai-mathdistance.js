'use strict'
const $ = require('../index')
const assert = require('assert')
const assertLog = function () {
  global.assertCount++
  return assert.strictEqual(...arguments)
}

describe('AI-MathDistance测试', function () {
  describe('dist 距离函数', function () {
    it('euclidean 欧氏距离', function () {
      const result = $.math.dist.euclidean([0, 0], [3, 4])
      assertLog(result, 5)
    })

    it('euclidean 不同长度-应报错', function () {
      try {
        $.math.dist.euclidean([1, 2], [1])
        assertLog(false, true)
      } catch (e) {
        assertLog(e.message.includes('不一致'), true)
      }
    })

    it('euclideans 标准化欧氏距离', function () {
      const result = $.math.dist.euclideans([0, 0], [3, 4])
      assertLog(typeof result, 'number')
    })

    it('euclideans 不同长度-应报错', function () {
      try {
        $.math.dist.euclideans([1, 2], [1])
        assertLog(false, true)
      } catch (e) {
        assertLog(e.message.includes('不一致'), true)
      }
    })

    it('manhattan 曼哈顿距离', function () {
      const result = $.math.dist.manhattan([0, 0], [3, 4])
      assertLog(result, 7)
    })

    it('manhattan 不同长度-应报错', function () {
      try {
        $.math.dist.manhattan([1, 2], [1])
        assertLog(false, true)
      } catch (e) {
        assertLog(e.message.includes('不一致'), true)
      }
    })

    it('lance 兰氏距离', function () {
      const result = $.math.dist.lance([0, 0], [3, 4])
      assertLog(typeof result, 'number')
    })

    it('lance 不同长度-应报错', function () {
      try {
        $.math.dist.lance([1, 2], [1])
        assertLog(false, true)
      } catch (e) {
        assertLog(e.message.includes('不一致'), true)
      }
    })

    it('chebyshevn 切比雪夫距离', function () {
      const result = $.math.dist.chebyshevn([0, 0], [3, 4])
      assertLog(result, 4)
    })

    it('chebyshevn 不同长度-应报错', function () {
      try {
        $.math.dist.chebyshevn([1, 2], [1])
        assertLog(false, true)
      } catch (e) {
        assertLog(e.message.includes('不一致'), true)
      }
    })

    it('hamming 汉明距离', function () {
      const result = $.math.dist.hamming('kitten', 'sitting')
      assertLog(result, 2)
    })

    it('levenshtein 编辑距离', function () {
      const result = $.math.dist.levenshtein('kitten', 'sitting')
      assertLog(result.ld, 3)
    })

    it('edit 编辑距离别名', function () {
      const result = $.math.dist.edit('kitten', 'sitting')
      assertLog(result.ld, 3)
    })

    it('diceCoefficient Dice系数', function () {
      const x = { length: 5, intersect: function (arr) { return { length: 4 } } }
      const y = { length: 5 }
      const result = $.math.dist.diceCoefficient(x, y)
      assertLog(typeof result, 'number')
    })

    it('jaccardCoefficient Jaccard系数', function () {
      const x = { length: 5, intersect: function (arr) { return { length: 4 } }, union: function (arr) { return { length: 6 } } }
      const y = { length: 5 }
      const result = $.math.dist.jaccardCoefficient(x, y)
      assertLog(typeof result, 'number')
    })

    it('jaccardDistance Jaccard距离', function () {
      const x = { length: 5, intersect: function (arr) { return { length: 4 } }, union: function (arr) { return { length: 6 } } }
      const y = { length: 5 }
      const result = $.math.dist.jaccardDistance(x, y)
      assertLog(typeof result, 'number')
    })

    it('cosn 余弦距离', function () {
      const result = $.math.dist.cosn([1, 0], [0, 1])
      assertLog(typeof result, 'number')
    })
  })
})
