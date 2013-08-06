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
var restful = require('restful-client');

function Issue(client) {
  this.constructor.super_.call(this, client, '/projects/:id/issues', 'issue_id');
}
util.inherits(Issue, restful.RESTFulResource);

module.exports = Issue;

Issue.prototype.listNotes = function (params, callback) {
  this.client.request('get', this.onePath + '/notes', params, callback);
};

Issue.prototype.createNote = function (params, callback) {
  this.client.request('post', this.onePath + '/notes', params, callback);
};