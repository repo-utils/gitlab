/**!
 * node-gitlab - test/hook.test.js
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

var should = require('should');
var client = require('./client');

var hookId;
describe('hook.test.js', function () {
  before(function (done) {
    client.createProject(function (err) {
      client.hooks.create({
        id: client.id,
        url: 'http://gitlab.com/help/api'
      }, function (err, data) {
        if (err) {
          return done(err);
        }
        hookId = data.id;
        done();
      });
    });
  });

  after(function (done) {
    client.hooks.remove({
      id: client.id,
      hook_id: hookId
    }, function (err) {
      should.not.exist(err);
      client.removeProject(function () {
        done();
      });
    });
  });

  describe('client.hooks.get()', function () {
    it('should return a hook', function* () {
      var hook = yield client.thunk.hooks.get({ id: client.id, hook_id: hookId });
      hook.id.should.equal(hookId);
      hook.should.have.properties('id', 'url', 'created_at', 'project_id',
        'push_events', 'issues_events', 'merge_requests_events', 'tag_push_events');
      hook.push_events.should.be.a.Boolean;
    });
  });

  describe('client.hooks.list()', function () {
    it('should return hooks', function* () {
      var hooks = yield client.thunk.hooks.list({id: client.id});
      hooks.length.should.above(0);
      var hook = hooks[0];
      hook.should.have.properties('id', 'url', 'created_at', 'project_id',
        'push_events', 'issues_events', 'merge_requests_events', 'tag_push_events');
    });
  });

  describe('client.hooks.create(), update(), remove()', function () {
    it('should create, update, remove a hook', function* () {
      var hook = yield client.thunk.hooks.create({
        id: client.id,
        url: 'http://gitlab.com/help/api'
      });
      hook.url.should.equal('http://gitlab.com/help/api');

      var hook = yield client.thunk.hooks.update({
        id: client.id,
        hook_id: hook.id,
        url: hook.url + '/update',
        merge_requests_events: true,
        push_events: true,
        issues_events: true,
        tag_push_events: true,
      });
      hook.url.should.equal('http://gitlab.com/help/api/update');
      hook.merge_requests_events.should.equal(true);
      hook.push_events.should.equal(true);
      hook.issues_events.should.equal(true);
      hook.tag_push_events.should.equal(true);

      // url required
      try {
        yield client.thunk.hooks.update({
          id: client.id,
          hook_id: hook.id,
          issues_events: false,
        });
        throw new Error('should not run this');
      } catch (err) {
        err.name.should.equal('Gitlab400Error');
        err.message.should.containEql('400 (Bad request) "url" not given');
      }

      yield client.thunk.hooks.remove({id: client.id, hook_id: hook.id});

      var hook = yield client.thunk.hooks.get({id: client.id, hook_id: hook.id});
      should.not.exist(hook);
    });
  });
});
