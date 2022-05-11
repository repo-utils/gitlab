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
  // headers
  this.headers = {};
}

util.inherits(Gitlab, RESTFulClient);

/**
 * @method addHeader
 * Add a header to the headers object
 * 
 * @param {string} key The header key to set 
 * @param {string} value The header value to set 
 */
var addHeader = function(key, value) {
  this.headers[key] = value;
}

/**
 * @method removeHeader
 * Removes a header from the headers object
 * 
 * @param {string} key The key of the header to remove
 */
var removeHeader = function(key) {
  if (this.headers[key] !== undefined) {
    delete this.headers[key];
  }
}

Gitlab.prototype.setAuthentication = function (req) {
  req.params.data.private_token = req.params.data.private_token || this.privateToken;

  for (let prop in this.headers) {
    req.params.headers[prop] = this.headers[prop];
  }

  return req;
};

Gitlab.create = function (options) {
  return new Gitlab(options);
};

Gitlab.createPromise = function (options) {
  var client = Gitlab.create(options);
  var promisified = require('./promisify')(client);

  promisified.addHeader = addHeader.bind(client);
  promisified.removeHeader = removeHeader.bind(client);

  return promisified;
};

Gitlab.createThunk = function (options) {
  var client = Gitlab.create(options);
  var thunked = require('./thunkify')(client);

  thunked.addHeader = addHeader.bind(client);
  thunked.removeHeader = removeHeader.bind(client);  
  
  return thunked;
};
