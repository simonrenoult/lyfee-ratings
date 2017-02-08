const sinon = require('sinon')
const assert = require('assert')

const ratingService = require('../src/ratings-service')

describe('RatingsService', () => {
  describe('.findAll(:filters)', () => {
    it('calls repository.findAll()', () => {
      const repository = {findAll () {}}
      const stub = sinon.stub(repository, 'findAll')
      stub.returns([])

      // When
      ratingService({repository}).findAll()

      // Then
      sinon.assert.calledOnce(stub)
    })
    it('returns repository.findAll(:id, :data)', () => {
      // Given
      const repository = {findAll () { return ['fakeResult'] }}

      // When
      const actual = ratingService({repository}).findAll()

      // Then
      assert.deepEqual(actual, ['fakeResult'])
    })
    it('applies filter on field "type"', () => {
      // Given
      const repository = {findAll () { return [{type: 'movies'}, {type: 'books'}] }}
      const filters = {type: 'books'}

      // When
      const actual = ratingService({repository}).findAll(filters)

      // Then
      assert.equal(actual.length, 1)
    })
    it('applies filter on field "name"', () => {
      // Given
      const repository = {findAll () { return [{name: 'Mad Max'}, {name: 'Mononoke hime'}] }}
      const filters = {name: 'Mad Max'}

      // When
      const actual = ratingService({repository}).findAll(filters)

      // Then
      assert.equal(actual.length, 1)
    })
    it('applies filter on field "rating"', () => {
      // Given
      const repository = {findAll () { return [{rating: 7.0}, {rating: 8.0}] }}
      const filters = {rating: 7.0}

      // When
      const actual = ratingService({repository}).findAll(filters)

      // Then
      assert.equal(actual.length, 1)
    })
    it('applies filter on any given field', () => {
      // Given
      const repository = {findAll () { return [{foo: 'bar'}, {foo: 'qux'}] }}
      const filters = {foo: 'bar'}

      // When
      const actual = ratingService({repository}).findAll(filters)

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
      ratingService({repository}).removeAll()

      // Then
      sinon.assert.calledOnce(stub)
    })
    it('returns repository.removeAll(:id, :data)', () => {
      // Given
      const repository = {removeAll () { return 'fakeResult' }}

      // When
      const actual = ratingService({repository}).removeAll()

      // Then
      assert.equal(actual, 'fakeResult')
    })
  })

  describe('.insert(:rating)', () => {
    it('calls repository.insert(:rating)', () => {
      // Given
      const repository = {insert () {}}
      const rating = 'fakeRating'
      const stub = sinon.stub(repository, 'insert')

      // When
      ratingService({repository}).insert(rating)

      // Then
      sinon.assert.calledOnce(stub)
    })
    it('returns repository.insert(:id, :data)', () => {
      // Given
      const repository = {insert () { return 'fakeResult' }}
      const data = 'fakeData'

      // When
      const actual = ratingService({repository}).insert(data)

      // Then
      assert.equal(actual, 'fakeResult')
    })
  })

  describe('.find(:id)', () => {
    it('calls repository.find(:id)', () => {
      // Given
      const repository = {find () {}}
      const id = 'fakeId'
      const stub = sinon.stub(repository, 'find')

      // When
      ratingService({repository}).find(id)

      // Then
      sinon.assert.calledOnce(stub)
    })
    it('returns repository.find(:id, :data)', () => {
      // Given
      const repository = {find () { return 'fakeResult' }}
      const id = 'fakeId'

      // When
      const actual = ratingService({repository}).find(id)

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
      ratingService({repository}).remove(id)

      // Then
      sinon.assert.calledOnce(stub)
    })
    it('returns repository.remove(:id, :data)', () => {
      // Given
      const repository = {remove () { return 'fakeResult' }}
      const id = 'fakeId'
      const data = 'fakeData'

      // When
      const actual = ratingService({repository}).remove(id, data)

      // Then
      assert.equal(actual, 'fakeResult')
    })
  })

  describe('.update(:id, :data)', () => {
    it('calls repository.update(:id, :data)', () => {
      // Given
      const repository = {update () {}}
      const id = 'fakeId'
      const data = 'fakeData'
      const stub = sinon.stub(repository, 'update')

      // When
      ratingService({repository}).update(id, data)

      // Then
      sinon.assert.calledOnce(stub)
    })
    it('returns repository.update(:id, :data)', () => {
      // Given
      const repository = {update () { return 'fakeResult' }}
      const id = 'fakeId'
      const data = 'fakeData'

      // When
      const actual = ratingService({repository}).update(id, data)

      // Then
      assert.equal(actual, 'fakeResult')
    })
  })
})
