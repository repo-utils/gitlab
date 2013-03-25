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
