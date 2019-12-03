const conf = require('../../config/ezid.json')
const fetch = require('node-fetch')
const serialize = require('../serialize.js')

/**
 * @param {string} id
 * @returns {Promise}
 */
module.exports = async function (id) {
  const identifier = id.replace(/^ark:\//, '')
  const url = `${conf.endpoint}/id/ark:/${identifier}`

  const response = await fetch(url, {})
  return serialize.string(await response.text())
}
