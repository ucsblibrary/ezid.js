const conf = require('../../config/ezid.json')
const fetch = require('node-fetch')
const serialize = require('../serialize.js')

/**
 * @param {string} id
 * @returns {Promise}
 */
module.exports = async function (id) {
  const encodedAuth = Buffer.from(`${this.username}:${this.password}`).toString('base64')
  const options = {
    headers: {
      'Authorization': `Basic ${encodedAuth}`,
    },
    method: 'DELETE'
  }

  const identifier = id.replace(/^ark:\//, '')

  const response = await fetch(`${conf.endpoint}/id/ark:/${identifier}`, options)
  return serialize.string(await response.text())
}
