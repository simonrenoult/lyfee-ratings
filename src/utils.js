const boom = require('boom')
const pkg = require('../package')

exports.handlerError = (err, req, res, next) => {
  if (err.isBoom) {
    return res.status(err.output.statusCode).send(err.output.payload)
  } else {
    return res.status(500).send(boom.badImplementation().output.payload)
  }
}

exports.showProductSummary = (req, res, next) => {
  res.json({
    name: pkg.name,
    version: pkg.version
  })
}
