const expect = require('chai').expect
const fixtures = require('../fixtures')
const RatingsMemoryStore = require('../../src/repositories/ratings-memory-repository')

describe('RatingsMemoryStore', () => {
  beforeEach(() => {
    RatingsMemoryStore.removeAll()
  })

  describe('.insert(rating)', () => {
    it('adds an element to the store', () => {
      // When
      RatingsMemoryStore.insert(fixtures.rating())

      // Then
      const ratings = RatingsMemoryStore.findAll()
      expect(ratings).to.have.length(1)
    })
  })

  describe('.findAll()', () => {
    it('returns the list of ratings', () => {
      // Given
      RatingsMemoryStore.insert(fixtures.rating())

      // When
      const ratings = RatingsMemoryStore.findAll()

      // Then
      expect(ratings).to.have.length(1)
    })
  })

  describe('.find()', () => {
    it('returns the list of ratings', () => {
      // Given
      const rating = Object.assign({}, fixtures.rating(), {id: 'fakeId'})
      RatingsMemoryStore.insert(rating)

      // When
      const foundRating = RatingsMemoryStore.find(rating.id)

      // Then
      expect(rating).to.deep.equal(foundRating)
    })
  })

  describe('.removeAll()', () => {
    it('removes all the ratings from the store', () => {
      // Given
      RatingsMemoryStore.insert(fixtures.rating())

      // When
      RatingsMemoryStore.removeAll()

      // Then
      const ratings = RatingsMemoryStore.findAll()
      expect(ratings).to.have.length(0)
    })
  })

  describe('.remove(id)', () => {
    it('removes the selected rating from the store', () => {
      // Given
      const rating = Object.assign({}, fixtures.rating(), {id: 'fakeId'})
      RatingsMemoryStore.insert(rating)

      // When
      RatingsMemoryStore.remove(rating.id)

      // Then
      const ratings = RatingsMemoryStore.findAll()
      expect(ratings).to.have.length(0)
    })
  })

  describe('.update(id)', () => {
    it('updates the selected rating', () => {
      // Given
      const rating = Object.assign({}, fixtures.rating(), {id: 'fakeId'})
      RatingsMemoryStore.insert(rating)

      // When
      RatingsMemoryStore.update('fakeId', {type: 'fakeType'})

      // Then
      const foundRating = RatingsMemoryStore.find('fakeId')
      expect(foundRating).to.have.property('type', 'fakeType')
    })

    it('can\'t update its own id', () => {
      // Given
      const rating = Object.assign({}, fixtures.rating(), {id: 'fakeId'})
      RatingsMemoryStore.insert(rating)

      // When
      RatingsMemoryStore.update('fakeId', {id: 'newFakeId'})

      // Then
      const foundRating = RatingsMemoryStore.find('fakeId')
      expect(foundRating).to.have.property('id', 'fakeId')
    })
  })
})
