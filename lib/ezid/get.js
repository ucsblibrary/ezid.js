const conf = require('../../config/ezid.json')
const got = require('got')
const serialize = require('../serialize.js')
const util = require('util')

// @return [Promise]
module.exports = function (id) {
  const identifier = id.replace(/^ark:\//, '')
  const options = {}

  if (this.username && this.password) {
    Object.assign(options, {
      auth: `${this.username}:${this.password}`
    })
  }

  return new Promise ((resolve, reject) => {
    got.get(`${conf.endpoint}/id/ark:/${identifier}`, options)
      .catch(err => {
        return reject(err)
      })
      .then(response => {
        let parsed
        try {
          parsed = serialize.in(response.body)
        } catch (e) {
          reject(e)
        }

        return resolve(parsed)
      })
  })
}
