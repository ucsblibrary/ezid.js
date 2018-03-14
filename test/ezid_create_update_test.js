const assert = require('assert')
const EzID = require('../lib/ezid.js')

const client = new EzID(
  { username: 'apitest',
    password: process.env.EZID_PASS,
    shoulder: 'ark:/99999/fk4' }
)

describe('EzID#create, #update', () => {
  it('should successfully create an ARK, then update it', () => {
    const original = {
      'dc.title': 'test thing',
      id: 'ark:/99999/fk4ucsbt1',
      '_profile': 'dc'
    }

    const updated = {
      'dc.title': 'real thing',
      id: 'ark:/99999/fk4ucsbt1',
      '_profile': 'dc'
    }

    return client.create(original).then(response => {
      assert.equal(response.id, original.id)

      return client.update(updated).then(response => {
        assert.equal(response.id, updated.id)

        return EzID.get(updated.id).then(info => {
          assert.deepEqual(
            info,
            Object.assign(
              updated, {
                "_created": "1521068994",
                "_export": "yes",
                "_owner": "apitest",
                "_ownergroup": "apitest",
                "_status": "public",
                "_target": "https://ezid.cdlib.org/id/ark:/99999/fk4ucsbt1",
                "_updated": "1521068994"
              }
            )
          )
        })
      })
    })
  })

  it('should fail to update a nonexistent object', () => {
    const fake = {
      'dc.title': 'fake thing',
      id: 'ark:/99999/fk4ucsbno',
      '_profile': 'dc'
    }

    return client.update(fake).catch(err => {
      assert.equal(err.statusCode, '400')
    })
  })
})
