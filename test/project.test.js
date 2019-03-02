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

let client = require('./client');
let should = require('should');

describe('project.test.js', () => {
  before(client.createProject);
  after(client.removeProject);

  describe('client.projects.get()', () => {

    it('should return a project', (done) => {
      client.projects.get({id: client.id}, (err, project) => {
        should.not.exists(err);
        project.should.have.keys('id', 'name', 'description', 'default_branch',
          'owner',
          'ssh_url_to_repo', 'http_url_to_repo',
          'web_url',
          'public', 'path', 'path_with_namespace', 'name_with_namespace', 'namespace',
          'issues_enabled', 'merge_requests_enabled',
          'wiki_enabled', 'created_at', 'last_activity_at',
          'archived', 'visibility_level', 'snippets_enabled', 'permissions',
					'tag_list', 'builds_enabled', 'shared_runners_enabled', 'creator_id',
				  'avatar_url', 'star_count', 'forks_count', 'open_issues_count',
					'runners_token', 'public_builds', 'container_registry_enabled', 'lfs_enabled', 'shared_with_groups',
          'only_allow_merge_if_build_succeeds', 'request_access_enabled');
        project.owner.should.have.keys('id', 'username', 'name', 'state', 'avatar_url',
					'web_url');
        done();
      });
    });

  });

  describe('client.projects.list()', () => {

    it('should return projects', (done) => {
      client.projects.list({per_page: 1}, (err, projects) => {
        should.not.exists(err);
        projects.should.length(1);
        let project = projects[0];
        // project.should.have.keys('id', 'name', 'description', 'default_branch',
        //   'owner',
        //   'public', 'path', 'path_with_namespace', 'namespace',
        //   'issues_enabled', 'merge_requests_enabled', 'wall_enabled',
        //   'wiki_enabled', 'created_at');
        project.owner.should.have.keys('id', 'username', 'name', 'state', 'avatar_url',
					'web_url');
        done();
      });
    });

  });

  describe('listEvents()', () => {
    it('should list current project events', function* () {
      let events = yield client.thunk.projects.listEvents({id: client.id});
      events.length.should.above(0);
      events[0].action_name.should.equal('created');
    });
  });

  /*eslint no-mixed-spaces-and-tabs: ["error", "smart-tabs"]*/
  describe('search()', () => {
    it('should search and list projects', function* () {
      let projects = yield client.thunk.projects.search({
        query: client.projectName
      });
      projects.length.should.equal(1);
      projects[0].name.should.equal(client.projectName);
    });
  });

});
