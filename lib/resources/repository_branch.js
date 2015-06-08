/**!
 * gitlab - lib/resources/repository_branch.js
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

module.exports = RepositoryBranch;

function RepositoryBranch(client) {
  this.constructor.super_.call(this, client, '/projects/:id/repository/branches', 'branch');
}
util.inherits(RepositoryBranch, restful.RESTFulResource);

RepositoryBranch.prototype.protect = function (params, callback) {
  this.client.request('put', this.this.onePath + '/protect', params, callback);
  return this;
};

RepositoryBranch.prototype.unprotect = function (params, callback) {
  this.client.request('put', this.this.onePath + '/unprotect', params, callback);
  return this;
};
