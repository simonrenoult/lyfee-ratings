const requester = require('../helpers').requester
const fixtures = require('./fixtures')

describe('GET /ratings/:id', () => {
  context('when the rating does not exist', () => {
    it('returns 404', () => {
      return requester.get('/ratings/missing').expect(404)
    })
  })

  context('when the rating exists', () => {
    let location, id
    const rating = fixtures.rating()

    before(() => requester.post('/ratings').send(rating).then(res => {
      location = res.headers['location']
      id = location.match(/\/ratings\/(.+)/)[1]
    }))

    it('returns 200', () => {
      return requester.get(location).expect(200)
    })

    it('returns the correct rating', () => {
      return requester.get(location).expect(Object.assign(rating, {id}))
    })
  })
})
