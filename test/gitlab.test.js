/*!
 * gitlab - test/gitlab.test.js
 * Copyright(c) 2012 fengmk2 <fengmk2@gmail.com>
 * MIT Licensed
 */

"use strict";

/**
 * Module dependencies.
 */

var client = require('./client');
var should = require('should');

describe('gitlab.test.js', function () {

  describe('Client.request()', function () {
    it('should request success', function (done) {
      client.request('get', '/projects/:id/milestones', {id: 223}, function (err, milestones) {
        should.not.exists(err);
        milestones.length.should.above(0);
        done();
      });
    });

    it('should request 404 error', function (done) {
      client.request('get', '/projects/:id/milestones', {id: 99999999}, function (err, milestones) {
        should.exists(err);
        err.name.should.equal('Gitlab404Error');
        err.message.should.equal('404 Not Found');
        should.not.exists(milestones);
        done();
      });
    });

    it('should request 401 error when token wrong', function (done) {
      var token = client.privateToken;
      client.privateToken = 'wrongToken';
      client.request('get', '/projects/:id/milestones', {id: 223}, function (err, milestones) {
        client.privateToken = token;
        should.exists(err);
        err.name.should.equal('Gitlab401Error');
        err.message.should.equal('401 Unauthorized');
        should.not.exists(milestones);
        done();
      });
    });

    it('should request 405 error when method wrong', function (done) {
      client.request('post', '/projects/:id/milestones/:milestone_id', {id: 223, milestone_id: 76, title: '123'}, 
      function (err, milestones) {
        should.exists(err);
        err.name.should.equal('Gitlab405Error');
        err.message.should.equal('405 Method Not Allowed');
        should.not.exists(milestones);
        done();
      });
    });

  });

});