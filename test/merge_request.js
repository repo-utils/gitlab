/*!
 * gitlab - test/merge_request.test.js
 * Copyright(c) 2012 fengmk2 <fengmk2@gmail.com>
 * MIT Licensed
 */

"use strict";

/**
 * Module dependencies.
 */

var client = require('./client');
var should = require('should');

describe('merge_request.test.js', function() {

  describe('client.merge_requests.get()', function() {

    it('should return a merge_request', function(done) {
      client.merge_requests.get({
        id: 65,
        merge_request_id: 142
      }, function(err, row) {
        should.not.exists(err);
        row.id.should.equal(142);
        row.should.have.keys('id', 'iid', 'project_id', 'target_branch', 'source_branch',
          'title', 'state', 'upvotes', 'downvotes', 'description', 'author', 'assignee',
          'source_project_id', 'target_project_id');
        done();
      });
    });

  });
});