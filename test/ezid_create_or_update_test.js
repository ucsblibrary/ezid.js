const assert = require('assert')
const EzID = require('../lib/ezid.js')

const client = new EzID(
  { username: 'apitest',
    password: process.env.EZID_PASS,
    shoulder: 'ark:/99999/fk4' }
)

const original = {
  id: 'ark:/99999/fk4ucsbt0',
  metadata: {
    'dc.title': 'test thing',
    '_profile': 'dc'
  }
}

const updated = {
  id: 'ark:/99999/fk4ucsbt0',
  metadata: {
    'dc.title': 'real thing',
    'dc.publisher': 'real deal',
    '_profile': 'dc'
  }
}

describe('EzID#createOrUpdate', () => {
  it('should successfully create an ARK, then update it', () => {
    return client.createOrUpdate(original).then(response => {
      assert.equal(response.id, original.id)

      return client.createOrUpdate(updated).then(response => {
        assert.equal(response.id, updated.id)

        return EzID.get(updated.id).then(info => {
          assert.deepEqual(
            info,
            {
              id: updated.id,
              metadata: Object.assign(
                updated.metadata, {
                  "_created": "1521068520",
                  "_export": "yes",
                  "_owner": "apitest",
                  "_ownergroup": "apitest",
                  "_status": "public",
                  "_target": "https://ezid.cdlib.org/id/ark:/99999/fk4ucsbt0",
                  "_updated": "1521739840"
                }
              )
            })
        })
      })
    })
  })
})
