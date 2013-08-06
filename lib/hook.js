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
var restful = require('restful-client');

function Hook(client) {
  this.constructor.super_.call(this, client, '/projects/:id/hooks', 'hook_id');
}
util.inherits(Hook, restful.RESTFulResource);

module.exports = Hook;
