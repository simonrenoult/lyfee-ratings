module.exports = (repository) => {
  return {
    findAll: findAll(repository),
    insert: insert(repository),
    find: find(repository),
    removeAll: removeAll(repository),
    remove: remove(repository),
    update: update(repository)
  }
}

function findAll (repository) {
  return (filters = {}) => repository.findAll()
      .filter(message => Object.keys(filters)
          .map(filterKey => message[filterKey] === filters[filterKey])
          .reduce((previous, current) => previous && current, true)
      )
}

function removeAll (repository) {
  return () => {
    return repository.removeAll()
  }
}

function remove (repository) {
  return (id) => {
    const removedItemsCount = repository.remove(id)
    if (removedItemsCount === 0) throw new Error('element does not exist')
  }
}

function insert (repository) {
  return (data) => {
    if (!data.rating) throw new Error('missing rating')
    if (!data.type) throw new Error('missing type')
    if (!data.name) throw new Error('missing name')
    return repository.insert(data)
  }
}

function find (repository) {
  return (id) => {
    return repository.find(id)
  }
}

function update (repository) {
  return (id, data) => {
    if (!data.rating) throw new Error('missing rating')
    if (!data.type) throw new Error('missing type')
    if (!data.name) throw new Error('missing name')
    return repository.update(id, data)
  }
}
