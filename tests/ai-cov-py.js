'use strict'
const $ = require('../index')
const assert = require('assert')
const assertLog = function () {
  global.assertCount++
  return assert.strictEqual(...arguments)
}

describe('coverage: np default args', () => {
  it('np.linspace uses default num=50 and endpoint=true', () => {
    const r = $.math.np.linspace(0, 1)
    assertLog(r.length, 50)
    assertLog(r[0], 0)
  })
})

describe('coverage: stats default args', () => {
  it('stats.bernoulli.rsv defaults p=0.5 size=1', () => {
    assertLog($.math.stats.bernoulli.rsv().length, 1)
  })
  it('stats.bernoulli.pmf defaults a=[] p=0.5', () => {
    assertLog($.math.stats.bernoulli.pmf().join(','), '')
    assertLog($.math.stats.bernoulli.pmf([1, 0]).join(','), '0.5,0.5')
  })
  it('stats.bernoulli.cdf defaults a=[] p=0.5', () => {
    assertLog($.math.stats.bernoulli.cdf().join(','), '')
    assertLog($.math.stats.bernoulli.cdf([0]).join(','), '0.5')
  })
  it('stats.binom.rsv defaults n=1 p=0.5 size=1', () => {
    assertLog($.math.stats.binom.rsv().length, 1)
  })
  it('stats.binom.pmf default a=[]', () => {
    assertLog($.math.stats.binom.pmf().join(','), '')
  })
  it('stats.binom.pmf p===0 branch', () => {
    assertLog($.math.stats.binom.pmf([0, 1], 5, 0).join(','), '1,0')
  })
  it('stats.binom.pmf p===1 branch', () => {
    assertLog($.math.stats.binom.pmf([5, 0], 5, 1).join(','), '1,0')
  })
  it('stats.geom.rsv defaults p=0.5 size=1', () => {
    assertLog($.math.stats.geom.rsv().length, 1)
  })
  it('stats.geom.pmf defaults a=[] p=0.5', () => {
    assertLog($.math.stats.geom.pmf().join(','), '')
    assertLog($.math.stats.geom.pmf([1]).join(','), '0.5')
  })
  it('stats.geom.pmf x<=0 branch', () => {
    assertLog($.math.stats.geom.pmf([0, -1], 0.5).join(','), '0,0')
  })
  it('stats.geom.cdf defaults a=[] p=0.5', () => {
    assertLog($.math.stats.geom.cdf().join(','), '')
    assertLog($.math.stats.geom.cdf([1]).join(','), '0.5')
  })
  it('stats.poisson.rsv default size=1', () => {
    assertLog($.math.stats.poisson.rsv(2).length, 1)
  })
  it('stats.poisson.pmf defaults a=[] mu=1', () => {
    assertLog($.math.stats.poisson.pmf().join(','), '')
    assertLog($.math.stats.poisson.pmf([0]).join(','), '0.36787944117144233')
  })
  it('stats.poisson.cdf defaults a=[] mu=1', () => {
    assertLog($.math.stats.poisson.cdf().join(','), '')
    assertLog($.math.stats.poisson.cdf([0]).join(','), '0.36787944117144233')
  })
  it('stats.norm.rsv defaults mu=0 sigma=1 size=1', () => {
    assertLog($.math.stats.norm.rsv().length, 1)
  })
  it('stats.norm.pdf default a=[]', () => {
    assertLog($.math.stats.norm.pdf().join(','), '')
  })
  it('stats.norm.cdf defaults a=[] mu=0 sigma=1', () => {
    assertLog($.math.stats.norm.cdf().join(','), '')
    assertLog($.math.stats.norm.cdf([0]).join(','), '0.5')
  })
})

describe('coverage: Knn default args', () => {
  it('knn.set uses default k=3 algorithm=euclidean', () => {
    const knn = new $.ml.Knn()
    knn.set([[1, 2], [10, 10], [1, 3]], ['a', 'b', 'a'])
    assertLog(knn.k, 3)
    assertLog(knn.algorithm, 'euclidean')
    assertLog(knn.predict([1, 2]).result.tag, 'a')
  })
})

describe('coverage: index.js getGlobal branch', () => {
  it('getGlobal browser env branch (global undefined)', () => {
    const realGlobal = global
    const g = global.global
    try {
      realGlobal.global = undefined
      delete require.cache[require.resolve('../index.js')]
      // getGlobal returns undefined, later code throws TypeError
      assert.throws(() => require('../index.js'), TypeError)
      realGlobal.assertCount++
    } finally {
      realGlobal.global = g
      delete require.cache[require.resolve('../index.js')]
      require('../index.js') // restore cache for other tests
    }
  })
})
