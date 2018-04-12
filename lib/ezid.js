const serialize = require('./serialize.js')
const filter = require('./filter.js')

/**
 * @constructor
 * @property {{ username: string, password: string, shoulder: string }} options
 */
function EzID (options) {
  this.username = options.username
  this.password = options.password
  this.shoulder = options.shoulder
}

/**
 * @param {{ metadata: Object, method, string }} options
 * @returns {Object} hash object to be passed as headers to the HTTP library
 */
EzID.prototype.makeQuery = function (options) {
  return {
    auth: `${this.username}:${this.password}`,
    body: serialize.hash(filter(options.metadata)),
    headers: {
      'Content-Type': 'text/plain'
    },
    method: options.method
  }
}

EzID.prototype.get = require('./ezid/get.js')
// also make it a static method since it doesn't require authentication
EzID.get = require('./ezid/get.js')

EzID.prototype.mint = require('./ezid/mint.js')
EzID.prototype.create = require('./ezid/create.js')
EzID.prototype.update = require('./ezid/update.js')
EzID.prototype.createOrUpdate = require('./ezid/create_or_update.js')
EzID.prototype.delete = require('./ezid/delete.js')

module.exports = EzID
