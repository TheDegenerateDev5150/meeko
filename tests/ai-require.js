'use strict'
const $ = require('../index')
const assert = require('assert')
const path = require('path')
const assertLog = function () {
  global.assertCount++
  return assert.strictEqual(...arguments)
}

describe('AI-Require测试', function () {
  describe('requireAll 动态加载', function () {
    it('requireAll 函数存在', function () {
      assertLog(typeof $.requireAll, 'function')
    })

    it('requireAll 读取目录结构', function () {
      const testDir = path.join(__dirname, 'testdir')
      const result = $.requireAll({ dirname: testDir })
      assertLog(typeof result, 'object')
      assertLog(typeof result.file1, 'object')
      assertLog(result.file1.value, 1)
    })

    it('requireAll 读取子目录-覆盖60行', function () {
      const testDir = path.join(__dirname, 'testdir')
      const result = $.requireAll({ dirname: testDir })
      assertLog(typeof result.subdir, 'object')
      assertLog(result.subdir.file2.value, 2)
    })

    it('requireAll 使用filter函数', function () {
      const testDir = path.join(__dirname, 'testdir')
      const result = $.requireAll({
        dirname: testDir,
        filter: function (filename) {
          if (filename === 'file1.js') return 'customName'
          return false
        }
      })
      assertLog(typeof result.customName, 'object')
      assertLog(result.customName.value, 1)
    })

    it('requireAll filter正则-覆盖41行', function () {
      const testDir = path.join(__dirname, 'testdir')
      const result = $.requireAll({
        dirname: testDir,
        filter: /file(\d+)\.js$/
      })
      assertLog(typeof result['1'], 'object')
      assertLog(result['1'].value, 1)
    })

    it('requireAll 使用map函数', function () {
      const testDir = path.join(__dirname, 'testdir')
      const result = $.requireAll({
        dirname: testDir,
        map: function (name, filepath) {
          return name + '_mapped'
        }
      })
      assertLog(typeof result.file1_mapped, 'object')
    })

    it('requireAll 使用resolve函数', function () {
      const testDir = path.join(__dirname, 'testdir')
      const result = $.requireAll({
        dirname: testDir,
        resolve: function (mod) {
          return mod.value * 10
        }
      })
      assertLog(result.file1, 10)
    })

    it('requireAll 空目录返回空对象', function () {
      const emptyDir = path.join(__dirname, 'emptydir')
      const result = $.requireAll({ dirname: emptyDir })
      assertLog(typeof result, 'object')
      assertLog(Object.keys(result).length, 0)
    })
  })
})
