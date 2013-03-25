/*!
 * gitlab - lib/gitlab.js
 * Copyright(c) 2012 fengmk2 <fengmk2@gmail.com>
 * MIT Licensed
 */

"use strict";

/**
 * Module dependencies.
 */

var urllib = require('urllib');
var Milestone = require('./milestone');
var Project = require('./project');
var Member = require('./member');
var Hook = require('./hook');
var Issue = require('./issue');

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
  data.private_token = this.privateToken;
  var url = this.api + pathname;
  urllib.request(url, {
    type: method, 
    dataType: 'json',
    data: data,
  }, function (err, result, res) {
    if (err) {
      if (err.name === 'SyntaxError') {
        err.name = 'Gitlab' + res.statusCode + 'Error';
        if (res) {
          err.message = res.headers.status;
        }
      } else {
        err.name = 'Gitlab' + err.name;
      }
      err.headers = res && res.headers;
      err.data = Buffer.isBuffer(result) ? result.toString() : result;
      err.statusCode = res && res.statusCode;
      err.method = method;
      err.url = url;
      err.requestData = data;
      return callback(err);
    }
    if (res.statusCode !== 200 && res.statusCode !== 201) {
      err = new Error(result ? result.message : 'Unknow Error ' + res.statusCode);
      err.name = 'Gitlab' + res.statusCode + 'Error';
      err.data = result;
      err.headers = res.headers;
      err.statusCode = res.statusCode;
      err.method = method;
      err.url = url;
      err.requestData = data;
      return callback(err);
    }
    callback(null, result);
  });
};

exports.create = function (options) {
  return new Client(options);
};