const conf = require('../../config/ezid.json')
const pingPromise = require('../ping_promise.js')
const util = require('util')

/**
 * @param {{ id: string, metadata: Object }} options
 * @returns {Promise}
 */
module.exports = function (options) {
  const identifier = options.id.replace(/^ark:\//, '')
  const query = this.makeQuery({ method: 'PUT', metadata: options.metadata })
  const url = `${conf.endpoint}/id/ark:/${identifier}?update_if_exists=yes`

  return pingPromise(url, query)
}
