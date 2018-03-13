const got = require('got')
const serialize = require('./serialize.js')
const util = require('util')

module.exports = function (url, options) {
  return new Promise((resolve, reject) => {
    return got(url, options).then(response => {
      let parsed
      try {
        parsed = serialize.in(response.body)
      } catch (e) {
        return reject(e)
      }
      return resolve(parsed)

    }).catch(err => {
      return reject(err)
    })
  })
}
