const metadata = require('./metadata.js')

// @param hash [Object] metadata hash for sending to EzID
// @param profile [String]
// @return [Object] hash stripped of invalid and readonly fields
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
