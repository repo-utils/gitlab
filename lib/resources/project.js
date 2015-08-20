/**!
 * gitlab - lib/resources/project.js
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

module.exports = Project;

function Project(client) {
  this.constructor.super_.call(this, client, '/projects', 'id');
}
util.inherits(Project, restful.RESTFulResource);

/**
 * Get Project info by path.
 *
 * /api/v3/project?private_token=xxx&&path=fengmk2/fawave
 *
 * @param {Object} params
 *  - {String} path
 * @param {Function(err, project)} callback
 */
Project.prototype.getByPath = function (params, callback) {
  this.client.request('get', '/project', params, callback);
};

Project.prototype.search = function (params, callback) {
  this.client.request('get', '/projects/search/:query', params, callback);
};

Project.prototype.fork = function (params, callback) {
  this.client.request('post', '/projects/fork/:id', params, callback);
};

Project.prototype.listEvents = function (params, callback) {
  this.client.request('get', this.onePath + '/events', params, callback);
};

Project.prototype.getLabels = function (params, callback) {
  this.client.request('get', this.onePath + '/labels', params, callback);
};

Project.prototype.createLabel = function (params, callback) {
  this.client.request('post', this.onePath + '/labels', params, callback);
};

Project.prototype.updateLabel = function(params, callback) {
  this.client.request('put', this.onePath + '/labels', params, callback);
};

Project.prototype.deleteLabel = function(params, callback) {
  this.client.request('delete', this.onePath + '/labels', params, callback);
};