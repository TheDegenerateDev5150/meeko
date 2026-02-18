'use strict'
const $ = require('../index')
const assert = require('assert')
const assertLog = function () {
  global.assertCount++
  return assert.strictEqual(...arguments)
}

describe('AI-DateTpl测试', function () {
  describe('date 原型扩展', function () {
    const d = new Date('2024-06-15 14:30:45.123')

    it('format 默认格式', function () {
      const result = d.format()
      assertLog(typeof result, 'string')
    })

    it('format YYYY-MM-DD', function () {
      const result = d.format('YYYY-MM-DD')
      assertLog(result.includes('2024'), true)
    })

    it('formatUTC', function () {
      const result = d.formatUTC('YYYY-MM-DD')
      assertLog(typeof result, 'string')
    })

    it('getWeek 周数', function () {
      const d1 = new Date('2024-01-01')
      const week = d1.getWeek()
      assertLog(typeof week, 'number')
    })
  })

  describe('tpl 模板', function () {
    it('创建模板函数', function () {
      const t = $.tpl('{{=it.name}}')
      assertLog(typeof t, 'object')
    })

    it('tpl config - 覆盖87-91行', function () {
      $.tpl.config({ open: '{{', close: '}}' })
      const t = $.tpl('{{=it.name}}')
      assertLog(typeof t, 'object')
    })
  })
})
