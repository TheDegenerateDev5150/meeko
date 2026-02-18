'use strict'
const $ = require('../index')
const assert = require('assert')
const assertLog = function () {
  global.assertCount++
  return assert.strictEqual(...arguments)
}
describe('AI-Finance模块测试', () => {
  describe('tsClean 时序数据清理', () => {
    it('前后都有值取平均', () => {
      const arr = [1, null, 3, 4, null, 6]
      const result = $.math.fi.tsClean(arr)
      assertLog(result[1], 2)
    })

    it('前有后无取前值', () => {
      const arr = [1, 2, 3, null]
      const result = $.math.fi.tsClean(arr)
      assertLog(result[3], 3)
    })

    it('后有前无取后值', () => {
      const arr = [null, 2, 3, 4]
      const result = $.math.fi.tsClean(arr)
      assertLog(result[0], 2)
    })

    it('全为有效值', () => {
      const arr = [1, 2, 3, 4, 5]
      const result = $.math.fi.tsClean(arr)
      assertLog(result.join(','), '1,2,3,4,5')
    })

    it('全为null', () => {
      const arr = [null, null, null]
      const result = $.math.fi.tsClean(arr)
      assertLog(result[0], 0)
      assertLog(result[1], 0)
    })

    it('边界情况 - 连续null', () => {
      const arr = [1, null, null, 4]
      const result = $.math.fi.tsClean(arr)
      assertLog(result[1], 1)
      assertLog(result[2], 2.5)
    })
  })

  describe('logReturn 对数收益率', () => {
    it('正常计算', () => {
      const prices = [100, 110, 121, 133.1]
      const result = $.math.fi.logReturn(prices)
      assertLog(result.length, 3)
    })

    it('单元素数组', () => {
      const prices = [100]
      const result = $.math.fi.logReturn(prices)
      assertLog(result.length, 0)
    })

    it('两元素数组', () => {
      const prices = [100, 110]
      const result = $.math.fi.logReturn(prices)
      assertLog(result.length, 1)
    })

    it('价格下跌', () => {
      const prices = [100, 90, 81]
      const result = $.math.fi.logReturn(prices)
      assertLog(result[0] < 0, true)
    })
  })

  describe('betaRate 贝塔系数', () => {
    it('正常计算', () => {
      const stock = [1, 2, 3, 4, 5]
      const market = [1, 1.5, 2, 2.5, 3]
      const beta = $.math.fi.betaRate(stock, market)
      assertLog(typeof beta, 'number')
    })

    it('相同数据', () => {
      const a = [1, 2, 3, 4, 5]
      const beta = $.math.fi.betaRate(a, a)
      assertLog(beta, 1)
    })
  })

  describe('sharpeRate 夏普比率', () => {
    it('默认参数', () => {
      const returns = [0.1, 0.15, 0.12, 0.08, 0.2]
      const sharpe = $.math.fi.sharpeRate(returns)
      assertLog(typeof sharpe, 'number')
    })

    it('自定义参数', () => {
      const returns = [0.1, 0.15, 0.12, 0.08, 0.2]
      const sharpe = $.math.fi.sharpeRate(returns, 0.03, 250)
      assertLog(typeof sharpe, 'number')
    })

    it('负收益', () => {
      const returns = [-0.1, -0.05, 0.02, -0.01]
      const sharpe = $.math.fi.sharpeRate(returns, 0.04, 252)
      assertLog(typeof sharpe, 'number')
    })
  })
})
