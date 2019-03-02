/*!
 * gitlab - test/repository.test.js
 * Copyright(c) 2013 fengmk2 <fengmk2@gmail.com>
 * MIT Licensed
 */
/* eslint-disable no-unused-expressions */
"use strict";

/**
 * Module dependencies.
 */

let should = require('should');
let pedding = require('pedding');
let client = require('./client');

describe.skip('repository.test.js', () => {

  describe('client.repository.list()', () => {

    it('should return a project root / tree', (done) => {
      client.repository.list({id: client.id, type: 'tree'}, (err, tree) => {
        should.not.exists(err);
        should.exists(tree);
        tree.should.be.instanceof(Array);
        tree.forEach((item) => {
          item.should.have.keys('name', 'type', 'mode', 'id');
        });
        done();
      });
    });

    it('should return a project /lib tree', (done) => {
      client.repository.list({id: client.id, type: 'tree', path: 'lib'}, (err, tree) => {
        should.not.exists(err);
        should.exists(tree);
        tree.should.be.instanceof(Array);
        tree.forEach((item) => {
          item.should.have.keys('name', 'type', 'mode', 'id');
        });
        done();
      });
    });

  });

  describe('client.repository.getTree()', () => {

    it('should return a project root / tree', (done) => {
      client.repository.getTree({id: client.id}, (err, tree) => {
        should.not.exists(err);
        should.exists(tree);
        tree.should.be.instanceof(Array);
        tree.forEach((item) => {
          item.should.have.keys('name', 'type', 'mode', 'id');
        });
        done();
      });
    });

    it('should return a project /lib tree', (done) => {
      client.repository.getTree({id: client.id, path: 'lib'}, (err, tree) => {
        should.not.exists(err);
        should.exists(tree);
        tree.should.be.instanceof(Array);
        tree.forEach((item) => {
          item.should.have.keys('name', 'type', 'mode', 'id');
        });
        done();
      });
    });

  });

  describe('client.repository.getBranches()', () => {
    it('should return a project branches', (done) => {
      client.repository.getBranches({id: client.id}, (err, branches) => {
        should.not.exists(err);
        should.exists(branches);
        branches.should.be.instanceof(Array);
        branches.forEach((item) => {
          item.should.have.keys('name', 'commit', 'protected');
        });
        done();
      });
    });
  });

  describe('client.repository.getBranch()', () => {
    it('should return a project master branch', (done) => {
      client.repository.getBranch({id: client.id, branch: 'master'}, (err, branch) => {
        should.not.exists(err);
        should.exists(branch);
        branch.should.have.keys('name', 'commit', 'protected');
        branch.name.should.equal('master');
        done();
      });
    });

    it('should return 404 branch not exists', (done) => {
      client.repository.getBranch({id: client.id, branch: 'master22'}, (err, branch) => {
        should.exists(err);
        err.message.should.equal('404 Branch does not exist Not Found');
        err.statusCode.should.equal(404);
        should.not.exists(branch);
        done();
      });
    });
  });

  describe('client.repository.protectBranch() and unprotectBranch()', () => {
    it('should return protect master branch', (done) => {
      client.repository.protectBranch({id: client.id, branch: 'master'}, (err, branch) => {
        should.not.exists(err);
        should.exists(branch);
        branch.should.have.keys('name', 'commit', 'protected');
        branch.name.should.equal('master');
        branch.protected.should.equal(true);

        client.repository.protectBranch({id: client.id, branch: 'master'}, (err, branch) => {
          should.not.exists(err);
          should.exists(branch);
          branch.should.have.keys('name', 'commit', 'protected');
          branch.name.should.equal('master');
          branch.protected.should.equal(true);
          done();
        });
      });
    });

    it('should return unprotect master branch', (done) => {
      client.repository.unprotectBranch({id: client.id, branch: 'master'}, (err, branch) => {
        should.not.exists(err);
        should.exists(branch);
        branch.should.have.keys('name', 'commit', 'protected');
        branch.name.should.equal('master');
        branch.protected.should.equal(false);

        client.repository.unprotectBranch({id: client.id, branch: 'master'}, (err, branch) => {
          should.not.exists(err);
          should.exists(branch);
          branch.should.have.keys('name', 'commit', 'protected');
          branch.name.should.equal('master');
          branch.protected.should.equal(false);
          done();
        });
      });
    });

    it('should return 404 protect branch not exists', (done) => {
      client.repository.protectBranch({id: client.id, branch: 'master22'}, (err, branch) => {
        should.exists(err);
        err.message.should.equal('404 Not Found');
        err.statusCode.should.equal(404);
        should.not.exists(branch);
        done();
      });
    });

    it('should return 404 unprotect branch not exists', (done) => {
      client.repository.unprotectBranch({id: client.id, branch: 'master22'}, (err, branch) => {
        should.exists(err);
        err.message.should.equal('404 Not Found');
        err.statusCode.should.equal(404);
        should.not.exists(branch);
        done();
      });
    });
  });

  describe('client.repository.getTags()', () => {
    it('should return a project tags', (done) => {
      client.repository.getTags({id: client.id}, (err, tags) => {
        should.not.exists(err);
        should.exists(tags);
        tags.should.be.instanceof(Array);
        tags.forEach((item) => {
          item.should.have.keys('name', 'commit', 'protected');
        });
        done();
      });
    });
  });

  describe('client.repository.getCommits()', () => {
    it('should return a project commits', (done) => {
      done = pedding(2, done);
      client.repository.getCommits({id: client.id}, (err, commits) => {
        should.not.exists(err);
        should.exists(commits);
        commits.should.be.instanceof(Array);
        commits.forEach((item) => {
          item.should.have.keys('short_id', 'title', 'author_name', 'id', 'author_email', 'created_at');
        });
        done();
      });

      client.repository.getCommits({id: client.id, ref_name: 'master'}, (err, commits) => {
        should.not.exists(err);
        should.exists(commits);
        commits.should.be.instanceof(Array);
        commits.length.should.above(0);
        commits.forEach((item) => {
          item.should.have.keys('short_id', 'title', 'author_name', 'id', 'author_email', 'created_at');
        });
        done();
      });
    });
  });

  describe('client.repository.getBlob()', () => {
    it('should return a file content', (done) => {
      client.repository.getBlob({id: client.id, sha: 'master', filepath: 'lib/alidata.js'}, (err, blob) => {
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

  describe('client.repository.getRawBlob()', () => {
    it('should return raw file content', (done) => {
      client.repository.getRawBlob({id: 55045, sha: '946579807281bd26b75b91986c78f15ad0bd40f7'}, (err, raw) => {
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

  describe('client.repository.archive()', () => {
    it('should return archive file', (done) => {
      client.repository.archive({id: 55045, sha: '946579807281bd26b75b91986c78f15ad0bd40f7'}, (err, raw) => {
        should.not.exists(err);
        should.exists(raw);
        should.ok(Buffer.isBuffer(raw));
        raw.should.be.a.Buffer;
        raw.length.should.above(0);
        done();
      });
    });
  });

  describe('client.repository.compare()', () => {
    it('should return diffs', (done) => {
      client.repository.compare({id: 55045, to: 'master', from: '946579807281bd26b75b91986c78f15ad0bd40f7'}, (err, diffs) => {
        should.not.exists(err);
        should.exists(diffs);
        diffs.should.have.keys('commit', 'commits', 'diffs', 'compare_timeout', 'compare_same_ref');
        diffs.commits.should.be.instanceof(Array);
        diffs.diffs.should.be.instanceof(Array);
        done();
      });
    });
  });
});
