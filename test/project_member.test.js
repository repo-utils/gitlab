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

let client = require('./client');
let should = require('should');
let pedding = require('pedding');

describe('project_member.test.js', () => {
  before((done) => {
    done = pedding(2, done);
    client.createProject((err) => {
      if (err) {
        return done(err);
      }
      client.projectMembers.create({
        id: client.id
        , user_id: 5
        , access_level: 10
      }, done);
      client.projectMembers.create({
        id: client.id
        , user_id: 6
        , access_level: 10
      }, done);
    });
  });

  after(client.removeProject);

  describe('client.projectMembers.get()', () => {
    it('should return a member', (done) => {
      client.projectMembers.get({id: client.id, user_id: 5}, (err, member) => {
        should.not.exists(err);
        member.should.have.keys('id', 'username', 'name', 'state', 'access_level', 'avatar_url', 'web_url',
          'expires_at');
        done();
      });
    });

  });

  describe('client.projectMembers.list()', () => {

    it('should return members', (done) => {
      client.projectMembers.list({id: client.id, per_page: 2}, (err, members) => {
        should.not.exists(err);
        members.should.length(2);
        let member = members[0];
        member.should.have.keys('id', 'username', 'name', 'state', 'access_level', 'avatar_url', 'web_url',
          'expires_at');
        done();
      });
    });

  });

});
