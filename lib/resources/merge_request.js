'use strict';

var util = require('util');
var RESTFulResource = require('restful-client').RESTFulResource;

module.exports = MergeRequest;

function MergeRequest(client) {
  this.constructor.super_.call(this, client, '/projects/:id/merge_requests', 'merge_request_id');
}
util.inherits(MergeRequest, RESTFulResource);

MergeRequest.prototype.listNotes = function (params, callback) {
  this.client.request('get', this.onePath + '/notes', params, callback);
};

MergeRequest.prototype.createNote = function (params, callback) {
  this.client.request('post', this.onePath + '/notes', params, callback);
};

MergeRequest.prototype.getNote = function (params, callback) {
  this.client.request('get', this.onePath + '/notes/:note_id', params, callback);
};

MergeRequest.prototype.updateNote = function (params, callback) {
  this.client.request('put', this.onePath + '/notes/:note_id', params, callback);
};

MergeRequest.prototype.merge = function (params, callback) {
  this.client.request('put', this.onePath + '/merge', params, callback);
};

MergeRequest.prototype.listCommits = function (params, callback) {
  this.client.request('get', this.onePath + '/commits', params, callback);
}
