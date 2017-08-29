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

var should = require('should');
var client = require('./client');
var gitlab = require('../');

describe('gitlab.test.js', function () {
  describe('setAuthentication', function () {
    var req = {};
    beforeEach(function () {
      req = {
        params: {
          data: {}
        }
      }
    });

    it('should default to using a private token', function() {
      var privateToken = 'private';
      gitlab.prototype.setAuthentication.call({
        privateToken: privateToken
      }, req);

      req.params.data.private_token.should.equal(privateToken);
      req.params.data.should.not.have.keys('access_token');
    });

    it('should use access token if provided', function() {
      var accessToken = 'access';
      gitlab.prototype.setAuthentication.call({
        accessToken: accessToken
      }, req);

      req.params.data.access_token.should.equal(accessToken);
      req.params.data.should.not.have.keys('private_token');
    });

    it('should prefer already passed private token on the request object', function() {
      var privateToken = 'private';
      var existingPrivateToken = 'already-private';

      req.params.data.private_token = existingPrivateToken;
      gitlab.prototype.setAuthentication.call({
        privateToken: privateToken
      }, req);

      req.params.data.private_token.should.equal(existingPrivateToken);
      req.params.data.should.not.have.keys('access_token');
    });

    it('should prefer already passed access token on the request object', function() {
      var accessToken = 'access';
      var existingAccessToken = 'already-access';

      req.params.data.access_token = existingAccessToken;
      gitlab.prototype.setAuthentication.call({
        accessToken: accessToken
      }, req);

      req.params.data.access_token.should.equal(existingAccessToken);
      req.params.data.should.not.have.keys('private_token');
    });
  });

  describe('Client.request()', function () {
    it('should request success', function (done) {
      client.request('get', '/projects', {}, function (err, projects) {
        should.not.exists(err);
        projects.length.should.above(0);
        done();
      });
    });

    it('should request with promise way success', function (done) {
      client.promise.request('get', '/projects', {})
        .then(function (projects) {
          projects.length.should.above(0);
          done();
        })
        .catch(done);
    });

    it('should request with thunk way success', function* () {
      var projects = yield client.thunk.request('get', '/projects', {});
      projects.length.should.above(0);
    });

    it('should request 404 error', function (done) {
      client.request('get', '/projects/:id/milestones', {id: 99999999}, function (err, milestones) {
        should.exists(err);
        should.not.exists(milestones);
        done();
      });
    });

    it('should request 401 error when token wrong', function (done) {
      client.request('get', '/projects/:id/milestones', {id: 223, private_token: 'wrong'}, function (err, milestones) {
        should.exists(err);
        err.name.should.equal('Gitlab401Error');
        err.message.should.containEql('401 Unauthorized');
        should.not.exists(milestones);
        done();
      });
    });

    it.skip('should request 405 error when method wrong', function (done) {
      client.request('post', '/projects/:id/milestones/:milestone_id', {id: 1909028, milestone_id: 120370, title: '123'},
      function (err, milestones) {
        should.exists(err);
        err.name.should.equal('Gitlab405Error');
        err.message.should.containEql('Unknow Error 405');
        should.not.exists(milestones);
        done();
      });
    });
  });
});
