'use strict'
const $ = require('../index')

const tc = new $.tools.TestCase({
  test1: async () => {
    console.log('test1 run')
  },
  test2: async () => {
    console.log('test2 run')
  }
})
