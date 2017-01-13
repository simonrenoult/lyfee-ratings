const express = require('express')
const shortid = require('shortid')
const helmet = require('helmet')
const bodyParser = require('body-parser')
const app = express()

let ratings = []

app.use(helmet())
app.use(bodyParser.json())

app.get('/', (req, res) => {
  res.send('Hello Lyfeee')
})

app.get('/ratings', (req, res) => {
  res.status(200).send(ratings)
})

app.get('/ratings/:id', (req, res) => {
  const id = req.params.id
  const rating = ratings.find(rating => rating.id === id)
  if (!rating) return res.sendStatus(404)
  res.send(rating)
})

app.put('/ratings/:id', (req, res) => {
  const id = req.params.id
  const rating = ratings.find(rating => rating.id === id)
  if (!rating) return res.sendStatus(404)
  ratings = ratings.map(rating => {
    if (rating.id !== id) return rating
    return Object.assign(rating, req.body)
  })
  res.location(`/ratings/${id}`).sendStatus(204)
})

app.post('/ratings', (req, res) => {
  const id = shortid.generate()
  ratings.push(Object.assign(req.body, {id}))
  res.location(`/ratings/${id}`).sendStatus(201)
})

app.delete('/ratings', (req, res) => {
  ratings = []
  res.sendStatus(204)
})

module.exports = app
