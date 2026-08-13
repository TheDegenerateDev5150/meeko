'use strict'
const $ = require('../index')
const assert = require('assert')
const assertLog = function () {
  global.assertCount++
  return assert.strictEqual(...arguments)
}

describe('AI覆盖率补充: mathMatrix/mathDistance/mathRand', function () {
  describe('mathMatrix 分支覆盖', function () {
    it('ones 单参数 n 缺省取 m - 覆盖223行 binary-expr 右侧', function () {
      const result = $.math.mat.ones(3)
      assertLog(JSON.stringify(result), '[[1,1,1],[1,1,1],[1,1,1]]')
    })

    it('lupDecomposition 对角占优无需换主元 - 覆盖629行 if-false', function () {
      const result = $.math.mat.lupDecomposition([[4, 1], [2, 3]])
      assertLog(JSON.stringify(result), '[[[1,0],[0.5,1]],[[4,1],[0,2.5]],[[1,0],[0,1]]]')
    })

    it('lupDecomposition 奇异矩阵 LU[j][j]为0 - 覆盖639行 if-false', function () {
      const result = $.math.mat.lupDecomposition([[1, 2], [2, 4]])
      assertLog(JSON.stringify(result), '[[[1,0],[0.5,1]],[[2,4],[0,0]],[[0,1],[1,0]]]')
    })
  })

  describe('mathDistance 分支覆盖', function () {
    it('levenshtein 无参数走默认值 - 覆盖87行 default-arg x2', function () {
      const result = $.math.dist.levenshtein()
      assertLog(result.ld, 0)
      assertLog(result.matchRate, 0)
      assertLog(JSON.stringify(result.matrix), '[]')
    })

    it('levenshtein 数组输入非字符串 - 覆盖88/89行 cond-expr false', function () {
      const result = $.math.dist.levenshtein([1, 2, 3], [1, 2])
      assertLog(result.ld, 1)
    })

    it('cosn 无参数走默认值 - 覆盖143行 default-arg x2', function () {
      assertLog(Number.isNaN($.math.dist.cosn()), true)
    })

    it('cosn 单参数 y 缺省 - 覆盖143行 y default-arg', function () {
      assertLog(Number.isNaN($.math.dist.cosn([1, 2])), true)
    })
  })

  describe('mathRand 分支覆盖', function () {
    it('normal 无参数走默认值 - 覆盖80行 default-arg x2', function () {
      assertLog(typeof $.math.normal(), 'number')
    })

    it('gamma c<1 且 p>1 接受分支 - 覆盖121行 if-true 与122行语句', function () {
      const origRandom = Math.random
      const seq = [0.9, 0.5]
      let idx = 0
      Math.random = () => seq[idx++ % seq.length]
      try {
        assertLog($.math.gamma(2, 3, 0.5), 6.321770866807386)
      } finally {
        Math.random = origRandom
      }
    })

    it('gamma c<1 且 p>1 拒绝后继续循环 - 覆盖121行 if-false', function () {
      const origRandom = Math.random
      const seq = [0.9, 0.99, 0.9, 0.5]
      let idx = 0
      Math.random = () => seq[idx++ % seq.length]
      try {
        assertLog($.math.gamma(2, 3, 0.5), 6.321770866807386)
      } finally {
        Math.random = origRandom
      }
    })

    it('gamma c<1 且 p<=1 走 else 分支 - 覆盖119行 if-false', function () {
      const origRandom = Math.random
      const seq = [0.5, 0.5]
      let idx = 0
      Math.random = () => seq[idx++ % seq.length]
      try {
        assertLog($.math.gamma(2, 3, 0.5), 3.0512849464854463)
      } finally {
        Math.random = origRandom
      }
    })

    it('secRand crypto 可用分支 - 覆盖40行 if-true', function () {
      const result = $.math.secRand(0, 10000)
      assertLog(result >= 0 && result <= 10000, true)
    })
  })
})
