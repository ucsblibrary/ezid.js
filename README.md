# EzID.js — API client library for Node.js

This JavaScript library provides a simple asynchronous interface to the [EzID API
(v2)](https://ezid.cdlib.org/doc/apidoc.html)

## Example usage:

```js
const EzID = require('./lib/ezid.js')
const client = new EzID ({ username: 'apitest', password: 'guess', shoulder: 'ark:/99999/fk4' })

client.createOrUpdate(
  { id: 'ark:/99999/fk4honk',
    metadata: {
      '_status': 'reserved',
      'erc.who': "nobody"
    }
  }).then(res => {
    // does not require authentication
    EzID.get(res.id)
      .then(info => { return console.log(info) })

      .catch(err => {
        return console.log(`${err.statusCode}: ${err.statusMessage}`)
      })
  })

  .catch(err => {
    console.log(err)
  })
```

```js
client.delete('ark:/99999/fk4honk')
  .then(res => {
    console.log(`deleted ${res.id}`)
  })
```

## Developing

### Testing

Tests use [replayer](https://github.com/aneilbaboo/replayer) to play back HTTP requests.
Use `VCR_MODE=playback npm test` to use existing fixtures, and `VCR_MODE=record
npm test` to record new ones.  For tests requiring authentication, set the
environment variable `EZID_PASS` to the EzID test API password.
