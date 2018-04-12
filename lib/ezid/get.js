const conf = require('../../config/ezid.json')
const got = require('got')
const pingPromise = require('../ping_promise.js')
const serialize = require('../serialize.js')
const util = require('util')

/**
 * @param {string} id
 * @returns {Promise}
 */
module.exports = function (id) {
  const identifier = id.replace(/^ark:\//, '')
  const url = `${conf.endpoint}/id/ark:/${identifier}`

  return pingPromise(url, {})
}
