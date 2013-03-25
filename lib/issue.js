/*!
 * gitlab - lib/issue.js
 * Copyright(c) 2013 fengmk2 <fengmk2@gmail.com>
 * MIT Licensed
 */

"use strict";

/**
 * Module dependencies.
 */

var util = require('util');
var Resource = require('./resource');

function Issue(client) {
  Resource.call(this, client, '/projects/:id/issues', 'issue_id');
}
util.inherits(Issue, Resource);

module.exports = Issue;

Issue.prototype.listNotes = function (params, callback) {
  this.client.request('get', this.onePath + '/notes', params, callback);
};

Issue.prototype.createNote = function (params, callback) {
  this.client.request('post', this.onePath + '/notes', params, callback);
};