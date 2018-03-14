const assert = require('assert')
const EzID = require('../lib/ezid.js')
const replayer = require('replayer')

describe('EzID.get', () => {
  it('should return the metadata for a valid query', () => {
    return EzID.get('ark:/48907/f3zc8132').then(info => {
      assert.deepEqual(
        info,
        { id: 'ark:/48907/f3zc8132',
          _updated: '1477089288',
          _target: 'http://alexandria.ucsb.edu/lib/ark:/48907/f3zc8132',
          'erc.ark': 'ark:/48907/f3zc8132',
          _profile: 'erc',
          _export: 'yes',
          _owner: 'sb-adrl',
          _ownergroup: 'sb-library',
          'erc.who': 'Rogers, Carl R. (Carl Ransom), 1902-1987',
          _created: '1449066251',
          _status: 'public',
          'erc.what': 'Carl R. Rogers collection' }
      )
    })
  })
})
