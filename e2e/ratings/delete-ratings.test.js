const requester = require('../helpers').requester

describe('DELETE /ratings', () => {
  it('removes all ratings', () => {
    return requester.delete('/ratings').expect(204)
  })
})
