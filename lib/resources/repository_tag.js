'use strict';

var util = require('util')
var restful = require('restful-client')

function Tag(client) {
  this.constructor.super_.call(this, client, '/projects/:id/repository/tags', 'tag_name');
}

util.inherits(Tag, restful.RESTFulResource);

Tag.prototype.createRelease = function (params, callback) {
  this.client.request('post', this.onePath + '/release', params, callback);
  return this;
};

Tag.prototype.updateRelease = function (params, callback) {
  this.client.request('put', this.onePath + '/release', params, callback);
  return this;
};

module.exports = Tag;
