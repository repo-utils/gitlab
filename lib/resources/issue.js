/**!
 * gitlab - lib/resources/issue.js
 *
 * Copyright(c) fengmk2 and other contributors.
 * MIT Licensed
 *
 * Authors:
 *   fengmk2 <fengmk2@gmail.com> (http://fengmk2.github.com)
 */

'use strict';

/**
 * Module dependencies.
 */

var util = require('util');
var RESTFulResource = require('restful-client').RESTFulResource;

function Issue(client) {
  this.constructor.super_.call(this, client, '/projects/:id/issues', 'issue_id');
}
util.inherits(Issue, RESTFulResource);

module.exports = Issue;

Issue.prototype.listNotes = function (params, callback) {
  this.client.request('get', this.onePath + '/notes', params, callback);
};

Issue.prototype.createNote = function (params, callback) {
  this.client.request('post', this.onePath + '/notes', params, callback);
};
