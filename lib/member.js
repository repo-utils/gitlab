/*!
 * gitlab - lib/member.js
 * Copyright(c) 2013 fengmk2 <fengmk2@gmail.com>
 * MIT Licensed
 */

"use strict";

/**
 * Module dependencies.
 */

var util = require('util');
var restful = require('restful-client');

function Member(client) {
  this.constructor.super_.call(this, client, '/projects/:id/members', 'user_id');
}
util.inherits(Member, restful.RESTFulResource);

module.exports = Member;
