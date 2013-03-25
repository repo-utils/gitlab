/*!
 * gitlab - lib/hook.js
 * Copyright(c) 2013 fengmk2 <fengmk2@gmail.com>
 * MIT Licensed
 */

"use strict";

/**
 * Module dependencies.
 */

var util = require('util');
var Resource = require('./resource');

function Hook(client) {
  Resource.call(this, client, '/projects/:id/hooks', 'hook_id');
}
util.inherits(Hook, Resource);

module.exports = Hook;
