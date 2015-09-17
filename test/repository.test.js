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

//FIXME: create trees
describe.skip('repository.test.js', function () {

  describe('client.repository.list()', function () {

    it('should return a project root / tree', function (done) {
      client.repository.list({ id: client.id, type: 'tree' }, function (err, tree) {
        should.not.exists(err);
        should.exists(tree);
        tree.should.be.instanceof(Array);
        tree.forEach(function (item) {
          item.should.have.properties('name', 'type', 'mode', 'id');
        });
        done();
      });
    });

    it('should return a project /lib tree', function (done) {
      client.repository.list({ id: client.id, type: 'tree', path: 'lib' }, function (err, tree) {
        should.not.exists(err);
        should.exists(tree);
        tree.should.be.instanceof(Array);
        tree.forEach(function (item) {
          item.should.have.properties('name', 'type', 'mode', 'id');
        });
        done();
      });
    });

  });

  describe('client.repository.getTree()', function () {

    it('should return a project root / tree', function (done) {
      client.repository.getTree({ id: client.id }, function (err, tree) {
        should.not.exists(err);
        should.exists(tree);
        tree.should.be.instanceof(Array);
        tree.forEach(function (item) {
          item.should.have.properties('name', 'type', 'mode', 'id');
        });
        done();
      });
    });

    it('should return a project /lib tree', function (done) {
      client.repository.getTree({ id: client.id, path: 'lib' }, function (err, tree) {
        should.not.exists(err);
        should.exists(tree);
        tree.should.be.instanceof(Array);
        tree.forEach(function (item) {
          item.should.have.properties('name', 'type', 'mode', 'id');
        });
        done();
      });
    });

  });

  describe('client.repository.getBranches()', function () {
    it('should return a project branches', function (done) {
      client.repository.getBranches({ id: client.id }, function (err, branches) {
        should.not.exists(err);
        should.exists(branches);
        branches.should.be.instanceof(Array);
        branches.forEach(function (item) {
          item.should.have.properties('name', 'commit', 'protected');
        });
        done();
      });
    });
  });

  describe('client.repository.getBranch()', function () {
    it('should return a project master branch', function (done) {
      client.repository.getBranch({ id: client.id, branch: 'master' }, function (err, branch) {
        should.not.exists(err);
        should.exists(branch);
        branch.should.have.properties('name', 'commit', 'protected');
        branch.name.should.equal('master');
        done();
      });
    });

    it('should return 404 branch not exists', function (done) {
      client.repository.getBranch({ id: client.id, branch: 'master22' }, function (err, branch) {
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
      client.repository.protectBranch({ id: client.id, branch: 'master' }, function (err, branch) {
        should.not.exists(err);
        should.exists(branch);
        branch.should.have.properties('name', 'commit', 'protected');
        branch.name.should.equal('master');
        branch.protected.should.equal(true);

        client.repository.protectBranch({ id: client.id, branch: 'master' }, function (err, branch) {
          should.not.exists(err);
          should.exists(branch);
          branch.should.have.properties('name', 'commit', 'protected');
          branch.name.should.equal('master');
          branch.protected.should.equal(true);
          done();
        });
      });
    });

    it('should return unprotect master branch', function (done) {
      client.repository.unprotectBranch({ id: client.id, branch: 'master' }, function (err, branch) {
        should.not.exists(err);
        should.exists(branch);
        branch.should.have.properties('name', 'commit', 'protected');
        branch.name.should.equal('master');
        branch.protected.should.equal(false);

        client.repository.unprotectBranch({ id: client.id, branch: 'master' }, function (err, branch) {
          should.not.exists(err);
          should.exists(branch);
          branch.should.have.properties('name', 'commit', 'protected');
          branch.name.should.equal('master');
          branch.protected.should.equal(false);
          done();
        });
      });
    });

    it('should return 404 protect branch not exists', function (done) {
      client.repository.protectBranch({ id: client.id, branch: 'master22' }, function (err, branch) {
        should.exists(err);
        err.message.should.equal('404 Not Found');
        err.statusCode.should.equal(404);
        should.not.exists(branch);
        done();
      });
    });

    it('should return 404 unprotect branch not exists', function (done) {
      client.repository.unprotectBranch({ id: client.id, branch: 'master22' }, function (err, branch) {
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
      client.repository.getTags({ id: client.id }, function (err, tags) {
        should.not.exists(err);
        should.exists(tags);
        tags.should.be.instanceof(Array);
        tags.forEach(function (item) {
          item.should.have.properties('name', 'commit', 'protected');
        });
        done();
      });
    });
  });

  describe('client.repository.getCommits()', function () {
    it('should return a project commits', function (done) {
      done = pedding(2, done);
      client.repository.getCommits({ id: client.id }, function (err, commits) {
        should.not.exists(err);
        should.exists(commits);
        commits.should.be.instanceof(Array);
        commits.forEach(function (item) {
          item.should.have.properties('short_id', 'title', 'author_name', 'id', 'author_email', 'created_at');
        });
        done();
      });

      client.repository.getCommits({ id: client.id, ref_name: 'master' }, function (err, commits) {
        should.not.exists(err);
        should.exists(commits);
        commits.should.be.instanceof(Array);
        commits.length.should.above(0);
        commits.forEach(function (item) {
          item.should.have.properties('short_id', 'title', 'author_name', 'id', 'author_email', 'created_at');
        });
        done();
      });
    });
  });

  describe('client.repository.getBlob()', function () {
    it('should return a file content', function (done) {
      client.repository.getBlob({ id: client.id, sha: 'master', filepath: 'lib/alidata.js' }, function (err, blob) {
        should.not.exists(err);
        should.exists(blob);
        should.ok(Buffer.isBuffer(blob));
        blob.should.be.instanceof(Buffer);
        blob.length.should.above(0);
        blob.toString().should.containEql('alidata - lib/alidata.js');
        done();
      });
    });
  });

  describe('client.repository.getRawBlob()', function () {
    it('should return raw file content', function (done) {
      client.repository.getRawBlob({id: 55045, sha: '946579807281bd26b75b91986c78f15ad0bd40f7'}, function (err, raw) {
        should.not.exists(err);
        should.exists(raw);
        should.ok(Buffer.isBuffer(raw));
        raw.should.be.a.Buffer;
        raw.length.should.above(0);
        raw.toString().should.containEql('gitlab-client-unittest\n=======\n\n');
        done();
      });
    });
  });

});
