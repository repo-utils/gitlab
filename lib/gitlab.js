/**!
 * gitlab - lib/gitlab.js
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

var debug = require('debug')('gitlab');
var RESTFulClient = require('restful-client').RESTFulClient;
var util = require('util');
var resources = require('./resources');

module.exports = Gitlab;

/**
 * Create a gitlab API client.
 *
 * @param {Object} options
 *  - {String} api, api root url, e.g.: 'http://gitlab.com/api/v3'
 *  - {String} privateToken, You can find or reset your private token in your profile.
 */
function Gitlab(options) {
  options = options || {};
  options.api = options.api || 'https://gitlab.com/api/v3';
  RESTFulClient.call(this, options);
  this.privateToken = options.privateToken;

  this.addResources(resources);

  // mergeRequests => merge_requests
  this.merge_requests = this.mergeRequests;
  // members => projectMembers
  this.members = this.projectMembers;
}

util.inherits(Gitlab, RESTFulClient);

Gitlab.prototype.setAuthentication = function (req) {
  req.params.data.private_token = req.params.data.private_token || this.privateToken;
  return req;
};

Gitlab.create = function (options) {
  return new Gitlab(options);
};

Gitlab.createPromise = function (options) {
  var client = Gitlab.create(options);
  return require('./promisify')(client);
};

Gitlab.createThunk = function (options) {
  var client = Gitlab.create(options);
  return require('./thunkify')(client);
};
