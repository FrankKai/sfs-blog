var merge = require('webpack-merge')
var prodEnv = require('./prod.env')
var path = require('path');

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"'
})