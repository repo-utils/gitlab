/**!
 * node-gitlab - test/hook.test.js
 *
 * Copyright(c) repo-utils and other contributors.
 * MIT Licensed
 *
 * Authors:
 *   fengmk2 <m@fengmk2.com> (http://fengmk2.com)
 */
/* eslint-disable no-unused-expressions */
'use strict';

/**
 * Module dependencies.
 */

let should = require('should');
let client = require('./client');

let hookId;
describe('hook.test.js', () => {
  before((done) => {
    client.createProject((err) => {
      client.hooks.create({
        id: client.id
        , url: 'http://gitlab.com/help/api'
      }, (err, data) => {
        if (err) {
          return done(err);
        }
        hookId = data.id;
        done();
      });
    });
  });

  after((done) => {
    client.hooks.remove({
      id: client.id
      , hook_id: hookId
    }, (err) => {
      should.not.exist(err);
      client.removeProject(() => {
        done();
      });
    });
  });

  describe('client.hooks.get()', () => {
    it('should return a hook', function* () {
      let hook = yield client.thunk.hooks.get({id: client.id, hook_id: hookId});
      hook.id.should.equal(hookId);
      hook.should.have.keys('id', 'url', 'created_at', 'project_id', 'push_events',
          'issues_events', 'merge_requests_events', 'tag_push_events', 'note_events',
          'build_events', 'enable_ssl_verification', 'pipeline_events', 'wiki_page_events');
      hook.push_events.should.be.a.Boolean;
    });
  });

  describe('client.hooks.list()', () => {
    it('should return hooks', function* () {
      let hooks = yield client.thunk.hooks.list({id: client.id});
      hooks.length.should.above(0);
      let hook = hooks[0];
      hook.should.have.keys('id', 'url', 'created_at', 'project_id',
          'push_events', 'issues_events', 'merge_requests_events',
          'tag_push_events', 'note_events', 'build_events',
          'enable_ssl_verification', 'pipeline_events', 'wiki_page_events');
    });
  });

  describe('client.hooks.create(), update(), remove()', () => {
    it('should create, update, remove a hook', function* () {
      let hook = yield client.thunk.hooks.create({
        id: client.id
        , url: 'http://gitlab.com/help/api'
      });
      hook.url.should.equal('http://gitlab.com/help/api');

      hook = yield client.thunk.hooks.update({
        id: client.id
        , hook_id: hook.id
        , url: hook.url + '/update'
        , merge_requests_events: true
        , push_events: true
        , issues_events: true
        , tag_push_events: true,
      });
      hook.url.should.equal('http://gitlab.com/help/api/update');
      hook.merge_requests_events.should.equal(true);
      hook.push_events.should.equal(true);
      hook.issues_events.should.equal(true);
      hook.tag_push_events.should.equal(true);

      // url required
      try {
        yield client.thunk.hooks.update({
          id: client.id
          , hook_id: hook.id
          , issues_events: false,
        });
        throw new Error('should not run this');
      } catch (err) {
        err.name.should.equal('Gitlab400Error');
        err.message.should.containEql('400 (Bad request) "url" not given');
      }

      yield client.thunk.hooks.remove({id: client.id, hook_id: hook.id});

      try {
        let hook = yield client.thunk.hooks.get({id: client.id, hook_id: hook.id});
      } catch (err) {
        err.name.should.equal('Gitlab404Error');
      }
    });
  });
});
