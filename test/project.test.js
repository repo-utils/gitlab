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
  before(client.createProject);
  after(client.removeProject);

  describe('client.projects.get()', function () {

    it('should return a project', function (done) {
      client.projects.get({id: client.id}, function (err, project) {
        should.not.exists(err);
        project.should.have.keys('id', 'name', 'description', 'default_branch',
          'owner',
          'ssh_url_to_repo', 'http_url_to_repo',
          'web_url',
          'public', 'path', 'path_with_namespace', 'name_with_namespace', 'namespace',
          'issues_enabled', 'merge_requests_enabled',
          'wiki_enabled', 'created_at', 'last_activity_at',
          'archived', 'visibility_level', 'snippets_enabled', 'permissions');
        project.owner.should.have.keys('id', 'username', 'name', 'state', 'avatar_url');
        done();
      });
    });

  });

  describe('client.projects.list()', function () {

    it('should return projects', function (done) {
      client.projects.list({per_page: 1}, function (err, projects) {
        should.not.exists(err);
        projects.should.length(1);
        var project = projects[0];
        // project.should.have.keys('id', 'name', 'description', 'default_branch',
        //   'owner',
        //   'public', 'path', 'path_with_namespace', 'namespace',
        //   'issues_enabled', 'merge_requests_enabled', 'wall_enabled',
        //   'wiki_enabled', 'created_at');
        project.owner.should.have.keys('id', 'username', 'name', 'state', 'avatar_url');
        done();
      });
    });

  });

  describe('client.projects.getByPath()', function () {
    it('should return a project by path', function (done) {
      client.projects.getByPath({path: 'fengmk2/node-gitlab-test'}, function (err, project) {
        should.not.exists(err);
        project.path_with_namespace.should.equal('fengmk2/gitlab');
        project.should.have.keys('id', 'name', 'description', 'default_branch',
          'owner',
          'ssh_url_to_repo', 'http_url_to_repo',
          'web_url',
          'public', 'path', 'path_with_namespace', 'name_with_namespace', 'namespace',
          'issues_enabled', 'merge_requests_enabled',
          'wiki_enabled', 'created_at', 'last_activity_at',
          'archived', 'visibility_level', 'snippets_enabled');
        done();
      });
    });
  });

});
