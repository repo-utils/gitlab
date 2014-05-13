/*!
 * gitlab - lib/merge_request.js
 * Copyright(c) 2013 fengmk2 <fengmk2@gmail.com>
 * MIT Licensed
 */

"use strict";

/**
 * Module dependencies.
 */

var util = require('util');
var restful = require('restful-client');

function MergeRequest(client) {
  this.constructor.super_.call(this, client, '/projects/:id/merge_request', 'merge_request_id');
}
util.inherits(MergeRequest, restful.RESTFulResource);

module.exports = MergeRequest;
