const replayer = require('replayer')

replayer.fixtureDir(`${__dirname}/fixtures/replayer/`)
replayer.configure({
  verbose: false
})
replayer.substitute(':blorp@', () => {
  return `:${process.env.EZID_PASS}@`
})
