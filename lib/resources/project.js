/**!
 * gitlab - lib/resources/project.js
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
