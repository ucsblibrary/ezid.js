const assert = require('assert')
const EzID = require('../lib/ezid.js')

const client = new EzID(
  { username: 'apitest',
    password: process.env.EZID_PASS,
    shoulder: 'ark:/99999/fk4' }
)

describe('EzID#mint', () => {
  it('should successfully mint an ARK', () => {
    const obj = {
      id: 'ark:/99999/fk45156s6s',
      metadata: {}

    }

    return client.mint(obj.metadata).then(response => {
      assert.deepEqual(response, obj)
    })
  })
})
