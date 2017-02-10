const requester = require('../helpers').requester
const fixtures = require('./fixtures')

describe('DELETE /ratings/:id', () => {
  context('when the rating does not exist', () => {
    it('returns 404', () => {
      return requester.delete('/ratings/missing').expect(404)
    })
  })

  context('when the rating exists', () => {
    let location
    const rating = fixtures.rating()

    before(() => requester.post('/ratings').send(rating).then(res => {
      location = res.headers['location']
    }))

    after(() => requester.delete('/ratings'))

    it('returns 204', () => {
      return requester.delete(location).expect(204)
    })
  })
})
