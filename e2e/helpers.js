const supertest = require('supertest')
const app = require('..')

exports.requester = supertest(app)
