const expect = require('chai').expect
const fixtures = require('./fixtures')
const { requester } = require('../helpers')

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
    after(() => requester.delete('/ratings'))

    it('returns the list of ratings', () => {
      return requester
        .get('/ratings')
        .expect(res => {
          expect(res.body).to.have.length.above(0)
        })
    })
  })

  describe('filters', () => {
    const book = fixtures.rating()
    const movie1 = fixtures.rating('movies')
    const movie2 = fixtures.rating('movies')

    before(() => requester.post('/ratings').send(book))
    before(() => requester.post('/ratings').send(movie1))
    before(() => requester.post('/ratings').send(movie2))
    after(() => requester.delete('/ratings'))

    it('works', () => {
      return requester
        .get('/ratings?type=books')
        .expect(res => {
          expect(res.body).to.have.length(1)
        })
    })
  })
})
