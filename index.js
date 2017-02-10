const express = require('express')
const shortid = require('shortid')
const helmet = require('helmet')
const bodyParser = require('body-parser')
const pkg = require('./package')
const repository = require('./src/ratings-memory-service')
const domain = require('./src/ratings-domain-service')(repository)
const httpService = require('./src/ratings-http-service')(domain)

const app = express()

app.use(helmet())
app.use(bodyParser.json())

app.get('/', (req, res) => {
  res.send(`${pkg.name}:${pkg.version}`)
})

app.get('/ratings', httpService.findAll)

app.get('/ratings/:id', (req, res) => {
  const id = req.params.id
  const rating = domain.find(id)
  if (!rating) return res.sendStatus(404)
  res.send(rating)
})

app.put('/ratings/:id', (req, res) => {
  const id = req.params.id
  const rating = domain.find(id)
  if (!rating) return res.sendStatus(404)

  if (!req.body.rating) return res.sendStatus(400)
  if (!req.body.type) return res.sendStatus(400)
  if (!req.body.name) return res.sendStatus(400)

  domain.update(id, req.body)

  res.location(`/ratings/${id}`).sendStatus(204)
})

app.post('/ratings', (req, res) => {
  const id = shortid.generate()
  domain.insert(Object.assign(req.body, {id}))
  res.location(`/ratings/${id}`).sendStatus(201)
})

app.delete('/ratings', (req, res) => {
  domain.removeAll()
  res.sendStatus(204)
})

module.exports = app
