/*!
 * gitlab - lib/project.js
 * Copyright(c) 2013 fengmk2 <fengmk2@gmail.com>
 * MIT Licensed
 */

"use strict";

/**
 * Module dependencies.
 */

var util = require('util');
var Resource = require('./resource');

function Project(client) {
  Resource.call(this, client, '/projects', 'id');
}
util.inherits(Project, Resource);

module.exports = Project;

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
