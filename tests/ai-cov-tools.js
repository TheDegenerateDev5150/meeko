'use strict'
const $ = require('../index')
const assert = require('assert')
const assertLog = function () {
  global.assertCount++
  return assert.strictEqual(...arguments)
}
describe('AI-补充覆盖-tools', () => {
  describe('size 补充', () => {
    it('size(0) 返回0', () => {
      assertLog($.tools.size(0), 0)
    })

    it('size(Map) 使用 .size', () => {
      assertLog($.tools.size(new Map([[1, 2]])), 1)
    })
  })

  describe('equals 补充', () => {
    it('数组长度不同返回false', () => {
      assertLog($.tools.equals([1], [1, 2]), false)
    })
  })

  describe('hash 默认参数', () => {
    it('hash(str) 默认 sha1 hex', () => {
      const h = $.tools.hash('x')
      assertLog(typeof h, 'string')
      assertLog(h.length, 40)
    })

    it('hash() 空字符串', () => {
      const h = $.tools.hash()
      assertLog(h, 'da39a3ee5e6b4b0d3255bfef95601890afd80709')
    })
  })

  describe('uuid 补充', () => {
    it('crypto.randomUUID 不可用时的 rfc4122 回退', () => {
      const crypto = require('crypto')
      const originalRandomUUID = crypto.randomUUID
      crypto.randomUUID = undefined
      try {
        const uuid = $.tools.uuid(null, 64)
        assertLog(typeof uuid, 'string')
        assertLog(uuid.length, 36)
        assertLog(/^[0-9a-zA-Z-]{36}$/.test(uuid), true)
        assertLog(uuid[8], '-')
        assertLog(uuid[13], '-')
        assertLog(uuid[18], '-')
        assertLog(uuid[23], '-')
        assertLog(uuid[14], '4')
      } finally {
        crypto.randomUUID = originalRandomUUID
      }
    })
  })

  describe('race 补充', () => {
    it('race() 使用默认参数', async () => {
      const r = await $.tools.race()
      assertLog(typeof r, 'function')
    })

    it('race 超时路径', async () => {
      const r = await $.tools.race($.tools.wait(100), 10)
      global.assertCount++
      assert.deepStrictEqual(r, [500, 'timeout'])
    })
  })

  describe('waitNotEmpty 补充', () => {
    it('默认 noop 回调 + 递归等待', async () => {
      const o = {}
      setTimeout(() => {
        o.x = 1
      }, 150)
      await $.tools.waitNotEmpty(o, 'x')
      assertLog(o.x, 1)
    })
  })

  describe('TestCase 补充', () => {
    it('TestCase 默认参数 {}', () => {
      const tc = new $.tools.TestCase()
      assertLog(typeof tc, 'object')
    })

    it('TestCase 栈检查不满足时提前返回(进程内)', () => {
      const argv2 = process.argv[2]
      process.argv[2] = '-test'
      try {
        const tc = new $.tools.TestCase({ t1: async () => {} })
        assertLog(typeof tc, 'object')
      } finally {
        process.argv[2] = argv2
      }
    })

    it('TestCase 非入口文件 require 时提前返回', () => {
      const result = require('child_process').execSync(
        'node ' + process.cwd() + '/tests/helper_case_runner.js -test',
        { encoding: 'utf8' }
      )
      assertLog(result.includes('Run'), false)
    })
  })

  describe('timeAgo 补充', () => {
    it('英文 year ago', () => {
      const r = $.tools.timeAgo(Date.now() - 1000 * 60 * 60 * 24 * 400, Date.now(), 'en')
      assertLog(typeof r, 'string')
      assertLog(r.includes('year'), true)
      assertLog(r.includes('ago'), true)
    })

    it('英文 day late (dt<0)', () => {
      const r = $.tools.timeAgo(Date.now(), Date.now() - 1000 * 60 * 60 * 24, 'en')
      assertLog(typeof r, 'string')
      assertLog(r.includes('day'), true)
      assertLog(r.includes('late'), true)
    })

    it('英文 just now', () => {
      const r = $.tools.timeAgo(Date.now(), Date.now(), 'en')
      assertLog(r, 'just now')
    })
  })

  describe('checkParam 补充', () => {
    it('positive 类型错误带 name', () => {
      const result = $.tools.checkParam({ v: -1 }, { v: { type: 'positive', name: 'p' } })
      assertLog(result.code, 401)
      assertLog(result.msg, 'p Type error, must be positive')
    })

    it('positive 范围错误带 name', () => {
      const result = $.tools.checkParam({ v: 5 }, { v: { type: 'positive', name: 'p', size: [1, 3] } })
      assertLog(result.code, 401)
      assertLog(result.msg, 'p Range error')
    })

    it('negative 范围错误带 name', () => {
      const result = $.tools.checkParam({ v: -9 }, { v: { type: 'negative', name: 'n', size: [-5, -1] } })
      assertLog(result.code, 401)
      assertLog(result.msg, 'n Range error')
    })

    it('string 空字符串 _n 为 falsy 分支', () => {
      const result = $.tools.checkParam({ v: '' }, { v: { type: 'string' } })
      assertLog(result.code, 200)
      assertLog(result.data.v, '')
    })

    it('datetime 可选为空时 break', () => {
      const result = $.tools.checkParam({ val: '' }, { val: { type: 'datetime', def: '' } })
      assertLog(result.code, 200)
    })

    it('file fileType 非数组跳过检查', () => {
      const result = $.tools.checkParam(
        { val: [{ size: 100, type: 'png' }] },
        { val: { type: 'file', fileType: 'jpg' } }
      )
      assertLog(result.code, 200)
    })

    it('boolean 类型 - 布尔值', () => {
      const result = $.tools.checkParam({ val: true }, { val: { type: 'boolean' } })
      assertLog(result.code, 200)
      assertLog(result.data.val, true)
    })

    it('boolean 类型 - 数字字符串', () => {
      const result = $.tools.checkParam({ val: '1' }, { val: { type: 'boolean' } })
      assertLog(result.code, 200)
    })

    it('positive 类型错误不带 name', () => {
      const result = $.tools.checkParam({ v: -1 }, { v: { type: 'positive' } })
      assertLog(result.code, 401)
      assertLog(result.msg, 'v Type error, must be positive')
    })

    it('positive 有效且无 size', () => {
      const result = $.tools.checkParam({ v: 5 }, { v: { type: 'positive' } })
      assertLog(result.code, 200)
      assertLog(result.data.v, 5)
    })

    it('positive 低于范围不带 name', () => {
      const result = $.tools.checkParam({ v: 1 }, { v: { type: 'positive', size: [2, 5] } })
      assertLog(result.code, 401)
      assertLog(result.msg, 'v Range error')
    })

    it('negative 有效且无 size', () => {
      const result = $.tools.checkParam({ v: -3 }, { v: { type: 'negative' } })
      assertLog(result.code, 200)
      assertLog(result.data.v, -3)
    })

    it('boolean 类型 - 无效值', () => {
      const result = $.tools.checkParam({ val: 'xx' }, { val: { type: 'boolean' } })
      assertLog(result.code, 401)
    })

    it('boolean 类型 - 数字0', () => {
      const result = $.tools.checkParam({ val: 0 }, { val: { type: 'boolean' } })
      assertLog(result.code, 200)
      assertLog(result.data.val, 0)
    })

    it('boolean 类型 - 空字符串用 def 兜底', () => {
      const result = $.tools.checkParam({ val: '' }, { val: { type: 'boolean', def: 1 } })
      assertLog(result.code, 200)
      assertLog(result.data.val, 1)
    })
  })

  describe('cFn 补充', () => {
    it('c.r 带背景色和下划线', () => {
      const s = $.tools.c.r('s', 44, true)
      assertLog(s.includes('\x1b[4m'), true)
      assertLog(s.includes('\x1b[44m'), true)
    })

    it('c.dimr 带背景色和下划线', () => {
      const s = $.tools.c.dimr('s', 44, true)
      assertLog(s.includes('\x1b[2m'), true)
      assertLog(s.includes('\x1b[4m'), true)
      assertLog(s.includes('\x1b[44m'), true)
    })

    it('c.r 不传字符串 s||\'\' 兜底', () => {
      const s = $.tools.c.r()
      assertLog(typeof s, 'string')
      assertLog(s.includes('\x1b[31m'), true)
    })
  })

  describe('drawTable 补充', () => {
    it('drawTable 默认参数', () => {
      const r = $.drawTable([{ a: 1, b: 'x' }])
      assertLog(typeof r, 'string')
      assertLog(r.includes('A'), true)
    })

    it('drawTable colWidth 缺省列回退15', () => {
      const r = $.drawTable([{ a: 1, b: 'x' }], [5])
      assertLog(typeof r, 'string')
      assertLog(r.includes('B'), true)
    })

    it('drawTable color 模式 number/boolean/string', () => {
      const r = $.drawTable([{ a: 1, b: true, c: 'x' }], [5, 5, 5], { color: 1 })
      assertLog(typeof r, 'string')
      assertLog(r.includes('\x1b['), true)
    })

    it('drawTable 单元格含 ANSI 转义时 diffLen=13', () => {
      const r = $.drawTable([{ a: $.c.r('red') }], [10])
      assertLog(typeof r, 'string')
      assertLog(r.includes('red'), true)
    })
  })

  describe('roulette 补充', () => {
    it('roulette 第一个权重即命中 - 覆盖1287行 if-true 与1288行语句', () => {
      const origRandom = Math.random
      Math.random = () => 0.1
      try {
        const r = $.tools.roulette([{ k: 'a', w: 0.5 }, { k: 'b', w: 0.5 }])
        assertLog(r, 'a')
      } finally {
        Math.random = origRandom
      }
    })

    it('roulette 默认参数返回 undefined', () => {
      const r = $.tools.roulette()
      assertLog(r, undefined)
    })
  })
})
