const conf = require('../../config/ezid.json')
const fetch = require('node-fetch')
const serialize = require('../serialize.js')

/**
 * @param {Object} options Metadata hash
 * @returns {Promise}
 */
module.exports = async function (options) {
  const query = this.makeQuery({ method: 'POST', metadata: options })
  const url = `${conf.endpoint}/shoulder/${this.shoulder}`

  const response = await fetch(url, query)
  return serialize.string(await response.text())
}
