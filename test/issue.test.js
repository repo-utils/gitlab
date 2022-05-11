/*!
 * gitlab - test/issue.test.js
 * Copyright(c) 2012 fengmk2 <fengmk2@gmail.com>
 * MIT Licensed
 */

"use strict";

/**
 * Module dependencies.
 */

let client = require('./client');
let should = require('should');

let issueId;
describe('issue.test.js', () => {
  before((done) => {
    client.createProject((err) => {
      client.issues.create({
        id: client.id
        , title: 'test title ' + new Date()
        , description: '测试 `markdown` \n [abc](/abc)'
        , labels: 'test,gitlabapi'
      }, (err, data) => {
        if (err) {
          return done(err);
        }
        issueId = data.id;
        done();
      });
    });
  });

  after(client.removeProject);

  describe('client.issues.get()', () => {
    it('should return a issue', (done) => {
      client.issues.get({id: client.id, issue_id: issueId}, (err, row) => {
        should.not.exists(err);
        row.id.should.equal(issueId);
        row.should.have.keys('id', 'iid', 'project_id', 'title', 'description', 'labels',
          'milestone', 'assignee', 'author', 'state', 'updated_at', 'created_at',
          'subscribed', 'user_notes_count', 'upvotes', 'downvotes', 'due_date', 'confidential', 'web_url');
        done();
      });
    });

    it('should return issue with promise way', (done) => {
      client.promise.issues.get({id: client.id, issue_id: issueId})
      .then((row) => {
        row.id.should.equal(issueId);
        row.should.have.keys('id', 'iid', 'project_id', 'title', 'description', 'labels',
          'milestone', 'assignee', 'author', 'state', 'updated_at', 'created_at',
          'subscribed', 'user_notes_count', 'upvotes', 'downvotes', 'due_date', 'confidential', 'web_url');
        done();
      })
      .catch(done);
    });

    it('should return issue with thunk way', function* () {
      let row = yield client.thunk.issues.get({id: client.id, issue_id: issueId});
      row.id.should.equal(issueId);
      row.should.have.keys('id', 'iid', 'project_id', 'title', 'description', 'labels',
        'milestone', 'assignee', 'author', 'state', 'updated_at', 'created_at',
        'subscribed', 'user_notes_count', 'upvotes', 'downvotes', 'due_date', 'confidential', 'web_url');
    });
  });

  describe('client.issues.list()', () => {

    it('should return issues', (done) => {
      client.issues.list({id: client.id}, (err, issues) => {
        should.not.exists(err);
        issues.length.should.above(0);
        let row = issues[0];
        row.should.have.keys('id', 'iid', 'project_id', 'title', 'description', 'labels',
          'milestone', 'assignee', 'author', 'state', 'updated_at', 'created_at',
          'subscribed', 'user_notes_count', 'upvotes', 'downvotes', 'due_date', 'confidential', 'web_url');
        done();
      });
    });

  });

  describe('client.issues.create(), update()', () => {
    it('should create, update a issue', (done) => {
      client.issues.create({
        id: client.id
        , title: 'test title ' + new Date()
        , description: '测试 `markdown` \n [abc](/abc)'
        , assignee_id: 142
        , milestone_id: 117
        , labels: 'test,gitlabapi'
      }, (err, row) => {
        should.not.exists(err);
        row.project_id.should.equal(client.id);
        row.state.should.equal('opened');
        client.issues.update({
          id: client.id
          , issue_id: row.id
          , title: row.title + ' update'
          , state_event: 'close',
        }, (err, row) => {
          should.not.exists(err);
          row.title.should.containEql(' update');
          row.state.should.equal('closed');
          done();
        });
      });
    });

    it('should update a close, reopen and close issue', (done) => {
      client.issues.update({
        id: client.id
        , issue_id: issueId
        , description: 'need to be closed!'
        , state_event: 'close',
      }, (err, row) => {
        should.not.exists(err);
        row.state.should.equal('closed');
        client.issues.update({
          id: client.id
          , issue_id: issueId
          , description: 'need to be reopen!'
          , state_event: 'reopen',
        }, (err, row) => {
          should.not.exists(err);
          row.state.should.equal('reopened');
          done();
        });
      });
    });
  });

  describe('client.issues.listNotes()', () => {
    it('should return issue\'s notes', (done) => {
      client.issues.listNotes({id: client.id, issue_id: issueId}, (err, rows) => {
        should.not.exists(err);
        rows.length.should.above(0);
        let row = rows[0];
        row.should.have.keys('id', 'body', 'author', 'created_at', 'attachment',
             'updated_at', 'system', 'noteable_id', 'noteable_type', 'upvote?', 'downvote?');
        done();
      });
    });

    it('should return issue\'s notes in thunk way', function* () {
      let rows = yield client.thunk.issues.listNotes({id: client.id, issue_id: issueId});
      rows.length.should.above(0);
      let row = rows[0];
      row.should.have.keys('id', 'body', 'author', 'created_at', 'attachment',
             'updated_at', 'system', 'noteable_id', 'noteable_type', 'upvote?', 'downvote?');
    });
  });

  describe('client.issues.createNote()', () => {
    it('should create to note', (done) => {
      client.issues.createNote({
        id: client.id, issue_id: issueId, body: '# h1 哈哈\n fixed #1098, fix #1098 fixes #1098'
      }, done);
    });
  });

});
