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

describe('issue.test.js', function () {

  describe('client.issues.get()', function () {

    it('should return a issue', function (done) {
      client.issues.get({id: 223, issue_id: 1098}, function (err, row) {
        should.not.exists(err);
        row.id.should.equal(1098);
        row.should.have.keys('id', 'project_id', 'title', 'description', 'labels', 
          'milestone', 'assignee', 'author', 'closed', 
          'updated_at', 'created_at');
        done();
      });
    });

  });

  describe('client.issues.list()', function () {

    it('should return issues', function (done) {
      client.issues.list({id: 223}, function (err, issues) {
        should.not.exists(err);
        issues.length.should.above(0);
        var row = issues[0];
        row.should.have.keys('id', 'project_id', 'title', 'description', 'labels', 
          'milestone', 'assignee', 'author', 'closed', 
          'updated_at', 'created_at');
        done();
      });
    });

  });

  describe('client.issues.create(), update()', function () {
    it('should create, update a issue', function (done) {
      client.issues.create({
        id: 223, title: 'test title ' + new Date(), 
        description: '测试 `markdown` \n [abc](/abc)',
        assignee_id: 142, milestone_id: 117, labels: 'test,gitlabapi'
      }, function (err, row) {
        should.not.exists(err);
        row.project_id.should.equal(223);
        client.issues.update({
          id: 223,
          issue_id: row.id, 
          closed: 1,
        }, function (err, row) {
          should.not.exists(err);
          row.closed.should.equal(true);
          done();
        });
      });
    });

    it('should update a closed issue', function (done) {
      client.issues.update({
        id: 223,
        issue_id: 1098,
        closed: 1
      }, function (err, row) {
        should.not.exists(err);
        row.closed.should.equal(true);
        done();
      });
    });

  });

  describe('client.issues.listNotes()', function () {
    it('should return issue\'s notes', function (done) {
      client.issues.listNotes({id: 223, issue_id: 1098}, function (err, rows) {
        should.not.exists(err);
        rows.length.should.above(0);
        var row = rows[0];
        row.should.have.keys('id', 'body', 'author', 'created_at');
        done();
      });
    });
  });

  describe('client.issues.createNote()', function () {
    it('should create to note', function (done) {
      client.issues.createNote({
        id: 223, issue_id: 1098, body: '# h1 哈哈\n fixed #1098, fix #1098 fixes #1098'
      }, done);
    });
  });

});