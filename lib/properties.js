/**!
 * gitlab - lib/properties.js
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

var defaultMethods = ['get', 'list', 'create', 'update', 'remove'];

var properties = {
  milestones: [],
  members: [],
  hooks: [],
  globalHooks: [],
  users: [],
  mergeRequests: [],
  repositoryFiles: [],
  repository: [
    'getBranches',
    'protectBranch',
    'unprotectBranch',
    'getBranch',
    'getTags',
    'getCommits',
    'getTree',
    'getBlob'
  ],
  issues: [
    'listNotes',
    'createNote'
  ],
  projects: [
    'getByPath'
  ],
  projectMembers: [],
  groups: [],
  groupMembers: [],
};

for (var key in properties) {
  var methods = properties[key];
  properties[key] = defaultMethods.concat(methods);
}

module.exports = properties;
