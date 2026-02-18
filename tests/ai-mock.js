'use strict'
const $ = require('../index')
const assert = require('assert')
const assertLog = function () {
  global.assertCount++
  return assert.strictEqual(...arguments)
}

describe('AI-Mock测试', function () {
  describe('Mock 模拟数据', function () {
    it('Mock 对象存在', function () {
      assertLog(typeof $.Mock, 'object')
    })

    it('Mock.genUUID', function () {
      const result = $.Mock.genUUID()
      assertLog(typeof result, 'string')
    })

    it('Mock.genDatetime', function () {
      const result = $.Mock.genDatetime()
      assertLog(typeof result, 'string')
    })

    it('Mock.genData', function () {
      const result = $.Mock.genData()
      assertLog(typeof result, 'string')
    })

    it('Mock.genName', function () {
      const result = $.Mock.genName()
      assertLog(typeof result, 'string')
    })

    it('Mock.genCard', function () {
      const result = $.Mock.genCard()
      assertLog(typeof result, 'string')
    })

    it('Mock.genIp', function () {
      const result = $.Mock.genIp()
      assertLog(typeof result, 'string')
    })

    it('Mock.genUrl', function () {
      const result = $.Mock.genUrl()
      assertLog(typeof result, 'string')
    })

    it('Mock.genPhone', function () {
      const result = $.Mock.genPhone()
      assertLog(typeof result, 'string')
    })

    it('Mock.genColor', function () {
      const result = $.Mock.genColor()
      assertLog(typeof result, 'string')
    })

    it('Mock.genImg', function () {
      const result = $.Mock.genImg()
      assertLog(typeof result, 'string')
    })

    it('Mock.genWord', function () {
      const result = $.Mock.genWord()
      assertLog(typeof result, 'string')
    })

    it('Mock.genText', function () {
      const result = $.Mock.genText()
      assertLog(result.length > 0, true)
    })

    it('Mock.genConstellation', function () {
      const result = $.Mock.genConstellation()
      assertLog(typeof result, 'string')
    })

    it('Mock.genBool', function () {
      const result = $.Mock.genBool()
      assertLog(typeof result, 'number')
    })

    it('Mock.genEnum', function () {
      const result = $.Mock.genEnum(['a', 'b', 'c'])
      assertLog(['a', 'b', 'c'].includes(result), true)
    })

    it('Mock.genList', function () {
      const result = $.Mock.genList({ id: 'id', name: 'name' }, 3)
      assertLog(Array.isArray(result), true)
    })
  })
})
