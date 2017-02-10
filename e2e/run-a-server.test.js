const requester = require('./helpers').requester
const pkg = require('../package')

describe('GET /', () => {
  it('returns 200', () => {
    return requester
      .get('/')
      .expect(200)
  })
})
