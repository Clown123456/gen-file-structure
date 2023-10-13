const path = require('path')
const { generate } = require('../src/index')
describe('test', () => {
  it('generate  file no config', () => {
    generate({
      out: "./name.md"
    })
  })

})