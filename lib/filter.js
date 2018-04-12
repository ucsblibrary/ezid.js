const metadata = require('./metadata.js')

/**
 * Takes a metadata hash and returns a copy stripped of invalid and readonly fields
 * @param {Object} hash Metadata for sending to EzID
 * @param {String} profile
 * @returns {Object}
 */
module.exports = function (hash, profile) {
  const prof = profile || hash['_profile']

  const filtered = {}

  Object.keys(hash).forEach(key => {
    const isReadOnly = Object.keys(metadata.internal).some(value => {
      return value === key &&
        metadata.internal[key].writeable === false
    })

    if (isReadOnly)
      return

    const isProfileField = metadata[prof].some(value => {
      return value === key
    })

    const isInternalField = Object.keys(metadata.internal).some(value => {
      return value === key
    })

    if (!isProfileField && !isInternalField)
      return

    filtered[key] = hash[key]
  })

  return filtered
}
