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
var Hook = require('./hook');
var Issue = require('./issue');
var User = require('./user');
var Repository = require('./repository');

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
  this.constructor.super_.call(this, options);

  this.privateToken = options.privateToken;

  this.milestones = new Milestone(this);
  this.members = new Member(this);
  this.hooks = new Hook(this);
  this.issues = new Issue(this);
  this.users = new User(this);

  this.addResources({
    projects: Project,
    repository: Repository,
  });
}

util.inherits(Gitlab, restful.RESTFulClient);

Gitlab.prototype.setAuthentication = function (req) {
  req.params.data.private_token = req.params.data.private_token || this.privateToken;
  return req;
};

exports.create = function (options) {
  return new Gitlab(options);
};
