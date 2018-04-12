const conf = require('../../config/ezid.json')
const pingPromise = require('../ping_promise.js')

/**
 * @param {{ id: string, metadata: Object }} options
 * @returns {Promise}
 */
module.exports = function (options) {
  const identifier = options.id.replace(/^ark:\//, '')
  const query = this.makeQuery({ method: 'POST', metadata: options.metadata })
  const url = `${conf.endpoint}/id/ark:/${identifier}`

  return pingPromise(url, query)
}
