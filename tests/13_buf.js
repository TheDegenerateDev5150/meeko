'use strict'
const $ = require('../index')
const assert = require('assert')
const assertLog = function () {
  global.assertCount++
  return assert.strictEqual(...arguments)
}

const rr = Buffer.from([0x20, 0x0, 0x59, 0x67, 0xff, 0x1, 0x0, 0x11, 0x45, 0x0])
const arr = $.buf.split(rr, $.buf.zero)

describe('buffer扩展', function () {
  it('buffer按字符split', function () {
    assertLog(arr[1][2], 255)
  })
  it('bufferArray按字符join', function () {
    const buf = $.buf.join(arr, $.buf.zero)
    assertLog(buf[7], 0x11)
  })
  it('buffer split - 无分隔符场景', function () {
    const buf = Buffer.from([1, 2, 3, 4, 5])
    const result = $.buf.split(buf, Buffer.from([0xff]))
    assertLog(result.length, 1)
    assertLog(result[0].length, 5)
  })
  it('buffer split - 空数组', function () {
    const result = $.buf.split([], $.buf.zero)
    assertLog(result.length, 1)
    assertLog(result[0].length, 0)
  })
  it('buffer split - 多个分隔符', function () {
    const buf = Buffer.from([1, 0, 2, 0, 3])
    const result = $.buf.split(buf, $.buf.zero)
    assertLog(result.length, 3)
    assertLog(result[0][0], 1)
    assertLog(result[1][0], 2)
    assertLog(result[2][0], 3)
  })
})
