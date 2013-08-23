/*!
 * gitlab - test/repository.test.js
 * Copyright(c) 2013 fengmk2 <fengmk2@gmail.com>
 * MIT Licensed
 */

"use strict";

/**
 * Module dependencies.
 */

var should = require('should');
var pedding = require('pedding');
var client = require('./client');

describe('repository.test.js', function () {

  describe('client.repository.list()', function () {

    it('should return a project root / tree', function (done) {
      client.repository.list({ id: 441, type: 'tree' }, function (err, tree) {
        should.not.exists(err);
        should.exists(tree);
        tree.should.be.instanceof(Array);
        tree.forEach(function (item) {
          item.should.have.keys('name', 'type', 'mode', 'id');
        });
        done();
      });
    });

    it('should return a project /lib tree', function (done) {
      client.repository.list({ id: 441, type: 'tree', path: 'lib' }, function (err, tree) {
        should.not.exists(err);
        should.exists(tree);
        tree.should.be.instanceof(Array);
        tree.forEach(function (item) {
          item.should.have.keys('name', 'type', 'mode', 'id');
        });
        done();
      });
    });

  });

  describe('client.repository.getTree()', function () {

    it('should return a project root / tree', function (done) {
      client.repository.getTree({ id: 441 }, function (err, tree) {
        should.not.exists(err);
        should.exists(tree);
        tree.should.be.instanceof(Array);
        tree.forEach(function (item) {
          item.should.have.keys('name', 'type', 'mode', 'id');
        });
        done();
      });
    });

    it('should return a project /lib tree', function (done) {
      client.repository.getTree({ id: 441, path: 'lib' }, function (err, tree) {
        should.not.exists(err);
        should.exists(tree);
        tree.should.be.instanceof(Array);
        tree.forEach(function (item) {
          item.should.have.keys('name', 'type', 'mode', 'id');
        });
        done();
      });
    });

  });

  describe('client.repository.getBranches()', function () {
    it('should return a project branches', function (done) {
      client.repository.getBranches({ id: 441 }, function (err, branches) {
        should.not.exists(err);
        should.exists(branches);
        branches.should.be.instanceof(Array);
        branches.forEach(function (item) {
          item.should.have.keys('name', 'commit', 'protected');
        });
        done();
      });
    });
  });

  describe('client.repository.getBranch()', function () {
    it('should return a project master branch', function (done) {
      client.repository.getBranch({ id: 441, branch: 'master' }, function (err, branch) {
        should.not.exists(err);
        should.exists(branch);
        branch.should.have.keys('name', 'commit', 'protected');
        branch.name.should.equal('master');
        done();
      });
    });

    it('should return 404 branch not exists', function (done) {
      client.repository.getBranch({ id: 441, branch: 'master22' }, function (err, branch) {
        should.exists(err);
        err.message.should.equal('404 Branch does not exist Not Found');
        err.statusCode.should.equal(404);
        should.not.exists(branch);
        done();
      });
    });
  });

  describe('client.repository.protectBranch() and unprotectBranch()', function () {
    it('should return protect master branch', function (done) {
      client.repository.protectBranch({ id: 441, branch: 'master' }, function (err, branch) {
        should.not.exists(err);
        should.exists(branch);
        branch.should.have.keys('name', 'commit', 'protected');
        branch.name.should.equal('master');
        branch.protected.should.equal(true);
        
        client.repository.protectBranch({ id: 441, branch: 'master' }, function (err, branch) {
          should.not.exists(err);
          should.exists(branch);
          branch.should.have.keys('name', 'commit', 'protected');
          branch.name.should.equal('master');
          branch.protected.should.equal(true);
          done();
        });
      });
    });

    it('should return unprotect master branch', function (done) {
      client.repository.unprotectBranch({ id: 441, branch: 'master' }, function (err, branch) {
        should.not.exists(err);
        should.exists(branch);
        branch.should.have.keys('name', 'commit', 'protected');
        branch.name.should.equal('master');
        branch.protected.should.equal(false);
        
        client.repository.unprotectBranch({ id: 441, branch: 'master' }, function (err, branch) {
          should.not.exists(err);
          should.exists(branch);
          branch.should.have.keys('name', 'commit', 'protected');
          branch.name.should.equal('master');
          branch.protected.should.equal(false);
          done();
        });
      });
    });

    it('should return 404 protect branch not exists', function (done) {
      client.repository.protectBranch({ id: 441, branch: 'master22' }, function (err, branch) {
        should.exists(err);
        err.message.should.equal('404 Not Found');
        err.statusCode.should.equal(404);
        should.not.exists(branch);
        done();
      });
    });

    it('should return 404 unprotect branch not exists', function (done) {
      client.repository.unprotectBranch({ id: 441, branch: 'master22' }, function (err, branch) {
        should.exists(err);
        err.message.should.equal('404 Not Found');
        err.statusCode.should.equal(404);
        should.not.exists(branch);
        done();
      });
    });
  });

  describe('client.repository.getTags()', function () {
    it('should return a project tags', function (done) {
      client.repository.getTags({ id: 441 }, function (err, tags) {
        should.not.exists(err);
        should.exists(tags);
        tags.should.be.instanceof(Array);
        tags.forEach(function (item) {
          item.should.have.keys('name', 'commit', 'protected');
        });
        done();
      });
    });
  });

  describe('client.repository.getCommits()', function () {
    it('should return a project commits', function (done) {
      done = pedding(2, done);
      client.repository.getCommits({ id: 441 }, function (err, commits) {
        should.not.exists(err);
        should.exists(commits);
        commits.should.be.instanceof(Array);
        commits.forEach(function (item) {
          item.should.have.keys('short_id', 'title', 'author_name', 'id', 'author_email', 'created_at');
        });
        done();
      });

      client.repository.getCommits({ id: 441, ref_name: 'master' }, function (err, commits) {
        should.not.exists(err);
        should.exists(commits);
        commits.should.be.instanceof(Array);
        commits.length.should.above(0);
        commits.forEach(function (item) {
          item.should.have.keys('short_id', 'title', 'author_name', 'id', 'author_email', 'created_at');
        });
        done();
      });
    });
  });

  describe('client.repository.getBlob()', function () {
    it('should return a file content', function (done) {
      client.repository.getBlob({ id: 441, sha: 'master', filepath: 'lib/alidata.js' }, function (err, blob) {
        should.not.exists(err);
        should.exists(blob);
        should.ok(Buffer.isBuffer(blob));
        blob.should.be.instanceof(Buffer);
        blob.length.should.above(0);
        blob.toString().should.include('alidata - lib/alidata.js');
        done();
      });
    });
  });

});