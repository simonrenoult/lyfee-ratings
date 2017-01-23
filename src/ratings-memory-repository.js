let store = []

module.exports = {
  insert (rating) {
    store.push(rating)
  },

  findAll () {
    return store
  },

  find (id) {
    return store.find(r => r.id === id)
  },

  removeAll () {
    store = []
  },

  remove (id) {
    const ratingIndex = store.findIndex(r => r.id === id)
    store.splice(ratingIndex, 1)
  },

  update (id, data) {
    store = store.map(r => {
      if (r.id !== id) return r
      return Object.assign({}, r, data, {id})
    })
  }
}
