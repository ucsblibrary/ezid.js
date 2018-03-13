const conf = require('../../config/ezid.json')
const got = require('got')
const serialize = require('../serialize.js')
const util = require('util')

// @param metadata [Object] hash parseable by {serialize.out}
// @return [Promise]
module.exports = function (metadata) {
  const options = {
    auth: `${this.username}:${this.password}`,
    body: serialize.out(metadata),
    headers: {
      'Content-Type': 'text/plain'
    }
  }

  return new Promise((resolve, reject) => {
    got.post(`${conf.endpoint}/shoulder/${this.shoulder}`, options)
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
