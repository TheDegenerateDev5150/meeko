'use strict'
const $ = require('../index')
const assert = require('assert')
const assertLog = function () {
  global.assertCount++
  return assert.strictEqual(...arguments)
}

describe('AI-Crypto测试', function () {
  describe('Crypto 加密', function () {
    it('Crypto 函数存在', function () {
      assertLog(typeof $.Crypto, 'function')
    })

    it('Crypto 实例', function () {
      const crypto = new $.Crypto()
      assertLog(typeof crypto, 'object')
    })
  })

  describe('QRCode 二维码', function () {
    it('qrcode 对象存在', function () {
      assertLog(typeof $.qrcode, 'object')
    })
  })

  describe('Snowflake 雪花算法', function () {
    it('Snowflake 函数存在', function () {
      assertLog(typeof $.Snowflake, 'function')
    })

    it('Snowflake 实例', function () {
      const Snowflake = $.Snowflake
      const snowflake = new Snowflake(1n, 1n, 0n)
      assertLog(typeof snowflake, 'object')
    })

    it('Snowflake nextId', function () {
      const Snowflake = $.Snowflake
      const snowflake = new Snowflake(1n, 1n, 0n)
      const id = snowflake.nextId()
      assertLog(typeof id, 'bigint')
    })
  })
})
