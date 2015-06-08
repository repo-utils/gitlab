/**!
 * gitlab - lib/resources/milestone.js
 *
 * Copyright(c) repo-utils and other contributors.
 * MIT Licensed
 *
 * Authors:
 *   fengmk2 <m@fengmk2.com> (http://fengmk2.com)
 */

'use strict';

/**
 * Module dependencies.
 */

var util = require('util');
var restful = require('restful-client');

module.exports = Milestone;

function Milestone(client) {
  this.constructor.super_.call(this, client, '/projects/:id/milestones', 'milestone_id');
}
util.inherits(Milestone, restful.RESTFulResource);

Milestone.prototype.listIssues = function (params, callback) {
  this.client.request('get', this.onePath + '/issues', params, callback);
  return this;
};
