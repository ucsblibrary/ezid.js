// @param input [String]
// @return [Object]
module.exports = function (input) {
  const hash = {}

  input.trim().split('\n').forEach(line => {
    const [key, value] = line.split(': ')
    const cleanKey = (key === 'success' ? 'id' : key)

    hash[cleanKey] = value
  })

  return hash
}
