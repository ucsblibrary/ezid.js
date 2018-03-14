const assert = require('assert')
const EzID = require('../lib/ezid.js')

const client = new EzID(
  { username: 'apitest',
    password: process.env.EZID_PASS,
    shoulder: 'ark:/99999/fk4' }
)

describe('EzID#create and #delete', () => {
  it('should successfully create an ARK with the specified ID, then delete it', () => {
    const metadata = {
      'dc.title': 'test thing',
      id: 'ark:/99999/fk4ucsbt',
      '_profile': 'dc',
      '_status': 'reserved'
    }

    return client.create(metadata).then(response => {
      assert.equal(response.id, 'ark:/99999/fk4ucsbt')

      return client.delete(metadata.id).then(response => {
        assert.equal(response.id, 'ark:/99999/fk4ucsbt')
      })
    })
  })

  it('should fail to delete a nonexistent object', () => {
    return client.delete('ark:/99999/fk4ucsbno').catch(err => {
      assert.equal(err.statusCode, '400')
    })
  })
})
