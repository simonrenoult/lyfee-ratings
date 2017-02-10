const express = require('express')
const helmet = require('helmet')
const bodyParser = require('body-parser')
const morgan = require('morgan')

const repository = require('./src/ratings-memory-service')
const domain = require('./src/ratings-domain-service')(repository)
const httpService = require('./src/ratings-http-service')(domain)
const config = require('./config')
const utils = require('./src/utils')
const route = require('./src/ratings-routes-service')
const app = express()

if (config.get('env') !== 'test') app.use(morgan('dev'))
app.use(helmet())
app.use(bodyParser.json())

app.get('/', utils.showProductSummary)
route(app, httpService)

app.use(utils.handlerError)

module.exports = app
