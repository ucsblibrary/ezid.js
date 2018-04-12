const got = require('got')
const serialize = require('./serialize.js')
const util = require('util')

/**
 * @param {String} url
 * @param {Object} options Header hash from {@link EzID#makeQuery}
 * @returns {Promise}
 */
module.exports = function (url, options) {
  return new Promise((resolve, reject) => {
    return got(url, options).then(response => {
      let parsed
      try {
        parsed = serialize.string(response.body)
      } catch (e) {
        return reject(e)
      }
      return resolve(parsed)

    }).catch(err => {
      return reject(err)
    })
  })
}
