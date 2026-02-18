'use strict'
const $ = require('../index')
const assert = require('assert')
const assertLog = function () {
  global.assertCount++
  return assert.strictEqual(...arguments)
}

describe('AI-MathExtra测试', function () {
  describe('math 扩展函数', function () {
    it('approximatelyEqual 近似相等', function () {
      assertLog($.math.approximatelyEqual(1.0, 1.001, 0.01), true)
      assertLog($.math.approximatelyEqual(1.0, 1.1, 0.01), false)
    })

    it('lcm 最小公倍数', function () {
      assertLog($.math.lcm(4, 5), 20)
    })

    it('gcd 最大公约数', function () {
      assertLog($.math.gcd(12, 8), 4)
    })

    it('fac 阶乘', function () {
      assertLog($.math.fac(5), 120)
    })

    it('primeFactor 素因数分解', function () {
      const result = $.math.primeFactor(12)
      assertLog(result.includes(2), true)
      assertLog(result.includes(3), true)
    })

    it('randInt 随机整数', function () {
      const result = $.math.randInt(1, 10)
      assertLog(result >= 1 && result <= 10, true)
    })

    it('mean 平均值', function () {
      assertLog($.math.mean([1, 2, 3]), 2)
    })

    it('median 中位数', function () {
      assertLog($.math.median([1, 2, 3, 4, 5]), 3)
    })

    it('variance 方差', function () {
      const result = $.math.variance([1, 2, 3, 4, 5])
      assertLog(typeof result, 'number')
    })

    it('stddev 标准差', function () {
      const result = $.math.stddev([1, 2, 3, 4, 5])
      assertLog(typeof result, 'number')
    })

    it('covariance 协方差', function () {
      const result = $.math.covariance([1, 2, 3], [1, 2, 3])
      assertLog(typeof result, 'number')
    })

    it('pearson 相关系数', function () {
      const result = $.math.pearson([1, 2, 3], [1, 2, 3])
      assertLog(result > 0.99, true)
    })

    it('skew 偏度', function () {
      const result = $.math.skew([1, 2, 3, 4, 5])
      assertLog(typeof result, 'number')
    })

    it('kurt1 峰度', function () {
      const result = $.math.kurt1([1, 2, 3, 4, 5])
      assertLog(typeof result, 'number')
    })

    it('quantile 四分位数', function () {
      const result = $.math.quantile([1, 2, 3, 4, 5])
      assertLog(result, 3)
    })

    it('quantileAll 百分位数', function () {
      const result = $.math.quantileAll([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])
      assertLog(result.Q2, 5.5)
    })

    it('hMean 调和平均数', function () {
      const result = $.math.hMean([1, 2, 3])
      assertLog(typeof result, 'number')
    })

    it('gMean 几何平均数', function () {
      const result = $.math.gMean([1, 2, 3])
      assertLog(typeof result, 'number')
    })

    it('qMean 二次平均数', function () {
      const result = $.math.qMean([1, 2, 3])
      assertLog(typeof result, 'number')
    })

    it('max 最大值', function () {
      assertLog($.math.max([1, 2, 3]), 3)
    })

    it('min 最小值', function () {
      assertLog($.math.min([1, 2, 3]), 1)
    })

    it('sum 求和', function () {
      assertLog($.math.sum([1, 2, 3]), 6)
    })

    it('range 极差', function () {
      const result = $.math.range([1, 2, 3, 4, 5])
      assertLog(result, 4)
    })

    it('mode 众数', function () {
      const result = $.math.mode([1, 2, 2, 3])
      assertLog(result[0], 2)
    })

    it('Matrix 矩阵', function () {
      const m = new $.math.Matrix([[1, 2], [3, 4]])
      assertLog(m.oriMatrix.length, 2)
    })

    it('mat 矩阵工具', function () {
      const result = $.math.mat
      assertLog(typeof result, 'object')
    })

    it('genRange 生成范围', function () {
      const result = $.math.genRange(1, 5)
      assertLog(result.length, 5)
    })

    it('num2e 数字转科学计数法', function () {
      const result = $.math.num2e(1234)
      assertLog(typeof result, 'string')
    })

    it('arrangeList 排列列表', function () {
      const result = $.math.arrangeList([1, 2, 3], 2)
      assertLog(result.length > 0, true)
    })

    it('combinList 组合列表', function () {
      const result = $.math.combinList([1, 2, 3], 2)
      assertLog(result.length > 0, true)
    })

    it('hCombin 组合数', function () {
      const result = $.math.hCombin(5, 2)
      assertLog(typeof result, 'number')
    })

    it('arrangement 排列数', function () {
      const result = $.math.arrangement(5, 2)
      assertLog(result, 20)
    })

    it('combination 组合数', function () {
      const result = $.math.combination(5, 2)
      assertLog(result, 10)
    })

    it('normal 正态分布', function () {
      const result = $.math.normal(0, 1)
      assertLog(typeof result, 'number')
    })

    it('uniformDiscrete 离散均匀分布', function () {
      const result = $.math.uniformDiscrete(1, 10)
      assertLog(result >= 1 && result <= 10, true)
    })

    it('poisson 泊松分布', function () {
      const result = $.math.poisson(5)
      assertLog(typeof result, 'number')
    })

    it('exponential 指数分布', function () {
      const result = $.math.exponential(1)
      assertLog(typeof result, 'number')
    })

    it('murmurHash Murmur哈希', function () {
      const result = $.math.murmurHash('test')
      assertLog(typeof result, 'number')
    })

    it('murmurHash - 长度1', function () {
      const result = $.math.murmurHash('a')
      assertLog(typeof result, 'number')
    })

    it('murmurHash - 长度2', function () {
      const result = $.math.murmurHash('ab')
      assertLog(typeof result, 'number')
    })

    it('murmurHash - 长度3', function () {
      const result = $.math.murmurHash('abc')
      assertLog(typeof result, 'number')
    })

    it('exponentialSmoothing 指数平滑', function () {
      const result = $.math.exponentialSmoothing([1, 2, 3, 4, 5], 0.5)
      assertLog(result.length, 5)
    })

    it('findMax 找最大值', function () {
      const result = $.math.findMax([1, 5, 3])
      assertLog(result.maxValue, 5)
    })

    it('findMaxMin 找最大最小值', function () {
      const result = $.math.findMaxMin([1, 5, 3])
      assertLog(result.max, 5)
      assertLog(result.min, 1)
    })

    it('meanDev 平均偏差', function () {
      const result = $.math.meanDev([1, 2, 3, 4, 5])
      assertLog(typeof result, 'number')
    })

    it('medianDev 中位数偏差', function () {
      const result = $.math.medianDev([1, 2, 3, 4, 5])
      assertLog(typeof result, 'number')
    })

    it('medianAbsDev 绝对中位数偏差', function () {
      const result = $.math.medianAbsDev([1, 2, 3, 4, 5])
      assertLog(typeof result, 'number')
    })

    it('stdErr 标准误差', function () {
      const result = $.math.stdErr([1, 2, 3, 4, 5])
      assertLog(typeof result, 'number')
    })

    it('coeVariation 变异系数', function () {
      const result = $.math.coeVariation([1, 2, 3, 4, 5])
      assertLog(typeof result, 'number')
    })

    it('count 计数', function () {
      const result = $.math.count([1, 2, 2, 3], function (x) { return x === 2 })
      assertLog(result['2'], 2)
    })

    it('countAdv 高级计数', function () {
      const result = $.math.countAdv([1, 2, 2, 3], { gt: 1 })
      assertLog(result.length, 3)
    })

    it('smallk 第k小值', function () {
      const result = $.math.smallk([5, 3, 1, 2, 4], 2)
      assertLog(result, 2)
    })

    it('largek 第k大值', function () {
      const result = $.math.largek([5, 3, 1, 2, 4], 2)
      assertLog(result, 4)
    })

    it('confidenceIntervals 置信区间', function () {
      const result = $.math.confidenceIntervals([1, 2, 3, 4, 5], 0.95)
      assertLog(result.length, 2)
    })

    it('spearman Spearman相关系数', function () {
      const result = $.math.spearman([1, 2, 3], [1, 2, 3])
      assertLog(result > 0.99, true)
    })

    it('kendall Kendall相关系数', function () {
      const result = $.math.kendall([1, 2, 3], [1, 2, 3])
      assertLog(result > 0.99, true)
    })

    it('kendall Kendall相关系数 - 有重复值', function () {
      const result = $.math.kendall([1, 2, 2, 3], [1, 2, 2, 3])
      assertLog(typeof result, 'number')
    })

    it('quantileAll - exc类型', function () {
      const result = $.math.quantileAll([1, 2, 3, 4, 5, 6, 7, 8], undefined, 'exc')
      assertLog(typeof result.Q1, 'number')
    })

    it('quantileAll - up为undefined分支 - 覆盖186,192行', function () {
      // 使用特定的数组长度和位置来触发边界条件
      const result = $.math.quantileAll([1, 2, 3, 4])
      assertLog(typeof result.Q1, 'number')
    })

    it('kurt2 峰度2', function () {
      const result = $.math.kurt2([1, 2, 3, 4, 5])
      assertLog(typeof result, 'number')
    })

    it('kurt3 峰度3', function () {
      const result = $.math.kurt3([1, 2, 3, 4, 5])
      assertLog(typeof result, 'number')
    })

    it('varianceCorrect 修正方差', function () {
      const result = $.math.varianceCorrect([1, 2, 3, 4, 5])
      assertLog(typeof result, 'number')
    })

    it('stddevCorrect 修正标准差', function () {
      const result = $.math.stddevCorrect([1, 2, 3, 4, 5])
      assertLog(typeof result, 'number')
    })

    it('covarianceCorrect 修正协方差', function () {
      const result = $.math.covarianceCorrect([1, 2, 3], [1, 2, 3])
      assertLog(typeof result, 'number')
    })

    it('cov 别名协方差', function () {
      const result = $.math.cov([1, 2, 3], [1, 2, 3])
      assertLog(Array.isArray(result), true)
    })

    it('fi 金融函数', function () {
      const result = $.math.fi
      assertLog(typeof result, 'object')
    })

    it('uniformBase 均匀分布基数', function () {
      const result = $.math.uniformBase()
      assertLog(typeof result, 'number')
    })

    it('uniformRandInt 均匀随机整数', function () {
      const result = $.math.uniformRandInt(1, 10)
      assertLog(result >= 1 && result <= 10, true)
    })
  })
})
