/**!
 * gitlab - test/repository_file.test.js
 *
 * Copyright(c) fengmk2 and other contributors.
 * MIT Licensed
 *
 * Authors:
 *   fengmk2 <fengmk2@gmail.com> (http://fengmk2.github.com)
 */
/* eslint-disable no-unused-expressions */
'use strict';

/**
 * Module dependencies.
 */

let should = require('should');
let pedding = require('pedding');
let path = require('path');
let os = require('os');
let fs = require('fs');
let client = require('./client');

let logopath = path.join(__dirname, '..', 'logo.png');

describe.skip('repository_file.test.js', () => {

  describe('client.repositoryFiles.get()', () => {

    it('should return repository file info', (done) => {
      done = pedding(2, done);

      client.repositoryFiles.get({id: 55045, file_path: 'README.md', ref: 'master'}, (err, row) => {
        should.not.exists(err);
        row.file_name.should.equal('README.md');
        row.file_path.should.equal('README.md');
        row.size.should.be.a.Number;
        row.encoding.should.equal('base64');
        row.content.should.be.a.String;
        row.ref.should.equal('master');
        row.blob_id.should.be.a.String;
        row.commit_id.should.be.a.String;
        // { file_name: 'README.md',
        //   file_path: 'README.md',
        //   size: 1898,
        //   encoding: 'base64',
        //   content: 'Z2l0bG...',
        //   ref: 'master',
        //   blob_id: '946579807281bd26b75b91986c78f15ad0bd40f7',
        //   commit_id: '206dc6f49f2a66bae1b483b9bcdb41271cbebb23' }
        done();
      });

      client.repositoryFiles.get({id: 55045, file_path: 'test/gitlab-client-unittest.test.js', ref: 'master'},
      (err, row) => {
        should.not.exists(err);
        row.file_name.should.equal('gitlab-client-unittest.test.js');
        row.file_path.should.equal('test/gitlab-client-unittest.test.js');
        row.size.should.be.a.Number;
        row.encoding.should.equal('base64');
        row.content.should.be.a.String;
        row.ref.should.equal('master');
        row.blob_id.should.be.a.String;
        row.commit_id.should.be.a.String;
        // { file_name: 'gitlab-client-unittest.test.js',
        //   file_path: 'test/gitlab-client-unittest.test.js',
        //   size: 410,
        //   encoding: 'base64',
        //   content: 'QudGVzdC5qcycsIGZ1bmN0aW9uICgpIHsK\nCn0pOwo=\n',
        //   ref: 'master',
        //   blob_id: '99d8b6b3308b05992d0fdab5b5e4a26fffbf4e24',
        //   commit_id: '206dc6f49f2a66bae1b483b9bcdb41271cbebb23' }
        done();
      });
    });

  });

  describe('client.repositoryFiles.create(), update(), remove()', () => {
    after((done) => {
      done = pedding(2, done);
      client.repositoryFiles.remove({
        id: 55045
        , file_path: 'files_from_api/foo.txt'
        , branch_name: 'master'
        , commit_message: 'delete foo.txt from api at ' + Date() + ' by ' + os.hostname(),
      }, done);
      client.repositoryFiles.remove({
        id: 55045
        , file_path: 'files_from_api/logo.png'
        , branch_name: 'master'
        , commit_message: 'delete logo.png from api at ' + Date() + ' by ' + os.hostname(),
      }, done);
    });

    it('should create a new file', (done) => {
      let file = {
        id: 55045
        , file_path: 'files_from_api/foo.txt'
        , branch_name: 'master'
        // encoding: 'text', text default
        , content: 'foo content bar at ' + Date() + ' by ' + os.hostname()
        , commit_message: 'create foo.txt from api at ' + Date() + ' by ' + os.hostname(),
      };
      client.repositoryFiles.create(file, (err, info) => {
        should.not.exist(err);
        should.exist(info);
        info.should.have.keys('file_path', 'branch_name');
        info.file_path.should.equal(file.file_path);
        info.branch_name.should.equal(file.branch_name);
        done();
      });
    });

    it('should create a exist file error', (done) => {
      let file = {
        id: 55045
        , file_path: 'files_from_api/foo.txt'
        , branch_name: 'master'
        , content: 'foo content bar at ' + Date() + ' by ' + os.hostname()
        , commit_message: 'create foo.txt from api at ' + Date() + ' by ' + os.hostname(),
      };
      client.repositoryFiles.create(file, (err, info) => {
        should.exist(err);
        err.name.should.equal('Gitlab400Error');
        err.message.should.equal('Your changes could not be committed, because file with such name exists');
        err.statusCode.should.equal(400);
        done();
      });
    });

    it('should update a exists file', (done) => {
      let file = {
        id: 55045
        , file_path: 'files_from_api/foo.txt'
        , branch_name: 'master'
        , content: 'foo update content bar at ' + Date() + ' by ' + os.hostname()
        , commit_message: 'update foo.txt from api at ' + Date() + ' by ' + os.hostname(),
      };
      client.repositoryFiles.update(file, (err, info) => {
        should.not.exist(err);
        should.exist(info);
        info.should.have.keys('file_path', 'branch_name');
        info.file_path.should.equal(file.file_path);
        info.branch_name.should.equal(file.branch_name);
        done();
      });
    });

    it('should update a not exists file error', (done) => {
      let file = {
        id: 55045
        , file_path: 'files_from_api/foo-not-exists.txt'
        , branch_name: 'master'
        , content: 'foo update content bar at ' + Date() + ' by ' + os.hostname()
        , commit_message: 'update foo-not-exists.txt from api at ' + Date() + ' by ' + os.hostname(),
      };
      client.repositoryFiles.update(file, (err, info) => {
        should.exist(err);
        err.name.should.equal('Gitlab400Error');
        err.message.should.equal('You can only edit text files');
        done();
      });
    });

    it('should create a new base64 encoding image file', (done) => {
        let file = {
        id: 55045
        , file_path: 'files_from_api/logo.png'
        , branch_name: 'master'
        , encoding: 'base64'
        , content: fs.readFileSync(logopath, 'base64')// eslint-disable-line
        , commit_message: 'create logo.png from api at ' + Date() + ' by ' + os.hostname(),
      };
      client.repositoryFiles.create(file, (err, info) => {
        should.not.exist(err);
        should.exist(info);
        info.should.have.keys('file_path', 'branch_name');
        info.file_path.should.equal(file.file_path);
        info.branch_name.should.equal(file.branch_name);
        done();
      });
    });

    it('should remove a not exists file error', (done) => {
      client.repositoryFiles.remove({
        id: 55045
        , file_path: 'files_from_api/logo-not-exists.png'
        , branch_name: 'master'
        , commit_message: 'delete logo-not-exists.png from api at ' + Date() + ' by ' + os.hostname(),
      }, (err) => {
        should.exist(err);
        err.name.should.equal('Gitlab400Error');
        err.message.should.equal('You can only edit text files');
        err.statusCode.should.equal(400);
        done();
      });
    });
  });
});
