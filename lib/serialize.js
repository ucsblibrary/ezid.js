const validator = require('validator')

module.exports = {
  /**
   * Transform a string in the EzID body format (@see {@link https://ezid.cdlib.org/doc/apidoc.html#request-response-bodies}) into a hash
   * @param {String} input
   * @returns {Object}
   */
  string: function (input) {
    const hash = {
      metadata: {}
    }

    // if ((typeof input) === 'object')
    //   console.dir(input)

    input.trim().split('\n').forEach(line => {
      const [key, value] = line.split(': ')

      if (key === 'success') {
        hash.id = validator.stripLow(value)
      } else {
        hash.metadata[validator.stripLow(key)] = validator.stripLow(value)
      }
    })

    return hash
  },

  /**
   * Transform a metadata hash into a string in the EzID body format (@see {@link https://ezid.cdlib.org/doc/apidoc.html#request-response-bodies}) into a hash
   * @param {Object} hash
   * @returns {String}
   */
  hash: function (hash) {
    const metadata = hash.metadata || hash

    return Object.keys(metadata).map(key => {
      return `${validator.stripLow(key)}: ${validator.stripLow(metadata[key])}`
    }).join('\n')
  }
}
