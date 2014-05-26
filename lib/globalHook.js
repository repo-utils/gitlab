/*!
 * gitlab - lib/globalHook.js
 * Copyright(c) 2013 fengmk2 <fengmk2@gmail.com>
 * Copyright(c) 2014 vsviridov <vsviridov@exceede.com>
 * MIT Licensed
 */

"use strict";

/**
 * Module dependencies.
 */

var util = require('util');
var restful = require('restful-client');

function GlobalHook(client) {
  this.constructor.super_.call(this, client, '/hooks', 'hook_id');
}
util.inherits(GlobalHook, restful.RESTFulResource);

module.exports = GlobalHook;
