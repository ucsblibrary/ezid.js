// @param options [Object]
// @option options [String] username
// @option options [String] password
function EzID (options) {
  this.username = options.username
  this.password = options.password
}

EzID.prototype.get = require('./ezid/get.js')
// EzID.prototype.mint = require('./ezid/mint.js')
// EzID.prototype.create = require('./ezid/create.js')
// EzID.prototype.update = require('./ezid/update.js')
// EzID.prototype.createOrUpdate = require('./ezid/create_or_update.js')
// EzID.prototype.delete = require('./ezid/delete.js')

module.exports = EzID
