'use strict'
const $ = require('../index')
const assert = require('assert')
const assertLog = function () {
  global.assertCount++
  return assert.strictEqual(...arguments)
}
describe('AI-Fake模块测试', () => {
  describe('身份证校验', () => {
    it('15位身份证校验', () => {
      const id15 = '110101790101123'
      const result = $.fake.checkIdCard.check(id15)
      assertLog(typeof result, 'boolean')
    })

    it('18位身份证校验 - 正确', () => {
      const id18 = '11010519491231002X'
      assertLog($.fake.checkIdCard.check(id18), true)
    })

    it('18位身份证校验 - 错误', () => {
      const id18 = '110105194912310021'
      assertLog($.fake.checkIdCard.check(id18), false)
    })

    it('18位身份证校验 - 大写X', () => {
      const id18 = '11010519491231002X'
      assertLog($.fake.checkIdCard.checkParityBit(id18), true)
    })

    it('18位身份证校验 - 小写x', () => {
      const id18 = '11010519491231002x'
      assertLog($.fake.checkIdCard.checkParityBit(id18), true)
    })

    it('格式错误', () => {
      assertLog($.fake.checkIdCard.check('123456'), false)
    })

    it('获取校检位', () => {
      const parityBit = $.fake.checkIdCard.getParityBit('11010519491231002')
      assertLog(typeof parityBit, 'string')
    })

    it('15位转18位', () => {
      const id18 = $.fake.checkIdCard.getId18('110101790101123')
      assertLog(id18.length, 18)
    })

    it('18位转15位', () => {
      const id15 = $.fake.checkIdCard.getId15('11010519491231002X')
      assertLog(id15.length, 15)
    })

    it('获取身份证信息', () => {
      const info = $.fake.checkIdCard.getInfo('11010519491231002X')
      assertLog(info.birthday !== undefined, true)
    })

    it('身份证日期无效 - 覆盖298行', () => {
      const result = $.fake.checkIdCard.check18IdCardNo('11010520991231002X')
      assertLog(result, false)
    })

    it('身份证日期不合法 - 覆盖298行', () => {
      const result = $.fake.checkIdCard.check18IdCardNo('11010520231345002X')
      assertLog(result, false)
    })

    it('身份证长度非法 - 覆盖341行', () => {
      const result = $.fake.checkIdCard.check('12345678901234567')
      assertLog(result, false)
    })
  })

  describe('姓名生成', () => {
    it('随机姓名', () => {
      const name = $.fake.randName()
      assertLog(typeof name, 'string')
      assertLog(name.length > 0, true)
    })

    it('随机姓氏', () => {
      const name = $.fake.randfirstName()
      assertLog(typeof name, 'string')
    })

    it('随机名字', () => {
      const name = $.fake.randSecName()
      assertLog(typeof name, 'string')
    })
  })

  describe('颜色生成', () => {
    it('随机颜色', () => {
      const color = $.fake.randColor()
      assertLog(color.startsWith('#'), true)
    })
  })

  describe('数字字符串', () => {
    it('随机数字', () => {
      const num = $.fake.randNum(6)
      assertLog(typeof num, 'string')
      assertLog(num.length, 6)
    })

    it('随机字符串', () => {
      const str = $.fake.randStr(10)
      assertLog(typeof str, 'string')
      assertLog(str.length, 10)
    })
  })

  describe('时间生成', () => {
    it('随机时间', () => {
      const time = $.fake.randTime()
      assertLog(typeof time, 'string')
    })

    it('指定范围时间', () => {
      const time = $.fake.randTime('2020-01-01', '2020-12-31')
      assertLog(typeof time, 'string')
    })
  })

  describe('价格生成', () => {
    it('随机价格', () => {
      const price = $.fake.price()
      assertLog(typeof price, 'string')
    })

    it('指定小数位', () => {
      const price = $.fake.price(2, 2)
      assertLog(typeof price, 'string')
    })
  })

  describe('URL和IP', () => {
    it('随机URL', () => {
      const url = $.fake.randUrl()
      assertLog(typeof url, 'string')
    })

    it('随机IP', () => {
      const ip = $.fake.randIp()
      assertLog(typeof ip, 'string')
    })
  })

  describe('手机号', () => {
    it('随机手机号', () => {
      const phone = $.fake.phoneNum()
      assertLog(typeof phone, 'string')
      assertLog(phone.length, 11)
    })

    it('指定运营商', () => {
      const result = $.fake.whichNetwork('13812345678')
      assertLog(typeof result, 'number')
    })
  })

  describe('身份证生成', () => {
    it('生成随机身份证', () => {
      const id = $.fake.idCard()
      assertLog(typeof id, 'string')
      assertLog(id.length === 15 || id.length === 18, true)
    })
  })
})
