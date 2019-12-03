const conf = require('../../config/ezid.json')
const fetch = require('node-fetch')
const serialize = require('../serialize.js')

/**
 * @param {{ id: string, metadata: Object }} options
 * @returns {Promise}
 */
module.exports = async function (options) {
  const identifier = options.id.replace(/^ark:\//, '')
  const query = this.makeQuery({ method: 'PUT', metadata: options.metadata })
  const url = `${conf.endpoint}/id/ark:/${identifier}`

  const response = await fetch(url, query)
  return serialize.string(await response.text())
}
