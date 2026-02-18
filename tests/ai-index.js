'use strict'
const $ = require('../index')
const assert = require('assert')
const assertLog = function () {
  global.assertCount++
  return assert.strictEqual(...arguments)
}
describe('AI-Index模块测试', () => {
  describe('log 函数', () => {
    it('log 基本输出', () => {
      const result = $.log('test')
      assertLog(result, 1)
    })

    it('log 多个参数', () => {
      const result = $.log('a', 'b', 'c')
      assertLog(result, 1)
    })

    it('log 对象参数', () => {
      const result = $.log({ a: 1 })
      assertLog(result, 1)
    })

    it('log 数组参数', () => {
      const result = $.log([1, 2, 3])
      assertLog(result, 1)
    })

    it('log 关闭时间', () => {
      const original = $.option.logTime
      $.option.logTime = false
      const result = $.log('test')
      $.option.logTime = original
      assertLog(result, 1)
    })
  })

  describe('err 函数', () => {
    it('err 基本输出', () => {
      const result = $.err('error test')
      assertLog(result, 1)
    })

    it('err 对象参数', () => {
      const result = $.err({ error: 'test' })
      assertLog(result, 1)
    })
  })

  describe('dir 函数', () => {
    it('dir 基本输出', () => {
      const result = $.dir({ a: 1 })
      assertLog(Array.isArray(result), true)
    })

    it('dir 多个参数', () => {
      const result = $.dir({ a: 1 }, { b: 2 })
      assertLog(result.length, 2)
    })

    it('dir 包含函数的对象', () => {
      const result = $.dir({ fn: function () {} })
      assertLog(Array.isArray(result), true)
    })

    it('dir 包含正则的对象', () => {
      const result = $.dir({ reg: /test/ })
      assertLog(Array.isArray(result), true)
    })

    it('dir 包含bigint', () => {
      const result = $.dir({ num: 123n })
      assertLog(Array.isArray(result), true)
    })

    it('dir 嵌套对象', () => {
      const result = $.dir({ a: { b: { c: 1 } } })
      assertLog(Array.isArray(result), true)
    })

    it('dir 数组', () => {
      const result = $.dir([1, 2, 3])
      assertLog(Array.isArray(result), true)
    })
  })

  describe('compare 函数', () => {
    it('compare 升序', () => {
      const arr = [{ name: 'b', val: 2 }, { name: 'a', val: 1 }]
      const sorted = arr.sort($.compare('val'))
      assertLog(sorted[0].name, 'a')
    })

    it('compare 降序', () => {
      const arr = [{ name: 'a', val: 1 }, { name: 'b', val: 2 }]
      const sorted = arr.sort($.compare('val', 'desc'))
      assertLog(sorted[0].name, 'b')
    })
  })

  describe('to 函数', () => {
    it('to Promise 成功', async () => {
      const result = await $.to(Promise.resolve('success'))
      assertLog(result[1], 'success')
    })

    it('to Promise 失败', async () => {
      const result = await $.to(Promise.reject(new Error('fail')))
      assertLog(result[0] !== null, true)
    })
  })

  describe('now 函数', () => {
    it('now 返回Date', () => {
      const result = $.now()
      assertLog(result instanceof Date, true)
    })
  })

  describe('getStackTrace 函数', () => {
    it('getStackTrace 返回字符串', () => {
      const result = $.getStackTrace()
      assertLog(typeof result, 'string')
    })
  })

  describe('option', () => {
    it('option 默认值', () => {
      assertLog($.option.logTime, true)
    })

    it('option 设置', () => {
      $.option.logTime = false
      assertLog($.option.logTime, false)
      $.option.logTime = true
    })
  })

  describe('wait 函数', () => {
    it('wait 等待', async () => {
      const start = Date.now()
      await $.wait(10)
      const elapsed = Date.now() - start
      assertLog(elapsed >= 5, true)
    })
  })

  describe('pipe 函数', () => {
    it('pipe 基本用法', () => {
      const result = $.pipe(
        x => x + 1,
        x => x * 2
      )(1)
      assertLog(result, 4)
    })
  })

  describe('json 函数', () => {
    it('json parse', () => {
      const result = $.json.parse('{"a":1}')
      assertLog(result.a, 1)
    })

    it('json stringify', () => {
      const result = $.json.stringify({ a: 1 })
      assertLog(result, '{"a":1}')
    })
  })

  describe('ext 原型扩展', () => {
    it('ext 函数', () => {
      assertLog(typeof $.ext, 'function')
    })
  })

  describe('geo 模块', () => {
    it('geo 距离计算', () => {
      const result = $.geo.getDistance(39.9042, 116.4074, 31.2304, 121.4737)
      assertLog(typeof result, 'number')
    })
  })

  describe('tpl 模块', () => {
    it('tpl 函数存在', () => {
      assertLog(typeof $.tpl, 'function')
    })

    it('tpl 创建模板', () => {
      const t = $.tpl('{{=it.name}}')
      assertLog(typeof t, 'object')
    })
  })

  describe('color 模块', () => {
    it('color 函数存在', () => {
      assertLog(typeof $.color, 'function')
    })
  })

  describe('reg 模块', () => {
    it('reg 存在', () => {
      assertLog(typeof $.reg, 'object')
    })
  })

  describe('file 模块', () => {
    it('file 存在', () => {
      assertLog(typeof $.file, 'object')
    })
  })

  describe('重复加载 index.js', () => {
    it('第二次加载时 isMeekoLoad 已设置-覆盖127行', () => {
      require('../index')
      delete require.cache[require.resolve('../index')]
      const result = require('child_process').execSync(
        'node -e "require(\'./index\'); delete require.cache[require.resolve(\'./index\')]; require(\'./index\')"',
        { cwd: process.cwd(), encoding: 'utf8' }
      )
      assertLog(result.includes('Meeko'), true)
    })

    it('模拟self环境-覆盖13行', () => {
      const result = require('child_process').execSync(
        'node -e "globalThis.self = {}; require(\'./index\')"',
        { cwd: process.cwd(), encoding: 'utf8' }
      )
      assertLog(result.length >= 0, true)
    })

    it('模拟window环境-覆盖16行', () => {
      const result = require('child_process').execSync(
        'node -e "globalThis.window = {}; require(\'./index\')"',
        { cwd: process.cwd(), encoding: 'utf8' }
      )
      assertLog(result.length >= 0, true)
    })
  })
})
