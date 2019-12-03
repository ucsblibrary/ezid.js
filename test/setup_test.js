const replayer = require('replayer')

replayer.fixtureDir(`${__dirname}/fixtures/replayer/`)
replayer.configure({
  verbose: false
})
replayer.substitute('blorp', () => {
  return Buffer.from(`apitest:${process.env.EZID_PASS}`).toString('base64')
})
