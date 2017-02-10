const express = require('express')
const helmet = require('helmet')
const bodyParser = require('body-parser')
const morgan = require('morgan')

const pkg = require('./package')
const repository = require('./src/ratings-memory-service')
const domain = require('./src/ratings-domain-service')(repository)
const httpService = require('./src/ratings-http-service')(domain)

const app = express()

app.use(helmet())
app.use(bodyParser.json())
app.use(morgan('dev'))

app.get('/', (req, res) => res.send(`${pkg.name}:${pkg.version}`))
app.get('/ratings', httpService.findAll)
app.get('/ratings/:id', httpService.find)
app.put('/ratings/:id', httpService.update)
app.post('/ratings', httpService.insert)
app.delete('/ratings', httpService.removeAll)

module.exports = app
