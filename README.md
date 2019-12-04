# EzID.js — API client library for Node.js

This JavaScript library provides a simple asynchronous interface to the [EzID API
(v2)](https://ezid.cdlib.org/doc/apidoc.html)

*Current supports only ARK methods; DOI is not yet supported.*

```
npm install ezid
```

## API Reference

The asynchronous functions all return [Promises](https://developers.google.com/web/fundamentals/primers/promises).

### `EzID` class

The `EzID` class is used to store credentials in order to avoid
providing them with each request.

```js
const EzID = require('ezid')
const client = new EzID ({ username: 'apitest', password: 'guess', shoulder: 'ark:/99999/fk4' })
```

### `EzID.get`

*Upstream documentation: <https://ezid.cdlib.org/doc/apidoc.html#operation-get-identifier-metadata>*

This is a static function, since fetching metadata for an ARK does not
require authentication.

```js
EzID.get('ark:/48907/f3kd1xg1').then(res => {
  console.log(res)
})
```

Example output:
```js
{ metadata:
   { _updated: '1477087454',
     _target: 'http://alexandria.ucsb.edu/lib/ark:/48907/f3kd1xg1',
     'erc.ark': 'ark:/48907/f3kd1xg1',
     'erc.when': '1910-1920',
     _export: 'yes',
     _owner: 'sb-adrl',
     _ownergroup: 'sb-library',
     _profile: 'erc',
     'erc.who': 'London, Arthur, 1880-1920',
     _created: '1460677598',
     _status: 'public',
     'erc.what': 'Arthur London / Gold Coast [Ghana] photograph collection' },
  id: 'ark:/48907/f3kd1xg1' }
```

### `EzID#mint`

*Requires authentication.*

*Upstream documentation: <https://ezid.cdlib.org/doc/apidoc.html#operation-mint-identifier>*

The `mint` function creates an ARK with the specified metadata and an
ID decided by the upstream EzID service.

```js
const meta = {
  '_profile': 'erc',
  'erc.who': 'a bird'
}

client.mint(meta).then(res => {
  return console.log(res)
}).catch(err => {
  console.error(err)
})
```

Example output:
```js
{ metadata: {}, id: 'ark:/99999/fk4mp67k1v' }
```

The HTTP response from EzID will include only the new ARK, not the
metadata provided; the empty `metadata` hash returned by `mint` does
not mean that the ARK was not minted correctly.

### `Ezid#create`

*Requires authentication.*

*Upstream documentation: <https://ezid.cdlib.org/doc/apidoc.html#operation-create-identifier>*

The `create` function creates an ARK with the specified metadata and ID.

```js
const obj = {
  id: 'ark:/99999/fk4/ucsbcreate',
  metadata: {
    '_profile': 'erc',
    'erc.who': 'a bird'
  }
}

client.create(obj).then(res => {
  return console.log(res)
}).catch(err => {
  console.error(err)
})
```

Example output:
```js
{ metadata: {}, id: 'ark:/99999/fk4/ucsbcreate' }
```

The HTTP response from EzID will include only the new ARK, not the
metadata provided; the empty `metadata` hash returned by `create` does
not mean that the ARK was not minted correctly.

### `Ezid#update`

*Requires authentication.*

*Upstream documentation: <https://ezid.cdlib.org/doc/apidoc.html#operation-update-identifier>*

The `update` function modifies the metadata of an existing ARK.  Using
a nonexisting ARK for the `id` will return an error.

```js
const obj = {
  id: 'ark:/99999/fk4/ucsbcreate',
  metadata: {
    '_profile': 'erc',
    'erc.who': '',
    'erc.what': 'an example for the readme'
  }
}

client.update(obj).then(res => {
  return console.log(res)
}).catch(err => {
  console.error(err)
})
```

Example output:
```js
{ metadata: {}, id: 'ark:/99999/fk4/ucsbcreate' }
```

The HTTP response from EzID will include only the ARK, not the updated
metadata; the empty `metadata` hash returned by `update` does not mean
that the ARK was not minted correctly.

### `Ezid#createOrUpdate`

*Requires authentication.*

*Upstream documentation: <https://ezid.cdlib.org/doc/apidoc.html#operation-create-or-update-identifier>*

The `createOrUpdate` function *either* modifies the metadata of an existing
ARK, *or*, if that ARK does not exist, creates it with the specified metadata.

```js
const obj = {
  id: 'ark:/99999/fk4/ucsbcreate',
  metadata: {
    '_profile': 'erc',
    'erc.who': '',
    'erc.what': 'an example for the readme'
  }
}

client.update(obj).then(res => {
  return console.log(res)
}).catch(err => {
  console.error(err)
})
```

Example output:
```js
{ metadata: {}, id: 'ark:/99999/fk4/ucsbcreate' }
```

The HTTP response from EzID will include only the ARK, not the
metadata; the empty `metadata` hash returned by `createOrUpdate` does
not mean that the ARK was not minted correctly.

### `Ezid#delete`

*Requires authentication.*

*Upstream documentation: <https://ezid.cdlib.org/doc/apidoc.html#operation-delete-identifier>*

The `delete` function deletes an existing ARK owned by the
authenticating user.  ARKs can *only* be deleted when their `_status`
is set to `reserved`.

```js
// an object created with { '_status': 'reserved' }
client.delete('ark:/99999/fk4/ucsbres').then(res => {
  return console.log(res)
}).catch(err => {
  console.error(err)
})
```

Example output:
```js
{ metadata: {}, id: 'ark:/99999/fk4/ucsbres' }
```

## Developing

### Testing

Tests use [replayer](https://github.com/aneilbaboo/replayer) to play back HTTP requests.
Use `VCR_MODE=playback npm test` to use existing fixtures, and `VCR_MODE=record
npm test` to record new ones.  For tests requiring authentication, set the
environment variable `EZID_PASS` to the EzID test API password.
