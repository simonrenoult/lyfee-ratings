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

function insert (repository) {
  return (rating) => {
    return repository.insert(rating)
  }
}

function find (repository) {
  return (id) => {
    return repository.find(id)
  }
}

function remove (repository) {
  return (id) => {
    return repository.remove(id)
  }
}

function update (repository) {
  return (id, data) => {
    return repository.update(id, data)
  }
}
