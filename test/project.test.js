/*!
 * gitlab - test/project.test.js
 * Copyright(c) 2012 fengmk2 <fengmk2@gmail.com>
 * MIT Licensed
 */

"use strict";

/**
 * Module dependencies.
 */

var client = require('./client');
var should = require('should');

describe('project.test.js', function () {

  describe('client.projects.get()', function () {

    it('should return a project', function (done) {
      client.projects.get({id: 223}, function (err, project) {
        should.not.exists(err);
        project.should.have.keys('id', 'name', 'description', 'default_branch',
          'owner', 'private', 'issues_enabled', 'merge_requests_enabled', 'wall_enabled',
          'wiki_enabled', 'created_at');
        project.owner.should.have.keys('id', 'username', 'email', 'name', 'blocked', 'created_at');
        done();
      });
    });

  });

  describe('client.projects.list()', function () {

    it('should return projects', function (done) {
      client.projects.list({per_page: 5}, function (err, projects) {
        should.not.exists(err);
        projects.should.length(5);
        var project = projects[0];
        project.should.have.keys('id', 'name', 'description', 'default_branch',
          'owner', 'private', 'issues_enabled', 'merge_requests_enabled', 'wall_enabled',
          'wiki_enabled', 'created_at');
        project.owner.should.have.keys('id', 'username', 'email', 'name', 'blocked', 'created_at');
        done();
      });
    });

  });

  describe('client.projects.getByPath()', function () {
    it('should return a project by path', function (done) {
      client.projects.getByPath({path: 'edp/alimovie'}, function (err, project) {
        should.not.exists(err);
        project.should.have.keys('created_at', 'default_branch', 'description', 'id',
          'issues_enabled', 'merge_requests_enabled', 'name', 'namespace_id',
          'owner_id', 'path', 'private_flag', 'updated_at', 'wall_enabled', 'wiki_enabled');
        done();
      });
    });
  });

});