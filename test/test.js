const path = require('path')
const {expect} = require('chai')
const {directoryTree} = require('../lib/directory-tree')
const testDir = `${process.cwd()}${path.sep}test${path.sep}src`

describe('fs-directory-tree', () => {    
  it('should always return an object', async () => {
    const tree = await directoryTree(testDir)
    expect(tree).to.be.an('object')    
  })

  it(`should always return an object even if the directory doesn't exist`, async () => {
    const noDir = await directoryTree('./notexists')
    expect({noDir}).to.be.an('object')
  })  
})
