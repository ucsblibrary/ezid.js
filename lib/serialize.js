module.exports = {
  // @param input [String]
  // @return [Object]
  in: function  (input) {
    const hash = {}

    input.trim().split('\n').forEach(line => {
      const [key, value] = line.split(': ')
      const cleanKey = (key === 'success' ? 'id' : key)

      hash[cleanKey] = value
    })

    return hash
  },

  // @param hash [Object]
  // @return [String]
  out: function (hash) {
    return Object.keys(hash).map(key => {
      // the id is the URI we're POSTing to, so it's not part of the request
      // body
      if (key === 'id')
        return ''

      return `${key}: ${hash[key]}`
    }).join('\n') + '\n'
  }
}
