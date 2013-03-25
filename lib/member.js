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
var Resource = require('./resource');

function Member(client) {
  Resource.call(this, client, '/projects/:id/members', 'user_id');
}
util.inherits(Member, Resource);

module.exports = Member;
