/**!
 * node-gitlab - test/milestone.test.js
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
var milestoneId;

describe('milestone.test.js', function () {
  before(function (done) {
    client.createProject(function (err) {
      if (err) {
        return done(err);
      }

      client.milestones.create({
        id: client.id,
        title: 'test create milestone' + new Date(),
        description: 'description for create milestone' + new Date(),
        due_date: '2013-02-14',
      }, function (err, data) {
        if (err) {
          return done(err);
        }
        milestoneId = data.id;
        done();
      });
    });
  });

  after(client.removeProject);

  describe('client.milestones.get()', function () {
    it('should return a milestone', function* () {
      var milestone = yield client.thunk.milestones.get({id: client.id, milestone_id: milestoneId});
      milestone.should.have.property('id');
      milestone.should.have.properties('id', 'iid', 'project_id', 'title', 'description',
        'due_date', 'state', 'updated_at', 'created_at');
    });
  });

  describe('client.milestones.list()', function () {
    it('should return a milestone', function* () {
      var milestones = yield client.thunk.milestones.list({id: client.id, per_page: 1});
      milestones.should.length(1);
      milestones[0].should.have.properties('id', 'iid', 'project_id', 'title', 'description',
        'due_date', 'state', 'updated_at', 'created_at');
    });
  });

  describe('client.milestones.listIssues()', function () {
    it('should list all issues of the milestone', function* () {
      var issues = yield client.thunk.milestones.listIssues({
        id: client.id,
        milestone_id: milestoneId
      });
      issues.should.length(0);

      var issue = yield client.thunk.issues.create({
        id: client.id,
        title: 'issue on milestone ' + milestoneId,
        milestone_id: milestoneId
      });
      issue.id.should.above(0);
      issue.iid.should.equal(1);
      issue.milestone.id.should.equal(milestoneId);
      issue.milestone.iid.should.equal(1);

      issues = yield client.thunk.milestones.listIssues({
        id: client.id,
        milestone_id: milestoneId
      });
      issues.should.length(1);
    });
  });

  describe('client.milestones.create() and update()', function () {
    it('should create a milestone and close it', function* () {
      var milestone = yield client.thunk.milestones.create({
        id: client.id,
        title: 'test create milestone' + new Date(),
        description: 'description for create milestone' + new Date(),
        due_date: '2013-02-14',
      });
      milestone.should.have.property('id');
      milestone.should.have.property('project_id', client.id);
      milestone.state.should.equal('active');
      milestone.due_date.should.equal('2013-02-14');

      milestone = yield client.thunk.milestones.update({
        id: client.id,
        milestone_id: milestone.id,
        title: milestone.title + ' || test update milestone' + new Date(),
        description: milestone.description + ' || \n ## description for update milestone' + new Date(),
        due_date: '2013-02-15',
        state_event: 'close',
      });

      milestone.should.have.properties('id', 'iid', 'project_id', 'title', 'description',
        'due_date', 'state', 'updated_at', 'created_at');
      milestone.state.should.equal('closed');
      milestone.due_date.should.equal('2013-02-15');
    });
  });
});
