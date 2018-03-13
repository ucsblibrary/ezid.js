const assert = require('assert')
const fs = require('fs')
const serialize = require('../lib/serialize.js')

const hash = {
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

describe('serialize.in', () => {
  it('should correctly parse an ERC response', () => {
    const file = fs.readFileSync(`${__dirname}/fixtures/erc.txt`).toString()

    assert.deepEqual(serialize.in(file), hash)
  })

  it('should correctly serialize an ERC request body', () => {
    const file = fs.readFileSync(`${__dirname}/fixtures/erc.txt`).toString()

    assert.deepEqual(serialize.out(hash), file.replace(/^success.*/, ''))
  })

  it('should correctly parse a DublinCore response', () => {
  })

  it('should correctly parse a DataCite response', () => {
  })
})
