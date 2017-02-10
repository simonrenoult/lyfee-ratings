const shortid = require('shortid')
const boom = require('boom')

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
    if (!rating) return next(boom.notFound())
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

    try {
      domain.insert(Object.assign(req.body, {id}))
    } catch (e) {
      return next(boom.badRequest(e.message))
    }

    return res.location(`/ratings/${id}`).sendStatus(201)
  }
}

function remove (domain) {
  return (req, res, next) => {
    const id = req.params.id
    return domain.remove(id)
  }
}

function update (domain) {
  return (req, res, next) => {
    const id = req.params.id
    const rating = domain.find(id)
    if (!rating) return next(boom.notFound())

    try {
      domain.update(id, req.body)
    } catch (e) {
      return next(boom.badRequest(e.message))
    }

    return res.location(`/ratings/${id}`).sendStatus(204)
  }
}
