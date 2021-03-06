const assert = require('assert')
const fs = require('fs')
const serialize = require('../lib/serialize.js')

const datacite = {
  id: 'ark:/99999/fk4bg3w58x',
  metadata: {
    _updated: '1521050852',
    _profile: 'datacite',
    'datacite.title': 'god',
    _export: 'yes',
    'datacite.creator': 'nobody',
    _owner: 'apitest',
    _ownergroup: 'apitest',
    _target: 'https://ezid.cdlib.org/id/ark:/99999/fk4bg3w58x',
    _created: '1521050852',
    'datacite.publicationyear': '0',
    _status: 'public'
  }
}

const dc = {
  id: 'ark:/99999/fk4g74m02z',
  metadata: {
    _updated: '1521050568',
    _target: 'https://ezid.cdlib.org/id/ark:/99999/fk4g74m02z',
    _profile: 'dc',
    _export: 'yes',
    _owner: 'apitest',
    'dc.creator': 'myself',
    _ownergroup: 'apitest',
    _created: '1521050568',
    _status: 'public',
    'dc.title': 'me'
  }
}

const erc = {
  id: 'ark:/48907/f31g0m45',
  metadata: {
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
}

describe('serialize.string', () => {
  it('should correctly parse an ERC response', () => {
    const file = fs.readFileSync(`${__dirname}/fixtures/erc.txt`)
          .toString()
          .trim()

    assert.deepEqual(serialize.string(file), erc)
  })

  it('should correctly serialize an ERC request body', () => {
    const file = fs.readFileSync(`${__dirname}/fixtures/erc.txt`)
          .toString()
          .replace(/^success.*/, '')
          .trim()

    assert.deepEqual(serialize.hash(erc), file)
  })

  it('should correctly parse a DublinCore response', () => {
    const file = fs.readFileSync(`${__dirname}/fixtures/dc.txt`)
          .toString()
          .trim()

    assert.deepEqual(serialize.string(file), dc)
  })

  it('should correctly serialize a DublinCore request body', () => {
    const file = fs.readFileSync(`${__dirname}/fixtures/dc.txt`)
          .toString()
          .replace(/^success.*/, '')
          .trim()

    assert.deepEqual(serialize.hash(dc), file)
  })

  it('should correctly parse a DataCite response', () => {
    const file = fs.readFileSync(`${__dirname}/fixtures/datacite.txt`)
          .toString()
          .trim()

    assert.deepEqual(serialize.string(file), datacite)
  })

  it('should correctly serialize a DataCite request body using a complex hash', () => {
    const file = fs.readFileSync(`${__dirname}/fixtures/datacite.txt`)
          .toString()
          .replace(/^success.*/, '')
          .trim()

    assert.deepEqual(serialize.hash(datacite), file)
  })

  it('should correctly serialize a DataCite request body using a simple hash', () => {
    const file = fs.readFileSync(`${__dirname}/fixtures/datacite.txt`)
          .toString()
          .replace(/^success.*/, '')
          .trim()

    assert.deepEqual(serialize.hash(datacite.metadata), file)
  })
})
