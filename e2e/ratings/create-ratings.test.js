const requester = require('../helpers').requester

describe('POST /ratings', () => {
  it('returns 201', () => {
    return requester
      .post('/ratings')
      .expect(201)
  })
  it('returns the resource location', () => {
    return requester
      .post('/ratings')
      .expect('Location', /\/ratings\/.+/)
  })
})
