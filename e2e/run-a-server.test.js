const requester = require('./helpers').requester
const pkg = require('../package')

describe('GET /', () => {
  it('returns 200', () => {
    return requester
      .get('/')
      .expect(200)
  })
  it('returns "<pkg-name>:<pkg-version>"', () => {
    return requester
      .get('/')
      .expect(`${pkg.name}:${pkg.version}`)
  })
})
