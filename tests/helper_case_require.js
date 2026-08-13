'use strict'
const $ = require('../index')

const tc = new $.tools.TestCase({
  t1: async () => {
    console.log('t1 run')
  }
})
module.exports = tc
