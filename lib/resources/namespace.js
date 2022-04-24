/**!
 * gitlab - lib/resources/namespace.js
 *
 * Copyright(c) repo-utils and other contributors.
 * MIT Licensed
 *
 * Authors:
 *   fengmk2 <fengmk2@gmail.com> (http://fengmk2.com)
 */

'use strict';

/**
 * Module dependencies.
 */

var util = require('util');
var restful = require('restful-client');

module.exports = Namespace;

function Namespace(client) {
  this.constructor.super_.call(this, client, '/namespaces', 'id');
}
util.inherits(Namespace, restful.RESTFulResource);

Namespace.prototype.list = function (params, callback) {
  this.client.request('get', '/namespaces', params, callback);
};

Namespace.prototype.search = function (params, callback) {
  this.client.request('get', '/namespaces/search/:query', params, callback);
};
