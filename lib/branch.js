/*!
 * gitlab  lib/branch.js
 * Copyright(c) 2014 dead_horse <dead_horse@qq.com>
 * MIT Licensed
 */

"use strict";

/**
 * Module dependencies.
 */

var util = require('util');
var restful = require('restful-client');

function Branch(client) {
  this.constructor.super_.call(this, client, '/projects/:id/branches', 'branch');
}
util.inherits(Branch, restful.RESTFulResource);

module.exports = Branch;
