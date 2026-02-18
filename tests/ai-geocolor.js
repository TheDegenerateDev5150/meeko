'use strict'
const $ = require('../index')
const assert = require('assert')
const assertLog = function () {
  global.assertCount++
  return assert.strictEqual(...arguments)
}

describe('AI-GeoColor测试', function () {
  describe('geo 地理位置', function () {
    it('geo 对象存在', function () {
      assertLog(typeof $.geo, 'object')
    })

    it('geo.getDistance', function () {
      const result = $.geo.getDistance(116.403988, 39.914266, 116.403988, 39.914266)
      assertLog(typeof result, 'number')
    })
  })

  describe('color 颜色', function () {
    it('color 函数存在', function () {
      assertLog(typeof $.color, 'function')
    })

    it('color 随机颜色', function () {
      const result = $.color()
      assertLog(typeof result, 'object')
    })
  })

  describe('Spinner 加载动画', function () {
    it('Spinner 函数存在', function () {
      assertLog(typeof $.Spinner, 'function')
    })

    it('Spinner 实例创建', function () {
      const Spinner = $.Spinner
      const spinner = new Spinner('dots')
      assertLog(typeof spinner, 'object')
    })

    it('Spinner start stop 覆盖61-62行', function () {
      const origCursorTo = process.stdout.cursorTo
      const origClearLine = process.stdout.clearLine
      process.stdout.cursorTo = function () {}
      process.stdout.clearLine = function () {}
      const spinner = new $.Spinner('dots')
      spinner.start()
      spinner.stop()
      process.stdout.cursorTo = origCursorTo
      process.stdout.clearLine = origClearLine
      assertLog(typeof spinner.timer, 'object')
    })
  })
})
