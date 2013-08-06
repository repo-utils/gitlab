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
var restful = require('restful-client');

function User(client) {
  this.constructor.super_.call(this, client, '/users', 'user_id');
}
util.inherits(User, restful.RESTFulResource);

module.exports = User;
