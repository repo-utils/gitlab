/**!
 * gitlab - lib/resources/repository.js
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

module.exports = Repository;

function Repository(client) {
  this.constructor.super_.call(this, client, '/projects/:id/repository/:type', 'branch');
}
util.inherits(Repository, restful.RESTFulResource);

/**
 * Get a list of repository branches from a project, sorted by name alphabetically.
 *
 * @param {Object} params
 *  - {String} id The ID of a project
 * @param {Function} callback
 */
Repository.prototype.getBranches = function (params, callback) {
  params.type = 'branches';
  this.list(params, callback);
};

/**
 * Protects a single project repository branch.
 * This is an idempotent function, protecting an already protected repository branch
 * still returns a 200 Ok status code.
 *
 * @param {Object} params
 *  - {String} id The ID of a project
 *  - {String} branch The name of the branch
 * @param {Function} callback
 */
Repository.prototype.protectBranch = function (params, callback) {
  params.type = 'branches';
  this.client.request('PUT', this.path + '/:branch/protect', params, callback);
};

/**
 * Unprotects a single project repository branch.
 * This is an idempotent function, unprotecting an already unprotected repository branch
 * still returns a 200 Ok status code.
 *
 * @param {Object} params
 *  - {String} id The ID of a project
 *  - {String} branch The name of the branch
 * @param {Function} callback
 */
Repository.prototype.unprotectBranch = function (params, callback) {
  params.type = 'branches';
  this.client.request('PUT', this.path + '/:branch/unprotect', params, callback);
};

/**
 * Get a single project repository branch.
 *
 * @param {Object} params
 *  - {String} id The ID of a project
 *  - {String} branch The name of the branch
 * @param {Function} callback
 */
Repository.prototype.getBranch = function (params, callback) {
  params.type = 'branches';
  this.client.request('get', this.path + '/:branch', params, callback);
};

/**
 * Get a list of repository tags from a project, sorted by name in reverse alphabetical order.
 *
 * @param {Object} params
 *  - {String} id The ID of a project
 * @param {Function} callback
 */
Repository.prototype.getTags = function (params, callback) {
  params.type = 'tags';
  this.list(params, callback);
};

/**
 * Get a list of repository commits in a project.
 *
 * @param {Object} params
 *  - {String} id The ID of a project
 *  - {String} [ref_name] The name of a repository branch or tag or if not given the default branch
 * @param {Function} callback
 */
Repository.prototype.getCommits = function (params, callback) {
  params.type = 'commits';
  this.list(params, callback);
};

/**
 * Get a list of repository files and directories in a project.
 *
 * @param {Object} params
 *  - {String} id The ID of a project
 *  - {String} [path] The path inside repository, default is '/'. Used to get contend of subdirectories. e.g.: `test`
 *  - {String} [ref_name] The name of a repository branch or tag or if not given the default branch
 * @param {Function} callback
 */
Repository.prototype.getTree = function (params, callback) {
  params.type = 'tree';
  this.list(params, callback);
};

/**
 * Get the raw file contents for a file.
 *
 * @param {Object} params
 *  - {String} id The ID of a project
 *  - {String} sha The commit or branch name
 *  - {String} filepath The path the file
 * @param {Function} callback
 */
Repository.prototype.getBlob = function (params, callback) {
  params.type = 'commits';
  params.contentType = 'buffer';
  this.client.request('get', this.path + '/:sha/blob', params, callback);
};

/**
 * Get the raw file contents for a blob by blob sha.
 *
 * @param {Object} params
 *  - {String} id The ID of a project
 *  - {String} sha The blob sha
 * @param {Function} callback
 */
Repository.prototype.getRawBlob = function (params, callback) {
  params.type = 'raw_blobs';
  params.contentType = 'buffer';
  this.client.request('get', this.path + '/:sha', params, callback);
};

/**
 * Creates a new tag in the repository that points to the supplied ref.
 *
 * @param {Object} params
 *  - {String} id (required) - The ID of a project
 *  - {String} tag_name (required) - The name of a tag
 *  - {String} ref (required) - Create tag using commit SHA, another tag name, or branch name.
 *  - {String} message (optional) - Creates annotated tag.
 *  - {String} release_description (optional) - Add release notes to the git tag and store it in the GitLab database.
 * @param {Function} callback
 */

Repository.prototype.createTag = function (params, callback) {
  params.type = 'tags';
  this.client.request('POST', this.path, params, callback);
};


