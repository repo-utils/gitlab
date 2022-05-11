/**!
 * gitlab - test/gitlab.test.js
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

let should = require('should');
let client = require('./client');

describe('gitlab.test.js', () => {
  describe('Client.request()', () => {
    it('should request success', (done) => {
      client.request('get', '/projects', {}, (err, projects) => {
        should.not.exists(err);
        projects.length.should.above(0);
        done();
      });
    });

    it('should request with promise way success', (done) => {
      client.promise.request('get', '/projects', {})
        .then((projects) => {
          projects.length.should.above(0);
          done();
        })
        .catch(done);
    });

    it('should request with thunk way success', function* () {
      let projects = yield client.thunk.request('get', '/projects', {});
      projects.length.should.above(0);
    });

    it('should request 404 error', (done) => {
      client.request('get', '/projects/:id/milestones', {id: 99999999}, (err, milestones) => {
        should.exists(err);
        should.not.exists(milestones);
        done();
      });
    });

    it('should request 401 error when token wrong', (done) => {
      client.request('get', '/projects/:id/milestones', {id: 223, private_token: 'wrong'}, (err, milestones) => {
        should.exists(err);
        err.name.should.equal('Gitlab401Error');
        err.message.should.containEql('401 Unauthorized');
        should.not.exists(milestones);
        done();
      });
    });

    it.skip('should request 405 error when method wrong', (done) => {
      client.request('post', '/projects/:id/milestones/:milestone_id', {id: 1909028, milestone_id: 120370, title: '123'},
      (err, milestones) => {
        should.exists(err);
        err.name.should.equal('Gitlab405Error');
        err.message.should.containEql('Unknow Error 405');
        should.not.exists(milestones);
        done();
      });
    });
  });
});
