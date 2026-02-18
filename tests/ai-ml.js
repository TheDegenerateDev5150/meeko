'use strict'
const $ = require('../index')
const assert = require('assert')
const assertLog = function () {
  global.assertCount++
  return assert.strictEqual(...arguments)
}
describe('AI-ML模块测试', () => {
  describe('DecisionTree', () => {
    it('ID3算法决策树', () => {
      const data = [
        ['青绿', '蜷缩', '浊响', '清晰', '凹陷', '硬滑', '是'],
        ['乌黑', '蜷缩', '浊响', '清晰', '凹陷', '硬滑', '是'],
        ['乌黑', '蜷缩', '浊响', '清晰', '凹陷', '硬滑', '是'],
        ['青绿', '蜷缩', '浊响', '清晰', '凹陷', '硬滑', '是'],
        ['浅白', '蜷缩', '浊响', '清晰', '凹陷', '硬滑', '是'],
        ['青绿', '稍蜷', '浊响', '清晰', '稍凹', '软粘', '是'],
        ['乌黑', '稍蜷', '浊响', '稍糊', '稍凹', '软粘', '是'],
        ['乌黑', '稍蜷', '浊响', '清晰', '凹陷', '硬滑', '是'],
        ['乌黑', '稍蜷', '沉闷', '清晰', '凹陷', '硬滑', '否'],
        ['浅白', '硬挺', '清脆', '清晰', '平坦', '硬滑', '否'],
        ['浅白', '蜷缩', '浊响', '模糊', '平坦', '硬滑', '否'],
        ['浅白', '蜷缩', '沉闷', '模糊', '平坦', '硬滑', '否'],
        ['浅白', '稍蜷', '浊响', '稍糊', '凹陷', '软粘', '否'],
        ['浅白', '稍蜷', '浊响', '模糊', '平坦', '硬滑', '否'],
        ['乌黑', '稍蜷', '沉闷', '稍糊', '稍凹', '硬滑', '否'],
        ['浅白', '凹陷', '浊响', '模糊', '平坦', '硬滑', '否'],
        ['青绿', '蜷缩', '浊响', '模糊', '平坦', '硬滑', '否']
      ]
      const tag = ['色泽', '根蒂', '敲声', '纹理', '触感', '密度', '好瓜']
      const dt = new $.ml.DecisionTree(data, tag, 'ID3')
      assertLog(dt.tag.length, 7)
      assertLog(dt.algorithm, 'ID3')
    })

    it('C4.5算法决策树', () => {
      const data = [
        ['青绿', '蜷缩', '浊响', '清晰', '凹陷', '硬滑', '是'],
        ['乌黑', '蜷缩', '浊响', '清晰', '凹陷', '硬滑', '是'],
        ['青绿', '稍蜷', '浊响', '清晰', '稍凹', '软粘', '是'],
        ['乌黑', '稍蜷', '浊响', '稍糊', '稍凹', '软粘', '是'],
        ['乌黑', '稍蜷', '沉闷', '清晰', '凹陷', '硬滑', '否'],
        ['浅白', '硬挺', '清脆', '清晰', '平坦', '硬滑', '否'],
        ['浅白', '蜷缩', '浊响', '模糊', '平坦', '硬滑', '否']
      ]
      const tag = ['色泽', '根蒂', '敲声', '纹理', '触感', '密度', '好瓜']
      const dt = new $.ml.DecisionTree(data, tag, 'C4.5')
      assertLog(dt.algorithm, 'C4.5')
    })

    it('决策树打印', () => {
      const data = [
        ['青绿', '蜷缩', '浊响', '是'],
        ['乌黑', '蜷缩', '浊响', '是'],
        ['乌黑', '稍蜷', '沉闷', '否'],
        ['浅白', '硬挺', '清脆', '否']
      ]
      const tag = ['色泽', '根蒂', '敲声', '好瓜']
      const dt = new $.ml.DecisionTree(data, tag)
      dt.printTree()
      const treeObj = dt.toTreeObj()
      assertLog(typeof treeObj, 'object')
    })
  })

  describe('EigenvalueDecomposition (Evd)', () => {
    it('对称矩阵特征值分解', () => {
      const matrix = [
        [4, 2, 2],
        [2, 5, 1],
        [2, 1, 6]
      ]
      const evd = new $.ml.Evd(matrix)
      assertLog(Array.isArray(evd.realEigenvalues), true)
      assertLog(Array.isArray(evd.imaginaryEigenvalues), true)
      assertLog(evd.eigenvectorMatrix !== undefined, true)
      assertLog(evd.diagonalMatrix !== undefined, true)
    })

    it('非对称矩阵特征值分解', () => {
      const matrix = [
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 9]
      ]
      const evd = new $.ml.Evd(matrix)
      const realEigenvalues = evd.realEigenvalues
      assertLog(realEigenvalues.length, 3)
    })

    it('2x2矩阵特征值分解', () => {
      const matrix = [
        [1, 2],
        [3, 4]
      ]
      const evd = new $.ml.Evd(matrix)
      assertLog(evd.n, 2)
      assertLog(evd.realEigenvalues.length, 2)
    })

    it('假设对称矩阵', () => {
      const matrix = [
        [2, 1],
        [1, 2]
      ]
      const evd = new $.ml.Evd(matrix, { assumeSymmetric: true })
      assertLog(Array.isArray(evd.realEigenvalues), true)
    })

    it('错误输入 - 非方阵', () => {
      try {
        new $.ml.Evd([[1, 2], [3, 4], [5, 6]])
        throw new Error('should throw')
      } catch (e) {
        assertLog(e.message.includes('square'), true)
      }
    })

    it('错误输入 - 空矩阵', () => {
      try {
        new $.ml.Evd([])
        throw new Error('should throw')
      } catch (e) {
        assertLog(e.message.includes('Cannot read') || e.message.includes('non-empty'), true)
      }
    })
  })

  describe('PCA', () => {
    it('主成分分析', () => {
      const data = [
        [2.5, 2.4],
        [0.5, 0.7],
        [2.2, 2.9],
        [1.9, 2.2],
        [3.1, 3.0],
        [2.3, 2.7],
        [2, 1.6],
        [1, 1.1],
        [1.5, 1.6],
        [1.1, 0.9]
      ]
      const pca = new $.ml.Pca(data)
      assertLog(pca.mat.length > 0, true)
      assertLog(pca.mainFactorLen > 0, true)
      assertLog(Array.isArray(pca.u), true)
      assertLog(Array.isArray(pca.q), true)
      assertLog(Array.isArray(pca.v), true)
    })

    it('自定义阈值', () => {
      const data = [
        [2.5, 2.4, 1.0],
        [0.5, 0.7, 0.5],
        [2.2, 2.9, 1.2],
        [1.9, 2.2, 0.9],
        [3.1, 3.0, 1.5]
      ]
      const pca = new $.ml.Pca(data, 0.8)
      assertLog(typeof pca.mainFactorLen, 'number')
    })
  })

  describe('SVD', () => {
    it('奇异值分解基础', () => {
      const a = [
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 9],
        [10, 11, 12]
      ]
      const result = $.ml.Svd(a)
      assertLog(Array.isArray(result.u), true)
      assertLog(Array.isArray(result.q), true)
      assertLog(Array.isArray(result.v), true)
    })

    it('方阵SVD', () => {
      const a = [
        [1, 2],
        [3, 4]
      ]
      const result = $.ml.Svd(a)
      assertLog(result.q.length, 2)
    })

    it('禁用U和V', () => {
      const a = [
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 9]
      ]
      const resultNoU = $.ml.Svd(a, false, true)
      assertLog(Array.isArray(resultNoU.q), true)
      const resultNoV = $.ml.Svd(a, true, false)
      assertLog(Array.isArray(resultNoV.q), true)
    })

    it('自定义精度', () => {
      const a = [
        [1, 2],
        [3, 4]
      ]
      const result = $.ml.Svd(a, true, true, 1e-48, 1e-60)
      assertLog(result.q.length, 2)
    })

    it('错误输入 - 空矩阵', () => {
      try {
        $.ml.Svd(null)
        throw new Error('should throw')
      } catch (e) {
        assertLog(e.message.includes('not defined'), true)
      }
    })

    it('错误输入 - m < n', () => {
      try {
        $.ml.Svd([[1, 2, 3, 4], [5, 6, 7, 8]])
        throw new Error('should throw')
      } catch (e) {
        assertLog(e.message.includes('m < n'), true)
      }
    })
  })

  describe('ML Util', () => {
    it('zScoreNorm 标准化', () => {
      const data = [
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 9]
      ]
      const result = $.ml.util.zScoreNorm(data)
      assertLog(result.length, 3)
    })

    it('minMaxNorm 归一化', () => {
      const data = [
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 9]
      ]
      const result = $.ml.util.minMaxNorm(data)
      assertLog(result.length, 3)
    })

    it('minMaxScale', () => {
      const data = [
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 9]
      ]
      const result = $.ml.util.minMaxScale(data)
      assertLog(result.length, 3)
    })

    it('none 函数', () => {
      const data = [[1, 2, 3]]
      const result = $.ml.util.none(data)
      assertLog(result, data)
    })

    it('meanStandard 均值中心化', () => {
      const data = [
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 9]
      ]
      const result = $.ml.util.meanStandard(data)
      assertLog(result.meanMat.length, 3)
      assertLog(result.meanArr.length, 3)
    })

    it('infoEntropy 信息熵', () => {
      const arr = ['a', 'b', 'a', 'a', 'b', 'c']
      const entropy = $.ml.util.infoEntropy(arr)
      assertLog(typeof entropy, 'number')
      assertLog(entropy > 0, true)
    })

    it('mahalanobis 马氏距离 - 全部', () => {
      const data = [
        [1, 2],
        [2, 3],
        [3, 3],
        [2, 1]
      ]
      const result = $.ml.util.mahalanobis(data)
      assertLog(Array.isArray(result), true)
    })

    it('mahalanobis 单点', () => {
      const data = [
        [1, 2],
        [2, 3],
        [3, 3],
        [2, 1]
      ]
      const result = $.ml.util.mahalanobis(data, 1)
      assertLog(Array.isArray(result), true)
    })

    it('mahalanobis 两点', () => {
      const data = [
        [1, 2],
        [2, 3],
        [3, 3],
        [2, 1]
      ]
      const result = $.ml.util.mahalanobis(data, 2, 0, 1)
      assertLog(typeof result, 'number')
    })

    it('ConfusionMatrix 混淆矩阵', () => {
      const cm = new $.ml.util.ConfusionMatrix(['A', 'B', 'A', 'A', 'B'])
      assertLog(cm.dimNum, 2)
      const matrix = cm.getMatrix()
      assertLog(matrix !== undefined, true)
    })

    it('ConfusionMatrix getKappa', () => {
      const cm = new $.ml.util.ConfusionMatrix(['A', 'B', 'A', 'A', 'B', 'C'])
      cm.addCountByKey('A', 'A', 10)
      cm.addCountByKey('A', 'B', 2)
      cm.addCountByKey('B', 'A', 3)
      cm.addCountByKey('B', 'B', 8)
      const kappa = cm.getKappa()
      assertLog(typeof kappa.k, 'number')
    })

    it('ConfusionMatrix addCountByKey 错误', () => {
      const cm = new $.ml.util.ConfusionMatrix(['A', 'B'])
      try {
        cm.addCountByKey('X', 'A', 1)
        throw new Error('should throw')
      } catch (e) {
        assertLog(e.message.includes('标签未定义'), true)
      }
    })

    it('cov 协方差矩阵', () => {
      const data = [
        [1, 2, 3],
        [4, 5, 6]
      ]
      const result = $.ml.util.cov(data)
      assertLog(result.length > 0, true)
    })
  })

  describe('peridForecast', () => {
    it('周期预测', () => {
      const y = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]
      const forecast = $.ml.peridForecast(y, 7, 7)
      assertLog(forecast.forecast.length > 0, true)
      assertLog(forecast.oriLen, 15)
      assertLog(forecast.nextPoint, 7)
      assertLog(forecast.peridNum, 7)
      assertLog(Array.isArray(forecast.anormalIndex), true)
      assertLog(Array.isArray(forecast.yModArr), true)
      assertLog(forecast.trend.a !== undefined, true)
    })

    it('不同周期参数', () => {
      const y = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
      const forecast = $.ml.peridForecast(y, 5, 3)
      assertLog(forecast.peridNum, 5)
      assertLog(forecast.nextPoint, 3)
    })
  })
})
