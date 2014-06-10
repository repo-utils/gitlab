/**!
 * gitlab - lib/repository_file.js
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

module.exports = RepositoryFile;

function RepositoryFile(client) {
  this.constructor.super_.call(this, client, '/projects/:id/repository/files');
}
util.inherits(RepositoryFile, restful.RESTFulResource);

/**
 * Get the raw file contents for a blob by blob sha.
 *
 * @param {Object} params
 *  - {String} id The ID of a project
 *  - {String} sha The blob sha
 * @param {Function} callback
 */
RepositoryFile.prototype.getContents = function (params, callback) {
    this.client.request('get', '/projects/:id/repository/raw_blobs/:sha', params, callback);
};
