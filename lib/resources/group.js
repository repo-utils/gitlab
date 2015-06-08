/**!
 * gitlab - lib/resources/group.js
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

module.exports = Group;

function Group(client) {
  this.constructor.super_.call(this, client, '/groups', 'id');
}
util.inherits(Group, restful.RESTFulResource);

/**
 * Transfer a project to the Group namespace. Available only for admin
 *
 * POST  /groups/:id/projects/:project_id
 *
 * @param {Object} params
 *  - {String} id group id
 *  - {String} project_id project id
 * @param {Function(err, project)} callback
 */
Group.prototype.transferProject = function (params, callback) {
  this.client.request('post', '/groups/:id/projects/:project_id', params, callback);
  return this;
};
