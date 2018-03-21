const assert = require('assert')
const filter = require('../lib/filter.js')

describe('filter', () => {
  it('should remove unwanted key/values', () => {
    const messy = {
      id: 3,
      '_ownergroup': 'sb-ucsb',
      '_status': 'reserved',
      'erc.who': 'a cat',
      'dc.title': 'puss in boots'
    }

    assert.deepEqual(
      filter(messy, 'erc'),
      {
        '_status': 'reserved',
        'erc.who': 'a cat'
      }
    )

    assert.deepEqual(
      filter(Object.assign({ _profile: 'erc' }, messy)),
      {
        '_profile': 'erc',
        '_status': 'reserved',
        'erc.who': 'a cat'
      }
    )
  })
})
