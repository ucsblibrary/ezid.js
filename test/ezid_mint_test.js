const assert = require('assert')
const EzID = require('../lib/ezid.js')

const client = new EzID(
  { username: 'apitest',
    password: process.env.EZID_PASS,
    shoulder: 'ark:/99999/fk4' }
)

describe('EzID#mint', () => {
  it('should successfully mint an ARK', () => {
    const metadata = {
      '_profile': 'dc',
      'dc.title': 'test thing'
    }

    return client.mint(metadata).then(response => {
      assert.deepEqual(
        response,
        { id: 'ark:/99999/fk4ns1zt12' }
      )
    })
  })
})
