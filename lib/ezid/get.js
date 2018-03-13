const conf = require('../../config/ezid.json')
const parse = require('../parse.js')
const request = require('request')
const util = require('util')

// @return [Promise]
module.exports = function (id) {
  const identifier = id.replace(/^ark:\//, '')
  const url = `${conf.endpoint}/id/ark:/${identifier}`

  const options = { url: url }
  if (this.username && this.password) {
    Object.assign(options, {
      auth: {
        user: this.username,
        pass: this.password
      }
    })
  }

  return new Promise ((resolve, reject) => {
    request(options, (err, response, body) => {
      if (err)
        return reject(err)

      let parsed
      try {
        parsed = parse(body)
      } catch (e) {
        reject(e)
      }

      return resolve(parsed)
    })
  })
}
