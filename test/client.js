/**!
 * gitlab - test/client.js
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

var gitlab = require('../');
var config = require('./config');

var client = gitlab.create(config);

client.createProject = function (callback) {
  client._list(function (err) {
    if (err) {
      return client._create(callback);
    }
    callback();
  });
};

client._list = function (callback) {
  client.request('get', '/projects', {}, function (err, repos) {
    if (err) {
      return callback(err);
    }
    for (var i = 0; i < repos.length; i++) {
      if (repos[i].name === 'node-gitlab-test') {
        client.id = repos[i].id;
        return callback();
      }
    }
    return callback(new Error('not found'));
  });
};

client._create = function(callback) {
  client.projects.create({
    name: 'node-gitlab-test',
    issues_enabled: true,
    merge_requests_enabled: true,
    public: true
  }, function (err, data) {
    if (err) {
      return callback(err);
    }
    client.id = data.id;
    callback(err, data);
  });
};

client.removeProject = function (callback) {
  client.projects.remove({
    id: client.id
  }, callback);
};

client.promise = gitlab.createPromise(config);
client.thunk = gitlab.createThunk(config);

module.exports = client;
