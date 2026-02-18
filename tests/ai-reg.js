'use strict'
const $ = require('../index')
const assert = require('assert')
const assertLog = function () {
  global.assertCount++
  return assert.strictEqual(...arguments)
}

describe('AI-Reg测试', function () {
  describe('reg 正则', function () {
    it('reg.gen 函数存在', function () {
      assertLog(typeof $.reg.gen, 'function')
    })

    it('reg.gen 生成数字', function () {
      const result = $.reg.gen('[0-9]')
      assertLog(typeof result, 'string')
    })

    it('reg.gen 生成字母', function () {
      const result = $.reg.gen('[a-z]')
      assertLog(typeof result, 'string')
    })
  })
})
