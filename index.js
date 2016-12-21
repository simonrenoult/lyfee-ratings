const express = require('express')
const shortid = require('shortid')
const helmet = require('helmet')
const bodyParser = require('body-parser')
const app = express()

const store = { ratings: [] }

app.use(helmet())
app.use(bodyParser.json())

app.get('/', (req, res) => {
  res.send('Hello Lyfeee')
})

app.get('/ratings', (req, res) => {
  res.status(200).send(store.ratings)
})

app.get('/ratings/:id', (req, res) => {
  const id = req.params.id
  const rating = store.ratings.find(rating => rating.id === id)
  if (!rating) return res.sendStatus(404)
  res.send(rating)
})

app.put('/ratings/:id', (req, res) => {
  const id = req.params.id
  const rating = store.ratings.find(rating => rating.id === id)
  if (!rating) return res.sendStatus(404)
  store.ratings = store.ratings.map(rating => {
    if (rating.id !== id) return rating
    return Object.assign(rating, req.body)
  })
  res.location(`/ratings/${id}`).sendStatus(204)
})

app.post('/ratings', (req, res) => {
  const id = shortid.generate()
  store.ratings.push(Object.assign(req.body, {id}))
  res.location(`/ratings/${id}`).sendStatus(201)
})

app.delete('/ratings', (req, res) => {
  store.ratings = []
  res.sendStatus(204)
})

module.exports = app
