/**!
 * gitlab - lib/resources/index.js
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

module.exports = {
  projects: require('./project'),

  projectMembers: {
    resourcePath: '/projects/:id/members',
    idName: 'user_id',
  },

  repository: require('./repository'),

  repositoryBranches: require('./repository_branch'),

  repositoryFiles: {
    resourcePath: '/projects/:id/repository/files'
  },

  mergeRequests: require('./merge_request'),

  users: {
    resourcePath: '/users',
    idName: 'user_id'
  },

  issues: require('./issue'),

  globalHooks: {
    resourcePath: '/hooks',
    idName: 'hook_id'
  },

  milestones: require('./milestone'),

  hooks: {
    resourcePath: '/projects/:id/hooks',
    idName: 'hook_id',
  },

  groups: require('./group'),

  groupMembers: {
    resourcePath: '/groups/:id/members',
    idName: 'user_id',
  },

  deployKeys: {
    resourcePath: '/projects/:id/keys',
    idName: 'key_id',
  },
};
