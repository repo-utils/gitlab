/*!
 * gitlab - lib/gitlab.js
 * Copyright(c) 2012 fengmk2 <fengmk2@gmail.com>
 * MIT Licensed
 */

"use strict";

/**
 * Module dependencies.
 */

var debug = require('debug')('gitlab');
var urllib = require('urllib');
var Milestone = require('./milestone');
var Project = require('./project');
var Member = require('./member');
var Hook = require('./hook');
var Issue = require('./issue');
var User = require('./user');

/**
 * Create a gitlab API client.
 * 
 * @param {Object} options
 *  - {String} api, api root url, e.g.: 'http://gitlab.com/api/v3'
 *  - {String} privateToken, You can find or reset your private token in your profile.
 */
function Client(options) {
  this.api = options.api;
  this.privateToken = options.privateToken;

  this.milestones = new Milestone(this);
  this.projects = new Project(this);
  this.members = new Member(this);
  this.hooks = new Hook(this);
  this.issues = new Issue(this);
  this.users = new User(this);
}

Client.prototype.request = function (method, pathname, data, callback) {
  var keys = pathname.match(/\:\w+/g);
  if (keys) {
    for (var i = 0; i < keys.length; i++) {
      var key = keys[i];
      var k = key.substring(1);
      var val = data[k];
      if (val !== undefined) {
        pathname = pathname.replace(key, val);
        delete data[k];
      }
    }
  }
  // support custom token
  if (data.private_token === undefined) {
    data.private_token = this.privateToken;
  }
  var url = this.api + pathname;
  urllib.request(url, {
    type: method, 
    dataType: 'json',
    data: data,
  }, function (err, result, res) {
    if (Buffer.isBuffer(result)) {
      result = result.toString();
    }
    debug('%s %s %j: status: %s, result: %j, err: %j', method, url, data, res.statusCode, result, err);
    if (err) {
      if (err.name === 'SyntaxError') {
        err.name = 'Gitlab' + res.statusCode + 'Error';
        if (res) {
          err.message = res.headers.status || 'Unknow Error ' + res.statusCode;
        }
      } else {
        err.name = 'Gitlab' + err.name;
      }
      err.headers = res && res.headers;
      err.data = { resBody: result, requestData: data };
      err.statusCode = res && res.statusCode;
      err.method = method;
      err.url = url;
      return callback(err);
    }
    if (res.statusCode !== 200 && res.statusCode !== 201) {
      err = new Error(result ? result.message : 'Unknow Error ' + res.statusCode);
      err.name = 'Gitlab' + res.statusCode + 'Error';
      err.data = { resBody: result, requestData: data };
      err.headers = res.headers;
      err.statusCode = res.statusCode;
      err.method = method;
      err.url = url;
      return callback(err);
    }
    callback(null, result);
  });
};

exports.create = function (options) {
  return new Client(options);
};
