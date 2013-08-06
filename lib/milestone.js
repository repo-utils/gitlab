/*!
 * gitlab - lib/milestone.js
 * Copyright(c) 2013 fengmk2 <fengmk2@gmail.com>
 * MIT Licensed
 */

"use strict";

/**
 * Module dependencies.
 */

var util = require('util');
var restful = require('restful-client');

function Milestone(client) {
  this.constructor.super_.call(this, client, '/projects/:id/milestones', 'milestone_id');
}
util.inherits(Milestone, restful.RESTFulResource);

module.exports = Milestone;
