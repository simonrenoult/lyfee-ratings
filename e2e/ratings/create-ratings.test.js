const requester = require('../helpers').requester
const fixtures = require('./fixtures')

describe('POST /ratings', () => {
  it('returns 201', () => {
    return requester
      .post('/ratings')
      .send(fixtures.rating())
      .expect(201)
  })
  it('returns the resource location', () => {
    return requester
      .post('/ratings')
      .send(fixtures.rating())
      .expect('Location', /\/ratings\/.+/)
  })
})
