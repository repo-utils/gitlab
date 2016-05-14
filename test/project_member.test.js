/**!
 * node-gitlab - test/project_member.test.js
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
var pedding = require('pedding');

describe('project_member.test.js', function () {
  before(function (done) {
    done = pedding(2, done);
    client.createProject(function (err) {
      if (err) {
        return done(err);
      }
      client.projectMembers.create({
        id: client.id,
        user_id: 5,
        access_level: 10
      }, done);
      client.projectMembers.create({
        id: client.id,
        user_id: 6,
        access_level: 10
      }, done);
    });
  });

  after(client.removeProject);

  describe('client.projectMembers.get()', function () {
    it('should return a member', function (done) {
      client.projectMembers.get({id: client.id, user_id: 5}, function (err, member) {
        should.not.exists(err);
        member.should.have.keys('id', 'username', 'name', 'state', 'access_level', 'avatar_url', 'web_url');
        done();
      });
    });

  });

  describe('client.projectMembers.list()', function () {

    it('should return members', function (done) {
      client.projectMembers.list({id: client.id, per_page: 2}, function (err, members) {
        should.not.exists(err);
        members.should.length(2);
        var member = members[0];
        member.should.have.keys('id', 'username', 'name', 'state', 'access_level', 'avatar_url', 'web_url');
        done();
      });
    });

  });

});
