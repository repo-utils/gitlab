/**!
 * gitlab - lib/properties.js
 *
 * Copyright(c) repo-utils and other contributors.
 * MIT Licensed
 *
 * Authors:
 *   fengmk2 <m@fengmk2.com> (http://fengmk2.com)
 */

'use strict';

/**
 * Module dependencies.
 */

let defaultMethods = ['get', 'list', 'create', 'update', 'remove'];

let properties = {
  milestones: [
    'listIssues'
   ]
  , members: []
  , hooks: []
  , globalHooks: []
  , users: []
  , mergeRequests: [
    'listNotes'
    , 'createNote'
    , 'getNote'
    , 'updateNote'
    , 'merge'
  ]
  , repositoryFiles: []
  , repositoryBranches: [
    'protect'
    , 'unprotect'
   ]
  , repository: [
    'getBranches'
    , 'protectBranch'
    , 'unprotectBranch'
    , 'getBranch'
    , 'getTags'
    , 'getCommits'
    , 'getTree'
    , 'getBlob'
    , 'archive'
    , 'compare'
  ]
  , issues: [
    'listNotes'
    , 'createNote'
    , 'getNote'
    , 'updateNote'
  ]
  , projects: [
    'getByPath'
    , 'listEvents'
    , 'fork'
    , 'search'
   ]
  , deployKeys: []
  , projectMembers: []
  , groups: [
    'transferProject'
  ]
  , groupMembers: [],
};

for (let key in properties) {
  let methods = properties[key];
  properties[key] = defaultMethods.concat(methods);
}

module.exports = properties;
