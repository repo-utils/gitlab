/*!
 * gitlab - lib/gitlab.js
 * Copyright(c) 2012 - 2013 fengmk2 <fengmk2@gmail.com>
 * MIT Licensed
 */

"use strict";

/**
 * Module dependencies.
 */

var debug = require('debug')('gitlab');
var restful = require('restful-client');
var util = require('util');
var Milestone = require('./milestone');
var Project = require('./project');
var Member = require('./member');
var GlobalHook = require('./globalHook.js');
var Issue = require('./issue');
var User = require('./user');
var Repository = require('./repository');
var MergeRequest = require('./merge_request');
var RepositoryFile = require('./repository_file');

module.exports = Gitlab;

/**
 * Create a gitlab API client.
 *
 * @param {Object} options
 *  - {String} api, api root url, e.g.: 'http://gitlab.com/api/v3'
 *  - {String} privateToken, You can find or reset your private token in your profile.
 */
function Gitlab(options) {
  options = options || {};
  options.api = options.api || 'https://gitlab.com/api/v3';
  restful.RESTFulClient.call(this, options);

  this.privateToken = options.privateToken;

  this.addResources({
    projects: Project,
    repository: Repository,
    repositoryFiles: RepositoryFile,
    mergeRequests: MergeRequest,
    users: User,
    issues: Issue,
    globalHooks: GlobalHook,
    members: Member,
    milestones: Milestone,
    hooks: {
      resourcePath: '/projects/:id/hooks',
      idName: 'hook_id',
    },
    groupMembers: {
      resourcePath: '/groups/:id/members',
      idName: 'user_id',
    },
  });

  this.merge_requests = this.mergeRequests;
}

util.inherits(Gitlab, restful.RESTFulClient);

Gitlab.prototype.setAuthentication = function (req) {
  req.params.data.private_token = req.params.data.private_token || this.privateToken;
  return req;
};

Gitlab.create = function (options) {
  return new Gitlab(options);
};
