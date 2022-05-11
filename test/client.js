/**!
 * gitlab - test/client.js
 *
 * Copyright(c) fengmk2 and other contributors.
 * MIT Licensed
 *
 * Authors:
 *   fengmk2 <fengmk2@gmail.com> (http://fengmk2.com)
 */

'use strict';

/**
 * Module dependencies.
 */

let objectid = require('objectid');

let gitlab = require('../');
let config = require('./config');

let client = gitlab.create(config);

client.createProject = function(callback) {
  client.projectName = 'node-gitlab-test-' + objectid();
  client._list((err) => {
    if (err) {
      return client._create(callback);
    }
    callback();
  });
};

client._list = function(callback) {
  client.request('get', '/projects', {}, (err, repos) => {
    if (err) {
      return callback(err);
    }
    for (let i = 0; i < repos.length; i++) {
      if (repos[i].name.indexOf('node-gitlab-test') === 0) {
        client.projectName = repos[i].name;
        client.id = repos[i].id;
        return callback();
      }
    }
    return callback(new Error('not found'));
  });
};

client._create = function(callback) {
  client.projectName = 'node-gitlab-test-' + objectid();
  client.projects.create({
    name: client.projectName
    , issues_enabled: true
    , merge_requests_enabled: true
    , public: true
  }, (err, data) => {
    if (err) {
      return callback(err);
    }
    client.id = data.id;
    callback(err, data);
  });
};

client.removeProject = function(callback) {
  if (!client.id) {
    return callback();
  }
  client.projects.remove({
    id: client.id
  }, () => {
    delete client.id;
    callback();
  });
};

client.promise = gitlab.createPromise(config);
client.thunk = gitlab.createThunk(config);

module.exports = client;
