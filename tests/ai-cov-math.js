'use strict'
const $ = require('../index')
const assert = require('assert')
const assertLog = function () {
  global.assertCount++
  return assert.strictEqual(...arguments)
}

describe('lib/math.js 覆盖率补充测试', () => {
  const a = [2, 1, 8.1, 3, 4, 5.1, 6.7]

  it('quantile exc算法 Q1/Q3 cond-expr分支 (140/149)', () => {
    assertLog($.math.quantile(a, 1, 'exc'), 2.25)
    assertLog($.math.quantile(a, 3, 'exc'), 6.3)
  })

  it('quantileAll 单元素数组 up===undefined分支 (185/186, 191/192)', () => {
    assertLog(
      JSON.stringify($.math.quantileAll([7])),
      '{"min":7,"Q1":7,"Q2":7,"Q3":7,"max":7,"IQR":0,"upper":7,"lower":7}'
    )
  })

  it('count/countAdv 默认参数 (222/228)', () => {
    assertLog(JSON.stringify($.math.count()), '{}')
    assertLog(JSON.stringify($.math.countAdv()), '[]')
  })

  it('covariance/covarianceCorrect 默认参数 (270x2/286x2)', () => {
    assertLog(Object.is($.math.covariance(), NaN), true)
    assertLog($.math.covarianceCorrect(), 0)
    assertLog(Object.is($.math.covariance([1, 2, 3]), NaN), true)
    assertLog($.math.covarianceCorrect([1, 2, 3]), 0)
  })

  it('skew bias=true cond-expr分支 (562)', () => {
    assertLog($.math.skew([53, 61, 49, 66, 78, 47], true).toFixed(6), '0.571554')
  })

  it('autoCorrelation lag=0 sumXy===sumSq cond-expr分支 (891)', () => {
    assertLog($.math.autoCorrelation([1, 2, 3, 4, 5], 0), 1)
  })

  it('exponentialSmoothing nextPoint>0 (y[i]||0) binary-expr分支 (955)', () => {
    assertLog(JSON.stringify($.math.exponentialSmoothing([1, 2, 3], 0.5, 1)), '[1,1.5,2.25,1.125]')
    assertLog(JSON.stringify($.math.exponentialSmoothing([1, 0, 3])), '[1,0.5,1.75]')
  })

  it('linearFitting 默认参数 (959)', () => {
    const rst = $.math.linearFitting()
    assertLog(Object.is(rst.a, NaN), true)
    assertLog(rst.f, 'y=NaN*x+NaN R^2=NaN')
  })

  it('exponentFitting 默认参数 (973)', () => {
    const rst = $.math.exponentFitting()
    assertLog(Object.is(rst.a, NaN), true)
    assertLog(rst.f, 'y=NaN*e^(NaN*x) R^2=NaN')
  })

  it('lnFitting 默认参数 (988)', () => {
    const rst = $.math.lnFitting()
    assertLog(Object.is(rst.a, NaN), true)
    assertLog(rst.f, 'y=NaN*ln(x)+NaN R^2=NaN')
  })

  it('powerFitting 默认参数 (1002x2)', () => {
    const rst = $.math.powerFitting()
    assertLog(Object.is(rst.a, NaN), true)
    assertLog(rst.f, 'y=NaN*x^NaN R^2=NaN')
  })

  it('polyFitting 默认参数 (1016x3)', () => {
    const rst = $.math.polyFitting()
    assertLog(Object.is(rst.r, NaN), true)
    assertLog(rst.f, 'y= R^2=NaN')
    assertLog(JSON.stringify(rst.formula), '[]')
  })

  it('pearson 默认参数 (1059)', () => {
    assertLog(Object.is($.math.pearson(), NaN), true)
  })

  it('spearman 默认参数 (1084)', () => {
    assertLog(Object.is($.math.spearman(), NaN), true)
  })

  it('kendall 默认参数 (1128)', () => {
    assertLog(Object.is($.math.kendall(), NaN), true)
  })
})
