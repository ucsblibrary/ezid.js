const conf = require('../../config/ezid.json')
const pingPromise = require('../ping_promise.js')

// @param metadata [Object] hash parseable by {serialize.hash}
// @return [Promise]
module.exports = function (options) {
  // delete options.id
  const query = this.makeQuery({ method: 'POST', metadata: options })
  const url = `${conf.endpoint}/shoulder/${this.shoulder}`

  return pingPromise(url, query)
}
