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
var Resource = require('./resource');

function Milestone(client) {
  Resource.call(this, client, '/projects/:id/milestones', 'milestone_id');
}
util.inherits(Milestone, Resource);

module.exports = Milestone;
