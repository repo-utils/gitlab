/*!
 * gitlab - test/milestone.test.js
 * Copyright(c) 2012 fengmk2 <fengmk2@gmail.com>
 * MIT Licensed
 */

"use strict";

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

    it('should return a milestone', function (done) {
      client.milestones.get({id: client.id, milestone_id: milestoneId}, function (err, milestone) {
        should.not.exists(err);
        milestone.should.have.property('id');
        milestone.should.have.keys('id', 'iid', 'project_id', 'title', 'description',
          'due_date', 'state', 'updated_at', 'created_at');
        done();
      });
    });

  });

  describe('client.milestones.list()', function () {

    it('should return a milestone', function (done) {
      client.milestones.list({id: client.id, per_page: 1}, function (err, milestones) {
        should.not.exists(err);
        milestones.should.length(1);
        milestones[0].should.have.keys('id', 'iid', 'project_id', 'title', 'description',
          'due_date', 'state', 'updated_at', 'created_at');
        done();
      });
    });

  });

  describe('client.milestones.create() and update()', function () {

    it('should create a milestone and close it', function (done) {
      client.milestones.create({
        id: client.id,
        title: 'test create milestone' + new Date(),
        description: 'description for create milestone' + new Date(),
        due_date: '2013-02-14',
      }, function (err, milestone) {
        should.not.exists(err);
        milestone.should.have.property('id');
        milestone.should.have.property('project_id', client.id);
        milestone.state.should.equal('active');
        milestone.due_date.should.equal('2013-02-14');
        client.milestones.update({
          id: client.id,
          milestone_id: milestone.id,
          title: milestone.title + ' || test update milestone' + new Date(),
          description: milestone.description + ' || \n ## description for update milestone' + new Date(),
          due_date: '2013-02-15',
          // closed: '1',
          state_event: 'close',
        }, function (err, milestone) {
          should.not.exists(err);
          milestone.should.have.keys('id', 'iid', 'project_id', 'title', 'description',
            'due_date', 'state', 'updated_at', 'created_at');
          milestone.state.should.equal('closed');
          milestone.due_date.should.equal('2013-02-15');
          done();
        });
      });
    });

  });

});
