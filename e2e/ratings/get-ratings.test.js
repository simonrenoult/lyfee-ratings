const expect = require('chai').expect
const requester = require('../helpers').requester
const fixtures = require('./fixtures')

describe('GET /ratings', () => {
  it('returns 200', () => {
    return requester.get('/ratings').expect(200)
  })

  context('when the collection is empty', () => {
    before(() => requester.delete('/ratings'))

    it('returns an empty array', () => {
      return requester.get('/ratings').expect(res => {
        expect(res.body).to.deep.equal([])
      })
    })
  })

  context('when the collection contains elements', () => {
    const rating = fixtures.rating()

    before(() => requester.post('/ratings').send(rating))

    it('returns the list of ratings', () => {
      return requester
        .get('/ratings')
        .expect(res => {
          expect(res.body).to.have.length.above(0)
        })
    })
  })
})
