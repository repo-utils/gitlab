/**!
 * gitlab - lib/resources/index.js
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

module.exports = {
  projects: require('./project'),
  projectMembers: {
    resourcePath: '/projects/:id/members',
    idName: 'user_id',
  },

  repository: require('./repository'),
  repositoryFiles: {
    resourcePath: '/projects/:id/repository/files'
  },

  mergeRequests: {
    resourcePath: '/projects/:id/merge_request',
    idName: 'merge_request_id'
  },

  users: {
    resourcePath: '/users',
    idName: 'user_id'
  },

  issues: require('./issue'),
  globalHooks: {
    resourcePath: '/hooks',
    idName: 'hook_id'
  },


  milestones: {
    resourcePath: '/projects/:id/milestones',
    idName: 'milestone_id'
  },
  hooks: {
    resourcePath: '/projects/:id/hooks',
    idName: 'hook_id',
  },

  groups: require('./group'),
  groupMembers: {
    resourcePath: '/groups/:id/members',
    idName: 'user_id',
  },
};
