const requester = require('./helpers').requester

describe('GET /', () => {
  it('returns 200', () => {
    return requester
      .get('/')
      .expect(200)
  })
  it('returns "Hello Lyfeee"', () => {
    return requester
      .get('/')
      .expect('Hello Lyfeee')
  })
})
