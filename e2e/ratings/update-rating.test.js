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

    context('when the field rating is missing', () => {
      const rating = fixtures.rating()
      delete rating.rating
      it('returns 400', () => {
        return requester
          .put(location)
          .send(rating)
          .expect(400)
      })
    })

    context('when the field name is missing', () => {
      const rating = fixtures.rating()
      delete rating.name
      it('returns 400', () => {
        return requester
          .put(location)
          .send(rating)
          .expect(400)
      })
    })

    context('when the field type is missing', () => {
      const rating = fixtures.rating()
      delete rating.type
      it('returns 400', () => {
        return requester
          .put(location)
          .send(rating)
          .expect(400)
      })
    })

    it('returns 204', () => {
      const rating = fixtures.rating()
      return requester
        .put(location)
        .send(rating)
        .expect(204)
    })

    it('returns the resource location', () => {
      const rating = fixtures.rating()
      return requester
        .put(location)
        .send(rating)
        .expect('Location', /\/ratings\/.+/)
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
