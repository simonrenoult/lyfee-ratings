const sinon = require('sinon')
const assert = require('assert')
const chai = require('chai')
const fixtures = require('./fixtures')

const ratingService = require('../src/ratings-domain-service')
const expect = chai.expect

describe('RatingsDomainService', () => {
  describe('.findAll(:filters)', () => {
    it('calls repository.findAll()', () => {
      const repository = {findAll () {}}
      const stub = sinon.stub(repository, 'findAll')
      stub.returns([])

      // When
      ratingService(repository).findAll()

      // Then
      sinon.assert.calledOnce(stub)
    })
    it('returns repository.findAll(:id, :data)', () => {
      // Given
      const repository = {findAll () { return ['fakeResult'] }}

      // When
      const actual = ratingService(repository).findAll()

      // Then
      assert.deepEqual(actual, ['fakeResult'])
    })
    it('applies filter on field "type"', () => {
      // Given
      const repository = {findAll () { return [{type: 'movies'}, {type: 'books'}] }}
      const filters = {type: 'books'}

      // When
      const actual = ratingService(repository).findAll(filters)

      // Then
      assert.equal(actual.length, 1)
    })
    it('applies filter on field "name"', () => {
      // Given
      const repository = {findAll () { return [{name: 'Mad Max'}, {name: 'Mononoke hime'}] }}
      const filters = {name: 'Mad Max'}

      // When
      const actual = ratingService(repository).findAll(filters)

      // Then
      assert.equal(actual.length, 1)
    })
    it('applies filter on field "rating"', () => {
      // Given
      const repository = {findAll () { return [{rating: 7.0}, {rating: 8.0}] }}
      const filters = {rating: 7.0}

      // When
      const actual = ratingService(repository).findAll(filters)

      // Then
      assert.equal(actual.length, 1)
    })
    it('applies filter on any given field', () => {
      // Given
      const repository = {findAll () { return [{foo: 'bar'}, {foo: 'qux'}] }}
      const filters = {foo: 'bar'}

      // When
      const actual = ratingService(repository).findAll(filters)

      // Then
      assert.equal(actual.length, 1)
    })
  })

  describe('.removeAll()', () => {
    it('calls repository.removeAll()', () => {
      // Given
      const repository = {removeAll () {}}
      const stub = sinon.stub(repository, 'removeAll')

      // When
      ratingService(repository).removeAll()

      // Then
      sinon.assert.calledOnce(stub)
    })
    it('returns repository.removeAll(:id, :data)', () => {
      // Given
      const repository = {removeAll () { return 'fakeResult' }}

      // When
      const actual = ratingService(repository).removeAll()

      // Then
      assert.equal(actual, 'fakeResult')
    })
  })

  describe('.insert(:rating)', () => {
    it('calls repository.insert(:rating)', () => {
      // Given
      const repository = {insert () {}}
      const data = fixtures.rating()
      const stub = sinon.stub(repository, 'insert')

      // When
      ratingService(repository).insert(data)

      // Then
      sinon.assert.calledOnce(stub)
    })
    it('returns repository.insert(:id, :data)', () => {
      // Given
      const repository = {insert () { return 'fakeResult' }}
      const data = fixtures.rating()

      // When
      const actual = ratingService(repository).insert(data)

      // Then
      assert.equal(actual, 'fakeResult')
    })
    it('throws an error when rating is missing', () => {
        // Given
      const repository = {insert () { return 'fakeResult' }}
      const data = fixtures.rating()
      delete data.rating

        // When
      expect(() => {
        ratingService(repository).insert(data)
      }).to.throw(Error)
    })
    it('throws an error when type is missing', () => {
        // Given
      const repository = {insert () { return 'fakeResult' }}
      const data = fixtures.rating()
      delete data.type

        // When
      expect(() => {
        ratingService(repository).insert(data)
      }).to.throw(Error)
    })
    it('throws an error when name is missing', () => {
        // Given
      const repository = {insert () { return 'fakeResult' }}
      const data = fixtures.rating()
      delete data.name

        // When
      expect(() => {
        ratingService(repository).insert(data)
      }).to.throw(Error)
    })
  })

  describe('.find(:id)', () => {
    it('calls repository.find(:id)', () => {
      // Given
      const repository = {find () {}}
      const id = 'fakeId'
      const stub = sinon.stub(repository, 'find')

      // When
      ratingService(repository).find(id)

      // Then
      sinon.assert.calledOnce(stub)
    })
    it('returns repository.find(:id, :data)', () => {
      // Given
      const repository = {find () { return 'fakeResult' }}
      const id = 'fakeId'

      // When
      const actual = ratingService(repository).find(id)

      // Then
      assert.equal(actual, 'fakeResult')
    })
  })

  describe('.remove(:id)', () => {
    it('calls repository.remove(:id)', () => {
      // Given
      const repository = {remove () {}}
      const id = 'fakeId'
      const stub = sinon.stub(repository, 'remove')

      // When
      ratingService(repository).remove(id)

      // Then
      sinon.assert.calledOnce(stub)
    })
    it('returns throws an error when repository.remove(:id) returns 0', () => {
      // Given
      const repository = {remove () { return 0 }}
      const id = 'fakeId'

      // Then
      expect(() => {
        // When
        ratingService(repository).remove(id)
      }).to.throw(Error)
    })
  })
  describe('.update(:id, :data)', () => {
    it('calls repository.update(:id, :data)', () => {
      // Given
      const repository = {update () {}}
      const id = 'fakeId'
      const data = fixtures.rating()
      const stub = sinon.stub(repository, 'update')

      // When
      ratingService(repository).update(id, data)

      // Then
      sinon.assert.calledOnce(stub)
    })
    it('returns repository.update(:id, :data)', () => {
      // Given
      const repository = {update () { return 'fakeResult' }}
      const id = 'fakeId'
      const data = fixtures.rating()

      // When
      const actual = ratingService(repository).update(id, data)

      // Then
      assert.equal(actual, 'fakeResult')
    })
    it('throws an error when rating is missing', () => {
        // Given
      const repository = {update () { return 'fakeResult' }}
      const id = 'fakeId'
      const data = fixtures.rating()
      delete data.rating

        // When
      expect(() => {
        ratingService(repository).update(id, data)
      }).to.throw(Error)
    })
    it('throws an error when type is missing', () => {
        // Given
      const repository = {update () { return 'fakeResult' }}
      const id = 'fakeId'
      const data = fixtures.rating()
      delete data.type

        // When
      expect(() => {
        ratingService(repository).update(id, data)
      }).to.throw(Error)
    })
    it('throws an error when name is missing', () => {
        // Given
      const repository = {update () { return 'fakeResult' }}
      const id = 'fakeId'
      const data = fixtures.rating()
      delete data.name

        // When
      expect(() => {
        ratingService(repository).update(id, data)
      }).to.throw(Error)
    })
  })
})
