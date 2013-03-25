var gitlab = require('../');

var client = gitlab.create(require('./config'));

module.exports = client;