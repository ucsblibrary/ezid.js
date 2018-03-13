const assert = require('assert')
const fs = require('fs')
const parse = require('../lib/parse.js')

describe('parse', () => {
  it('should correctly parse an ERC response', () => {
    const expected = {
      id: 'ark:/48907/f31g0m45',
      '_updated': '1477084593',
      '_target': 'http://alexandria.ucsb.edu/lib/ark:/48907/f31g0m45',
      'erc.ark': 'ark:/48907/f31g0m45',
      'erc.when': '[circa 1965-1999]',
      '_export': 'yes',
      '_owner': 'sb-adrl',
      '_ownergroup': 'sb-library',
      '_profile': 'erc',
      'erc.who': 'McPeak, Ronald H.',
      '_created': '1462310276',
      '_status': 'public',
      'erc.what': 'Giant kelp forest'
    }

    const file = fs.readFileSync(`${__dirname}/fixtures/erc.txt`).toString()

    assert.deepEqual(parse(file), expected)
  })

  it('should correctly parse a DublinCore response', () => {
  })

  it('should correctly parse a DataCite response', () => {
  })
})
