module.exports = service => {
  return {
    findAll: findAll(service)
  }
}

function findAll (service) {
  return (req, res, next) => {
    const ratings = service.findAll(req.query)
    res.status(200).send(ratings)
  }
}
