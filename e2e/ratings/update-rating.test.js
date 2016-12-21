const requester = require('../helpers').requester
const fixtures = require('./fixtures')

describe('PUT /ratings/:id', () => {
  context('when the rating does not exist', () => {
    it('returns 404', () => {
      return requester.put('/ratings/missing').expect(404)
    })
  })

  context('when the rating already exists', () => {
    let id, location
    const rating = fixtures.rating()

    before(() => requester.post('/ratings').send(rating).then(res => {
      location = res.headers.location
      id = location.match(/\/ratings\/(.+)/)[1]
    }))

    it('returns 204', () => {
      return requester.put(location).expect(204)
    })

    it('returns the resource location', () => {
      return requester.put(location).expect('Location', /\/ratings\/.+/)
    })

    it('updates the rating', () => {
      return requester
        .put(location)
        .send(Object.assign(rating, {name: 'Morts'}))
        .then(res => {
          return requester
            .get(location)
            .expect(Object.assign(rating, {name: 'Morts'}, {id}))
        })
    })
  })
})
