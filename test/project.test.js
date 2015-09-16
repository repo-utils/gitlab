/**!
 * node-gitlab - test/project.test.js
 *
 * Copyright(c) repo-utils and other contributors.
 * MIT Licensed
 *
 * Authors:
 *   fengmk2 <m@fengmk2.com> (http://fengmk2.com)
 */

'use strict';

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
        project.should.have.properties('id', 'name', 'description', 'default_branch',
          'owner',
          'ssh_url_to_repo', 'http_url_to_repo',
          'web_url',
          'public', 'path', 'path_with_namespace', 'name_with_namespace', 'namespace',
          'issues_enabled', 'merge_requests_enabled',
          'wiki_enabled', 'created_at', 'last_activity_at',
          'archived', 'visibility_level', 'snippets_enabled', 'permissions');
        project.owner.should.have.properties('id', 'username', 'name', 'state', 'avatar_url');
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
        // project.should.have.properties('id', 'name', 'description', 'default_branch',
        //   'owner',
        //   'public', 'path', 'path_with_namespace', 'namespace',
        //   'issues_enabled', 'merge_requests_enabled', 'wall_enabled',
        //   'wiki_enabled', 'created_at');
        project.owner.should.have.properties('id', 'username', 'name', 'state', 'avatar_url');
        done();
      });
    });

  });

  describe('listEvents()', function () {
    it('should list current project events', function* () {
      var events = yield client.thunk.projects.listEvents({id: client.id});
      events.length.should.above(0);
      events[0].action_name.should.equal('created');
    });
  });

  describe('search()', function () {
    it('should search and list projects', function* () {
      var projects = yield client.thunk.projects.search({
        query: 'node-gitlab-test'
      });
      projects.length.should.equal(1);
      projects[0].name.should.equal('node-gitlab-test');
    });
  });

  describe.skip('client.projects.getByPath()', function () {
    it('should return a project by path', function (done) {
      client.projects.getByPath({path: 'fengmk2/node-gitlab-test'}, function (err, project) {
        should.not.exists(err);
        project.id.should.equal(1040);
        // project.should.have.properties('created_at', 'default_branch', 'description', 'id',
        //   'issues_enabled', 'merge_requests_enabled', 'name', 'namespace_id',
        //   'creator_id', 'snippets_enabled', 'public',
        //   'issues_tracker_id', 'issues_tracker', 'last_activity_at',
        //   'path', 'private_flag', 'updated_at', 'wall_enabled', 'wiki_enabled');
        done();
      });
    });
  });

});
