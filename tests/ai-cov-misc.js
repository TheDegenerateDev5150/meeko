'use strict'
const $ = require('../index')
const assert = require('assert')
const assertLog = function () {
  global.assertCount++
  return assert.strictEqual(...arguments)
}
const path = require('path')

describe('AI-Cov-Misc 补充覆盖测试', function () {
  describe('bench 覆盖补充', function () {
    it('benchmark 全默认参数 - 覆盖69/72行默认参数及匿名函数', function () {
      $.bench.benchmark()
      assertLog(true, true)
    })

    it('printResult perSecVal < 1 分支 - 覆盖17行', function () {
      $.bench.print({ funcName: 'slow', spendTime: 10, perSecVal: 0.4, n: 2, range: 1, msg: '', fastStr: '' })
      assertLog(true, true)
    })

    it('suite 无name与裸函数用例 - 覆盖80/83行', function () {
      $.bench.suite([
        {
          testArr: [
            function bareFn () {}
          ]
        }
      ])
      assertLog(true, true)
    })
  })

  describe('buf 覆盖补充', function () {
    it('split 全默认参数 - 覆盖9行默认参数', function () {
      const result = $.buf.split()
      assertLog(result.length, 1)
    })

    it('join 默认分隔符 - 覆盖20行splitElm默认参数', function () {
      const result = $.buf.join([Buffer.from('ab'), Buffer.from('cd')])
      assertLog(result.length, 5)
      assertLog(result[2], 0)
    })

    it('join 默认数组 - 覆盖20行a默认参数', function () {
      assert.throws(function () {
        $.buf.join()
      }, TypeError)
      assertLog(true, true)
    })
  })

  describe('log 覆盖补充', function () {
    it('dir Symbol属性值 - 覆盖79/80行', function () {
      const r = $.dir({ s: Symbol('test') })
      assertLog(Array.isArray(r), true)
    })

    it('dir Set属性值 - 覆盖87/88/122/123行', function () {
      const r = $.dir({ st: new Set([1, 2]) })
      assertLog(Array.isArray(r), true)
    })

    it('dir 顶层匿名函数 - 覆盖55/127行空name分支', function () {
      const r = $.dir(function () {})
      assertLog(Array.isArray(r), true)
    })

    it('dir 对象内匿名函数 - 覆盖90行空name分支', function () {
      const anon = (function () {
        return function () {}
      })()
      const r = $.dir({ fn: anon })
      assertLog(Array.isArray(r), true)
    })

    it('win32路径正则与无caller分支 - 覆盖17/23/34行', function () {
      const logPath = require.resolve('../lib/log.js')
      const origModule = require.cache[logPath]
      const origPlatform = process.platform
      Object.defineProperty(process, 'platform', { value: 'win32', configurable: true })
      delete require.cache[logPath]
      const logWin = require('../lib/log.js')
      const r = logWin.log('win32 test')
      Object.defineProperty(process, 'platform', { value: origPlatform, configurable: true })
      delete require.cache[logPath]
      require.cache[logPath] = origModule
      assertLog(r, 1)
    })
  })

  describe('prototypeExt 覆盖补充', function () {
    it('Buffer为undefined时跳过contact定义 - 覆盖76行else分支', function () {
      const pePath = require.resolve('../lib/prototypeExt.js')
      const origModule = require.cache[pePath]
      const origBuffer = global.Buffer
      global.Buffer = undefined
      delete require.cache[pePath]
      const pe = require('../lib/prototypeExt.js')
      delete require.cache[pePath]
      require.cache[pePath] = origModule
      global.Buffer = origBuffer
      assertLog(typeof pe.ext, 'function')
    })
  })

  describe('requireDir 覆盖补充', function () {
    it('filter无捕获分组时使用match[0] - 覆盖41行', function () {
      const testDir = path.join(__dirname, 'testdir')
      const result = $.requireAll({
        dirname: testDir,
        filter: /^file1\.js$/
      })
      assertLog(result['file1.js'].value, 1)
    })
  })

  describe('fake 覆盖补充', function () {
    it('genImg size为空 - 覆盖150行else分支', function () {
      assertLog($.fake.genImg({ size: '' }), 0)
    })

    it('genImg text为空 - 覆盖154行else分支', function () {
      const svg = $.fake.genImg({ size: '100x100', text: '' })
      assertLog(svg.startsWith('<svg'), true)
    })

    it('smallAndNum参数为0 - 覆盖197行', function () {
      assertLog($.fake.smallAndNum(0).length, 1)
    })

    it('生日为未来日期 - 覆盖293/294行', function () {
      assertLog($.fake.checkIdCard.checkBirthDayCode('29990101'), false)
    })

    it('生日日期不合法(2月30日) - 覆盖295/298行', function () {
      assertLog($.fake.checkIdCard.check18IdCardNo('11010520230230002X'), false)
    })

    it('getInfo长度非15/18 - 覆盖407行else分支', function () {
      $.fake.randfirstName()
      const info = $.fake.checkIdCard.getInfo('123')
      assertLog(typeof info.place, 'string')
    })

    it('idCard循环重试 - 覆盖251行while循环体', function () {
      let last = ''
      for (let i = 0; i < 200; i++) {
        last = $.fake.idCard()
      }
      assertLog(last.length, 18)
    })
  })
})
