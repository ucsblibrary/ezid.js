const assert = require('assert')
const EzID = require('../lib/ezid.js')

const client = new EzID(
  { username: 'apitest',
    password: process.env.EZID_PASS,
    shoulder: 'ark:/99999/fk4' }
)

describe('EzID#create and #delete', () => {
  it('should successfully create an ARK with the specified ID, then delete it', () => {
    const ark = {
      id: 'ark:/99999/fk4ucsb0',
      metadata: {
        'dc.title': 'test thing',
        '_profile': 'dc',
        '_status': 'reserved'
      }
    }

    return client.create(ark).then(response => {
      assert.deepEqual(
        response,
        { id: ark.id,
          metadata: {} }
      )

      return client.delete(ark.id).then(response => {
        assert.equal(response.id, 'ark:/99999/fk4ucsb0')
      })
    })
  })

  it('should fail to delete a nonexistent object', () => {
    return client.delete('ark:/99999/fk4ucsbno').catch(err => {
      assert.equal(err.statusCode, '400')
    })
  })
})
