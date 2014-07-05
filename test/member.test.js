/*!
 * gitlab - test/member.test.js
 * Copyright(c) 2012 fengmk2 <fengmk2@gmail.com>
 * MIT Licensed
 */

"use strict";

/**
 * Module dependencies.
 */

var client = require('./client');
var should = require('should');
var pedding = require('pedding');

describe('member.test.js', function () {
  before(function (done) {
    done = pedding(2, done);
    client.createProject(function (err) {
      if (err) {
        return done(err);
      }
      client.members.create({
        id: client.id,
        user_id: 5,
        access_level: 10
      }, done);
      client.members.create({
        id: client.id,
        user_id: 6,
        access_level: 10
      }, done);
    });
  });
  after(client.removeProject);
  describe('client.members.get()', function () {
    it('should return a member', function (done) {
      client.members.get({id: client.id, user_id: 5}, function (err, member) {
        should.not.exists(err);
        member.should.have.keys('id', 'username', 'name', 'state', 'access_level', 'avatar_url');
        done();
      });
    });

  });

  describe('client.members.list()', function () {

    it('should return members', function (done) {
      client.members.list({id: client.id, per_page: 2}, function (err, members) {
        should.not.exists(err);
        members.should.length(2);
        var member = members[0];
        member.should.have.keys('id', 'username', 'name', 'state', 'access_level', 'avatar_url');
        done();
      });
    });

  });

});
