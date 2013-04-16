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

describe('member.test.js', function () {

  describe('client.members.get()', function () {

    it('should return a member', function (done) {
      client.members.get({id: 223, user_id: 142}, function (err, member) {
        should.not.exists(err);
        member.should.have.keys('id', 'username', 'email', 'name', 'state', 'created_at', 'access_level');
        done();
      });
    });

  });

  describe('client.members.list()', function () {

    it('should return members', function (done) {
      client.members.list({id: 365, per_page: 5}, function (err, members) {
        should.not.exists(err);
        members.should.length(5);
        var member = members[0];
        member.should.have.keys('id', 'username', 'email', 'name', 'state', 'created_at', 'access_level');
        done();
      });
    });

  });

});