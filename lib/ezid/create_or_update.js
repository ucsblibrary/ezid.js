const conf = require('../../config/ezid.json')
const pingPromise = require('../ping_promise.js')
const util = require('util')

// @param metadata [Object] hash parseable by {serialize.out}
// @return [Promise]
module.exports = function (options) {
  const identifier = options.id.replace(/^ark:\//, '')
  const query = this.makeQuery({ method: 'PUT', metadata: options })
  const url = `${conf.endpoint}/id/ark:/${identifier}?update_if_exists=yes`

  return pingPromise(url, query)
}
