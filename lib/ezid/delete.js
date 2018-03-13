const conf = require('../../config/ezid.json')
const pingPromise = require('../ping_promise.js')

// @param metadata [Object] hash parseable by {serialize.out}
// @return [Promise]
module.exports = function (id) {
  const identifier = id.replace(/^ark:\//, '')
  const options = {
    auth: `${this.username}:${this.password}`,
    method: 'DELETE'
  }
  const url = `${conf.endpoint}/id/ark:/${identifier}`

  return pingPromise(url, options)
}
