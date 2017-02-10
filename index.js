const express = require('express')
const helmet = require('helmet')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const boom = require('boom')

const pkg = require('./package')
const repository = require('./src/ratings-memory-service')
const domain = require('./src/ratings-domain-service')(repository)
const httpService = require('./src/ratings-http-service')(domain)

const app = express()

app.use(helmet())
app.use(bodyParser.json())
app.use(morgan('dev'))

app.get('/', (req, res) => {
  res.json({
    name: pkg.name,
    version: pkg.version
  })
})

app.get('/ratings', httpService.findAll)
app.get('/ratings/:id', httpService.find)
app.put('/ratings/:id', httpService.update)
app.post('/ratings', httpService.insert)
app.delete('/ratings', httpService.removeAll)
app.delete('/ratings/:id', httpService.remove)

app.use((err, req, res, next) => {
  if (err.isBoom) {
    return res.status(err.output.statusCode).send(err.output.payload)
  } else {
    return res.status(500).send(boom.badImplementation().output.payload)
  }
})

module.exports = app
