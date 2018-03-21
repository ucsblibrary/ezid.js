const validator = require('validator')

module.exports = {
  // @param input [String]
  // @return [Object]
  string: function  (input) {
    const hash = {
      metadata: {}
    }

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

  // @param hash [Object]
  // @return [String]
  hash: function (hash) {
    const metadata = hash.metadata || hash

    return Object.keys(metadata).map(key => {
      return `${validator.stripLow(key)}: ${validator.stripLow(metadata[key])}`
    }).join('\n')
  }
}
