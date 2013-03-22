/*!
 * gitlab - lib/milestone.js
 * Copyright(c) 2013 fengmk2 <fengmk2@gmail.com>
 * MIT Licensed
 */

"use strict";

/**
 * Module dependencies.
 */

function Milestone(client) {
  this.client = client;
  this.path = '/projects/:id/milestones';
  this.onePath = this.path + '/:milestone_id';
}

/**
 * Get a project's milestone.
 * 
 * @param {Object} params
 *  - {Number} id, project's id
 *  - {Number} milestone_id, milestone's id.
 * @param {Function(err, row)} callback
 */
Milestone.prototype.get = function (params, callback) {
  this.client.request('get', this.onePath, params, callback);
};

/**
 * List a project's all milestones.
 * 
 * @param {Object} params
 *  - {Number} id, project's id.
 *  - {Number} [page=1], page number, default is `1`.
 *  - {Number} [perPage=20], number of items to list per page, max is `100`.
 * @param {Function(err, rows)} callback
 */
Milestone.prototype.list = function (params, callback) {
  this.client.request('get', this.path, params, callback);
};

/**
 * Create a milestone.
 * 
 * @param {Object} params
 *  - {Number} id (required) - The ID of a project
 *  - {String} title (required) - The title of an milestone
 *  - {String} [description] (optional) - The description of the milestone
 *  - {String} [due_date] (optional) - The due date of the milestone
 * @param {Function(err, row)} callback
 */
Milestone.prototype.create = function (params, callback) {
  this.client.request('post', this.path, params, callback);
};

/**
 * Update a milestone.
 * @param {Object} params
 *  - {Number} id (required) - The ID of a project
 *  - {Number} milestone_id (required) - The ID of a project milestone
 *  - {String} title (required) - The title of an milestone
 *  - {String} [description] (optional) - The description of the milestone
 *  - {String} [due_date] (optional) - The due date of the milestone
 *  - {String} [closed] (optional) - The status of the milestone
 * @param {Function(err, row)} callback
 */
Milestone.prototype.update = function (params, callback) {
  this.client.request('put', this.onePath, params, callback);
};

module.exports = Milestone;