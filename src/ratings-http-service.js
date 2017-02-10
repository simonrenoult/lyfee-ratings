const shortid = require('shortid')

module.exports = domain => {
  return {
    findAll: findAll(domain),
    find: find(domain),
    insert: insert(domain),
    removeAll: removeAll(domain),
    remove: remove(domain),
    update: update(domain)
  }
}

function findAll (domain) {
  return (req, res, next) => {
    const ratings = domain.findAll(req.query)
    res.status(200).send(ratings)
  }
}

function find (domain) {
  return (req, res, next) => {
    const id = req.params.id
    const rating = domain.find(id)
    if (!rating) return res.status(404).send()
    res.send(rating)
  }
}

function removeAll (domain) {
  return (req, res, next) => {
    domain.removeAll()
    res.sendStatus(204)
  }
}

function insert (domain) {
  return (req, res, next) => {
    const id = shortid.generate()
    domain.insert(Object.assign(req.body, {id}))
    res.location(`/ratings/${id}`).sendStatus(201)
  }
}

function remove (domain) {
  return (req, res, next) => {
    return domain.remove(id)
  }
}

function update (domain) {
  return (req, res, next) => {
      const id = req.params.id
      const rating = domain.find(id)
      if (!rating) return res.sendStatus(404)

      try {
        domain.update(id, req.body)
      } catch (e) {
        return res.status(400).send(e)
      }

      return res.location(`/ratings/${id}`).sendStatus(204)
  }
}
