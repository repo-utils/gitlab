/*!
 * gitlab - lib/user.js
 * Copyright(c) 2013 fengmk2 <fengmk2@gmail.com>
 * MIT Licensed
 */

"use strict";

/**
 * Module dependencies.
 */

var util = require('util');
var Resource = require('./resource');

function User(client) {
  Resource.call(this, client, '/users', 'user_id');
}
util.inherits(User, Resource);

module.exports = User;
