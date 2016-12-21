const path = require('path')
const env = process.env.NODE_ENV || 'development'
const nconf = require('nconf')

module.exports = nconf
  .env({
    lowerCase: true
  })
  .file({
    file: path.resolve(__dirname, `./${env}.json`)
  })
