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
