'use strict'
const $ = require('../index')
const assert = require('assert')
const assertLog = function () {
  global.assertCount++
  return assert.strictEqual(...arguments)
}

describe('AI-MathMatrix测试', function () {
  const { mat } = $.math

  describe('矩阵基本操作', function () {
    it('deepCopy 深拷贝', function () {
      const m = [[1, 2], [3, 4]]
      const copy = mat.deepCopy(m)
      copy[0][0] = 100
      assertLog(m[0][0], 1)
    })

    it('isSquare 方阵判断', function () {
      assertLog(mat.isSquare([[1, 2], [3, 4]]), true)
      assertLog(mat.isSquare([[1, 2, 3], [4, 5, 6]]), false)
    })

    it('add 矩阵加法', function () {
      const result = mat.add([[1, 2], [3, 4]], [[5, 6], [7, 8]])
      assertLog(result[0][0], 6)
    })

    it('add 向量加法-覆盖85-86行', function () {
      const result = mat.add([1, 2, 3], [4, 5, 6])
      assertLog(result[0], 5)
      assertLog(result[1], 7)
      assertLog(result[2], 9)
    })

    it('sub 矩阵减法', function () {
      const result = mat.sub([[5, 6], [7, 8]], [[1, 2], [3, 4]])
      assertLog(result[0][0], 4)
    })

    it('sub 向量减法-覆盖119-120行', function () {
      const result = mat.sub([5, 6, 7], [1, 2, 3])
      assertLog(result[0], 4)
      assertLog(result[1], 4)
      assertLog(result[2], 4)
    })

    it('scalar 数乘', function () {
      const result = mat.scalar([[1, 2], [3, 4]], 2)
      assertLog(result[0][0], 2)
    })

    it('mul 矩阵乘法', function () {
      const result = mat.mul([[1, 2], [3, 4]], [[5, 6], [7, 8]])
      assertLog(result[0][0], 19)
    })

    it('transpose 转置', function () {
      const result = mat.transpose([[1, 2], [3, 4]])
      assertLog(result[1][0], 2)
    })

    it('zero 零矩阵', function () {
      const result = mat.zero(3, 3)
      assertLog(result[2][2], 0)
    })

    it('ones 全1矩阵', function () {
      const result = mat.ones(2, 2)
      assertLog(result[0][0], 1)
    })

    it('eye 单位矩阵', function () {
      const result = mat.eye(3)
      assertLog(result[1][1], 1)
      assertLog(result[0][1], 0)
    })

    it('identity 单位矩阵', function () {
      const result = mat.identity(3)
      assertLog(result[1][1], 1)
    })

    it('det 行列式', function () {
      const result = mat.det([[1, 2], [3, 4]])
      assertLog(result, -2)
    })

    it('det 1x1矩阵-覆盖304行', function () {
      const result = mat.det([[5]])
      assertLog(result, 5)
    })

    it('inv 逆矩阵', function () {
      const result = mat.inv([[4, 7], [2, 6]])
      assertLog(result[0][0], 0.6)
    })

    it('solve 解方程', function () {
      const result = mat.solve([[1, 1], [1, -1]], [[3], [1]])
      assertLog(result[0][0], 1)
      assertLog(result[1][0], 0)
    })

    it('getCol 获取列', function () {
      const result = mat.getCol([[1, 2], [3, 4]], 0)
      assertLog(result[0], 1)
    })

    it('map 映射', function () {
      const result = mat.map([[1, 2], [3, 4]], function (v) { return v * 2 })
      assertLog(result[0][0], 2)
    })

    it('abs 绝对值', function () {
      const result = mat.abs([[-1, 2], [-3, 4]])
      assertLog(result[0][0], 1)
    })

    it('sqrt 平方根', function () {
      const result = mat.sqrt([[4, 9]])
      assertLog(result[0][0], 2)
    })

    it('round 四舍五入', function () {
      const result = mat.round([[1.5, 2.5]])
      assertLog(result[0][0], 2)
    })

    it('floor 向下取整', function () {
      const result = mat.floor([[1.9, 2.1]])
      assertLog(result[0][0], 1)
    })

    it('ceil 向上取整', function () {
      const result = mat.ceil([[1.1, 1.9]])
      assertLog(result[0][1], 2)
    })

    it('mod 取模', function () {
      const result = mat.mod([[10, 7]], 3)
      assertLog(result[0][0], 1)
    })

    it('div 除法', function () {
      const result = mat.div([[6, 8]], 2)
      assertLog(result[0][0], 3)
    })

    it('isSymmetric 对称矩阵', function () {
      assertLog(mat.isSymmetric([[1, 2], [2, 1]]), true)
      assertLog(mat.isSymmetric([[1, 2], [3, 4]]), false)
    })

    it('isSymmetric 非方阵-覆盖531行', function () {
      assertLog(mat.isSymmetric([[1, 2, 3], [4, 5, 6]]), false)
    })

    it('rowSwitch 行交换', function () {
      const result = mat.rowSwitch([[1, 2], [3, 4]], 0, 1)
      assertLog(result[0][0], 3)
    })

    it('rowSwitch 行交换 - 不交换行-覆盖518行', function () {
      const result = mat.rowSwitch([[1, 2, 3], [4, 5, 6], [7, 8, 9]], 0, 2)
      assertLog(result[1][0], 4)
      assertLog(result[1][1], 5)
      assertLog(result[1][2], 6)
    })

    it('cos 余弦', function () {
      const result = mat.cos([[0]])
      assertLog(result[0][0], 1)
    })

    it('sin 正弦', function () {
      const result = mat.sin([[0]])
      assertLog(result[0][0], 0)
    })

    it('exp 指数', function () {
      const result = mat.exp([[1]])
      assertLog(result[0][0] > 2, true)
    })

    it('log 对数', function () {
      const result = mat.log([[Math.E]])
      assertLog(result[0][0] > 0.99, true)
    })

    it('sign 符号函数', function () {
      const result = mat.sign([[-5, 0, 5]])
      assertLog(result[0][0], -1)
      assertLog(result[0][2], 1)
    })

    it('trunc 截断', function () {
      const result = mat.trunc([[1.9]])
      assertLog(result[0][0], 1)
    })

    it('cbrt 立方根', function () {
      const result = mat.cbrt([[8]])
      assertLog(result[0][0], 2)
    })

    it('cosh 双曲余弦', function () {
      const result = mat.cosh([[0]])
      assertLog(result[0][0], 1)
    })

    it('sinh 双曲正弦', function () {
      const result = mat.sinh([[0]])
      assertLog(result[0][0], 0)
    })

    it('inv 奇异矩阵-覆盖351行', function () {
      const result = mat.inv([[0, 0], [0, 0]])
      assertLog(Array.isArray(result), true)
    })

    it('不同维度-单行矩阵', function () {
      const result = mat.add([[1, 2, 3]], [[4, 5, 6]])
      assertLog(result[0][0], 5)
    })

    it('不同维度-单列矩阵', function () {
      const result = mat.transpose([[1], [2], [3]])
      assertLog(result[0][0], 1)
      assertLog(result[0][1], 2)
      assertLog(result[0][2], 3)
    })

    it('不同维度-非方阵乘法', function () {
      const result = mat.mul([[1, 2, 3]], [[1], [2], [3]])
      assertLog(result[0][0], 14)
    })

    it('不同维度-1x1矩阵', function () {
      const result = mat.inv([[4]])
      assertLog(result[0][0], 0.25)
    })

    it('dot 点积', function () {
      const result = mat.dot([1, 2], [3, 4])
      assertLog(result, 11)
    })

    it('deepCopy 输入不是数组-覆盖31行', function () {
      try {
        mat.deepCopy('not array')
        assertLog(false, true)
      } catch (e) {
        assertLog(e.message.includes('输入必须是矩阵'), true)
      }
    })

    it('deepCopy 输入是向量-覆盖33行', function () {
      try {
        mat.deepCopy([1, 2, 3])
        assertLog(false, true)
      } catch (e) {
        assertLog(e.message.includes('输入不能是向量'), true)
      }
    })

    it('isSquare 输入不是数组-覆盖53行', function () {
      try {
        mat.isSquare('not array')
        assertLog(false, true)
      } catch (e) {
        assertLog(e.message.includes('输出必须是矩阵'), true)
      }
    })

    it('isSquare 输入是向量-覆盖55行', function () {
      try {
        mat.isSquare([1, 2, 3])
        assertLog(false, true)
      } catch (e) {
        assertLog(e.message.includes('输入不是向量'), true)
      }
    })

    it('add 矩阵维度不匹配-覆盖78行', function () {
      try {
        mat.add([[1, 2]], [[1, 2, 3]])
        assertLog(false, true)
      } catch (e) {
        assertLog(e.message.includes('矩阵维度不匹配'), true)
      }
    })

    it('sub 矩阵维度不匹配-覆盖111行', function () {
      try {
        mat.sub([[1, 2]], [[1, 2, 3]])
        assertLog(false, true)
      } catch (e) {
        assertLog(e.message.includes('矩阵维度不匹配'), true)
      }
    })

    it('dot 向量长度不匹配-覆盖245行', function () {
      try {
        mat.dot([1, 2], [1])
        assertLog(false, true)
      } catch (e) {
        assertLog(e.message.includes('向量不匹配'), true)
      }
    })

    it('mul 矩阵维度不匹配-覆盖266行', function () {
      try {
        mat.mul([[1, 2]], [[1, 2]])
        assertLog(false, true)
      } catch (e) {
        assertLog(e.message.includes('矩阵维度不匹配'), true)
      }
    })

    it('det 不是方阵-覆盖300行', function () {
      try {
        mat.det([[1, 2, 3]])
        assertLog(false, true)
      } catch (e) {
        assertLog(e.message.includes('方形的') || e.message.includes('NOT_SQUARE'), true)
      }
    })

    it('inv 不是方阵-覆盖397行', function () {
      try {
        mat.inv([[1, 2, 3]])
        assertLog(false, true)
      } catch (e) {
        assertLog(e.message.includes('方形的') || e.message.includes('NOT_SQUARE'), true)
      }
    })

    it('lupDecomposition 非方阵-覆盖567行', function () {
      try {
        mat.lupDecomposition([[1, 2, 3], [4, 5, 6]])
        assertLog(false, true)
      } catch (e) {
        assertLog(e.message.includes('ERROR_MATRIX_NOT_SQUARE'), true)
      }
    })

    it('getCol n<0-覆盖431行', function () {
      try {
        mat.getCol([[1, 2], [3, 4]], -1)
        assertLog(false, true)
      } catch (e) {
        assertLog(e.message.includes('需要正数'), true)
      }
    })

    it('getCol n超出范围-覆盖433行', function () {
      try {
        mat.getCol([[1, 2], [3, 4]], 5)
        assertLog(false, true)
      } catch (e) {
        assertLog(e.message.includes('0 and columns - 1'), true)
      }
    })

    it('zero 维度为0-覆盖452行', function () {
      try {
        mat.zero(0)
        assertLog(false, true)
      } catch (e) {
        assertLog(e.message.includes('矩阵维度必须为正数'), true)
      }
    })
  })
})
