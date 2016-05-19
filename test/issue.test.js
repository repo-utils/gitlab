/*!
 * gitlab - test/issue.test.js
 * Copyright(c) 2012 fengmk2 <fengmk2@gmail.com>
 * MIT Licensed
 */

"use strict";

/**
 * Module dependencies.
 */

var client = require('./client');
var should = require('should');

var issueId;
describe('issue.test.js', function () {
  before(function (done) {
    client.createProject(function (err) {
      client.issues.create({
        id: client.id,
        title: 'test title ' + new Date(),
        description: '测试 `markdown` \n [abc](/abc)',
        labels: 'test,gitlabapi'
      }, function (err, data) {
        if (err) {
          return done(err);
        }
        issueId = data.id;
        done();
      });
    });
  });

  after(client.removeProject);

  describe('client.issues.get()', function () {
    it('should return a issue', function (done) {
      client.issues.get({id: client.id, issue_id: issueId}, function (err, row) {
        should.not.exists(err);
        row.id.should.equal(issueId);
        row.should.have.keys('id', 'iid', 'project_id', 'title', 'description', 'labels',
          'milestone', 'assignee', 'author', 'state', 'updated_at', 'created_at', 
          'subscribed', 'user_notes_count');
        done();
      });
    });

    it('should return issue with promise way', function (done) {
      client.promise.issues.get({id: client.id, issue_id: issueId})
      .then(function (row) {
        row.id.should.equal(issueId);
        row.should.have.keys('id', 'iid', 'project_id', 'title', 'description', 'labels',
          'milestone', 'assignee', 'author', 'state', 'updated_at', 'created_at', 
          'subscribed', 'user_notes_count');
        done();
      })
      .catch(done);
    });

    it('should return issue with thunk way', function* () {
      var row = yield client.thunk.issues.get({id: client.id, issue_id: issueId});
      row.id.should.equal(issueId);
      row.should.have.keys('id', 'iid', 'project_id', 'title', 'description', 'labels',
        'milestone', 'assignee', 'author', 'state', 'updated_at', 'created_at', 
        'subscribed', 'user_notes_count');
    });
  });

  describe('client.issues.list()', function () {

    it('should return issues', function (done) {
      client.issues.list({id: client.id}, function (err, issues) {
        should.not.exists(err);
        issues.length.should.above(0);
        var row = issues[0];
        row.should.have.keys('id', 'iid', 'project_id', 'title', 'description', 'labels',
          'milestone', 'assignee', 'author', 'state', 'updated_at', 'created_at',
          'subscribed', 'user_notes_count');
        done();
      });
    });

  });

  describe('client.issues.create(), update()', function () {
    it('should create, update a issue', function (done) {
      client.issues.create({
        id: client.id,
        title: 'test title ' + new Date(),
        description: '测试 `markdown` \n [abc](/abc)',
        assignee_id: 142,
        milestone_id: 117,
        labels: 'test,gitlabapi'
      }, function (err, row) {
        should.not.exists(err);
        row.project_id.should.equal(client.id);
        row.state.should.equal('opened');
        client.issues.update({
          id: client.id,
          issue_id: row.id,
          title: row.title + ' update',
          state_event: 'close',
        }, function (err, row) {
          should.not.exists(err);
          row.title.should.containEql(' update');
          row.state.should.equal('closed');
          done();
        });
      });
    });

    it('should update a close, reopen and close issue', function (done) {
      client.issues.update({
        id: client.id,
        issue_id: issueId,
        description: 'need to be closed!',
        state_event: 'close',
      }, function (err, row) {
        should.not.exists(err);
        row.state.should.equal('closed');
        client.issues.update({
          id: client.id,
          issue_id: issueId,
          description: 'need to be reopen!',
          state_event: 'reopen',
        }, function (err, row) {
          should.not.exists(err);
          row.state.should.equal('reopened');
          done();
        });
      });
    });
  });

  describe('client.issues.listNotes()', function () {
    it('should return issue\'s notes', function (done) {
      client.issues.listNotes({id: client.id, issue_id: issueId}, function (err, rows) {
        should.not.exists(err);
        rows.length.should.above(0);
        var row = rows[0];
        row.should.have.keys('id', 'body', 'author', 'created_at', 'attachment',
             'updated_at', 'system', 'noteable_id', 'noteable_type', 'upvote', 'downvote');
        done();
      });
    });

    it('should return issue\'s notes in thunk way', function* () {
      var rows = yield client.thunk.issues.listNotes({id: client.id, issue_id: issueId});
      rows.length.should.above(0);
      var row = rows[0];
      row.should.have.keys('id', 'body', 'author', 'created_at', 'attachment',
             'updated_at', 'system', 'noteable_id', 'noteable_type', 'upvote', 'downvote');
    });
  });

  describe('client.issues.createNote()', function () {
    it('should create to note', function (done) {
      client.issues.createNote({
        id: client.id, issue_id: issueId, body: '# h1 哈哈\n fixed #1098, fix #1098 fixes #1098'
      }, done);
    });
  });

});
