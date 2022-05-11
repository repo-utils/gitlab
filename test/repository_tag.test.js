'use strict';

/**
 * Module dependencies.
 */

var should = require('should');
var objectid = require('objectid');
var defaultConfig = require('./config');
var gitlab = require('..');

// account: https://gitlab.com/liangduan
var accessToken = 'x_hv_ZfLLpwsURoG47Ti';
// repo: https://gitlab.com/liangduan/gitlab-test
var projectId = encodeURIComponent('liangduan/gitlab-test');

function createConfig() {
  var config = {};

  for (var key in defaultConfig) {
    if (defaultConfig.hasOwnProperty(key)) {
      config[key] = defaultConfig[key];
    }
  }

  config.privateToken = accessToken;
  return config;
}

var config = createConfig();
var client = gitlab.create(config);

function createTag() {
  var tag_name = 'tag-test-' + objectid();

  return new Promise(function(resolve, reject) {
    client.repositoryTags.create({
      id: projectId,
      tag_name: tag_name,
      ref: 'master',
    }, function(err, tag) {
      if (err) {
        reject(err);
        return;
      }
      resolve(tag_name);
    });
  })
}

function createRelease(tag_name, description) {
  return new Promise(function(resolve, reject) {
    client.repositoryTags.createRelease({
      id: projectId,
      tag_name: tag_name,
      description: description,
    }, function(err) {
      if (err) {
        reject(err);
        return;
      }

      resolve(tag_name);
    })
  })
}

describe('repository_tag.test.js', function () {
  it('should list all tags of a project', function(done) {
    client.repositoryTags.list({ id: projectId }, function(err, tags) {
      should.not.exists(err);
      should.exists(tags);
      tags.should.be.instanceof(Array);
      tags.forEach(function (item) {
        item.should.have.keys('name', 'message', 'commit', 'release');
      });
      done();
    });
  });

  it('should get a specific tag by tag_name', function(done) {
    client.repositoryTags.get({ id: projectId, tag_name: '1' }, function(err, tag) {
      should.not.exists(err);
      should.exists(tag);
      tag.should.be.instanceof(Object);
      tag.should.have.keys('name', 'message', 'commit', 'release');
      done();
    });
  });

  it('should create a new tag in the repository that points to the supplied ref', function(done) {
    client.repositoryTags.create({
      id: projectId,
      tag_name: 'tag-test-' + objectid(),
      ref: 'master',
    }, function(err, tag) {
      should.not.exists(err);
      should.exists(tag);
      tag.should.be.instanceof(Object);
      tag.should.have.keys('name', 'message', 'commit', 'release');
      done();
    });
  });

  it('should delete a tag by its tag_name', function(done) {
    var create = createTag();

    create.then(function(tag_name) {
      client.repositoryTags.remove({
        id: projectId,
        tag_name: tag_name,
      }, function(err, tag) {
        should.not.exists(err);
        should.exists(tag);
        tag.should.be.instanceof(Object);
        tag.should.have.keys('tag_name');
        done();
      });
    }).catch(done);
  });

  it('should add release notes to the existing git tag.', function(done) {
    var create = createTag();
    var description = 'Amazing release. Wow';

    create.then(function(tag_name) {
      client.repositoryTags.createRelease({
        id: projectId,
        tag_name: tag_name,
        description: description,
      }, function(err, tag) {
        should.not.exists(err);
        should.exists(tag);
        tag.should.be.instanceof(Object);
        tag.should.have.keys('tag_name', 'description');
        tag.tag_name.should.equal(tag_name);
        tag.description.should.equal(description);
        done();
      });
    }).catch(done);
  });

  it('should add release notes to the existing git tag.', function(done) {
    var create = createTag();
    var description = 'Amazing release. Wow';

    create.then(function(tag_name) {
      client.repositoryTags.createRelease({
        id: projectId,
        tag_name: tag_name,
        description: description,
      }, function(err, tag) {
        should.not.exists(err);
        should.exists(tag);
        tag.should.be.instanceof(Object);
        tag.should.have.keys('tag_name', 'description');
        tag.tag_name.should.equal(tag_name);
        tag.description.should.equal(description);
        done();
      });
    }).catch(done);
  });

  it('should update release notes to the existing git tag.', function(done) {
    var create = createTag();
    var description = 'Amazing release. Wow';
    var anotherDescription = 'Another description';

    create.then(function(tag_name) {
      return createRelease(tag_name, description);
    }).then(function(tag_name) {
      client.repositoryTags.updateRelease({
        id: projectId,
        tag_name: tag_name,
        description: anotherDescription,
      }, function(err, tag) {
        should.not.exists(err);
        should.exists(tag);
        tag.should.be.instanceof(Object);
        tag.should.have.keys('tag_name', 'description');
        tag.tag_name.should.equal(tag_name);
        tag.description.should.equal(anotherDescription);
        done();
      });
    }).catch(done);
  });
});
