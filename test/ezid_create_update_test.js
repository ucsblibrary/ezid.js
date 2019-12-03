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
      id: 'ark:/99999/fk4ucsb3',
      metadata: {
        'dc.title': 'test thing',
        '_profile': 'dc',
        '_status': 'reserved'
      }
    }

    const updated = {
      id: 'ark:/99999/fk4ucsb3',
      metadata: {
        'dc.title': 'real thing',
        '_profile': 'dc'
      }
    }

    return client.create(original).then(response => {
      assert.equal(response.id, original.id)

      return client.update(updated).then(response => {
        assert.equal(response.id, updated.id)

        return EzID.get(updated.id).then(info => {
          assert.deepEqual(
            info,
            {
              id: updated.id,
              metadata: Object.assign(
                updated.metadata, {
                  "_created": "1575417870",
                  "_export": "yes",
                  "_owner": "apitest",
                  "_ownergroup": "apitest",
                  "_status": "reserved",
                  "_target": "https://ezid.cdlib.org/id/ark:/99999/fk4ucsb3",
                  "_updated": "1575417870"
                }
              )
            }
          )
        })
      })
    })
  })

  it('should fail to update a nonexistent object', () => {
    const fake = {
      id: 'ark:/99999/fk4ucsbno',
      metadata: {
        'dc.title': 'fake thing',
        '_profile': 'dc'
      }
    }

    return client.update(fake).catch(err => {
      assert.equal(err.statusCode, '400')
    })
  })
})
