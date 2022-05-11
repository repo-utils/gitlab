/**!
 * gitlab - lib/resources/issue.js
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

var util            = require('util');
var RESTFulResource = require('restful-client').RESTFulResource;

module.exports = Issue;

function Issue(client) {
  this.constructor.super_.call(this, client, '/projects/:id/issues', 'issue_id');
}
util.inherits(Issue, RESTFulResource);

Issue.prototype.listNotes = function (params, callback) {
  this.client.request('get', this.onePath + '/notes', params, callback);
};

Issue.prototype.createNote = function (params, callback) {
  this.client.request('post', this.onePath + '/notes', params, callback);
};

Issue.prototype.getNote = function (params, callback) {
  this.client.request('get', this.onePath + '/notes/:note_id', params, callback);
};

Issue.prototype.updateNote = function (params, callback) {
  this.client.request('put', this.onePath + '/notes/:note_id', params, callback);
};

Issue.prototype.timeEstimate = function (params, callback) {
  this.client.request('post', this.onePath + '/time_estimate', params, callback);
};

Issue.prototype.resetTimeEstimate = function (params, callback) {
  this.client.request('post', this.onePath + '/reset_time_estimate', params, callback);
};

Issue.prototype.addSpentTime = function (params, callback) {
  this.client.request('post', this.onePath + '/add_spent_time', params, callback);
};

Issue.prototype.resetSpentTime = function (params, callback) {
  this.client.request('post', this.onePath + '/reset_spent_time', params, callback);
};

Issue.prototype.timeStats = function (params, callback) {
  this.client.request('get', this.onePath + '/time_stats', params, callback);
};