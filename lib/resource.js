/*!
 * gitlab - lib/resource.js
 * Copyright(c) 2013 fengmk2 <fengmk2@gmail.com>
 * MIT Licensed
 */

"use strict";

/**
 * Module dependencies.
 */

/**
 * Resource base class.
 * 
 * @param {Client} client, gitlab api client instance.
 */
function Resource(client, resourcePath, idName) {
  this.client = client;
  this.path = resourcePath;
  this.onePath = this.path + '/:' + idName;
}

/**
 * Get a resource.
 * 
 * @param {Object} params
 * @param {Function(err, row)} callback
 */
Resource.prototype.get = function (params, callback) {
  this.client.request('get', this.onePath, params, callback);
};

/**
 * List all resources.
 * 
 * @param {Object} params
 *  - {Number} [page=1], page number, default is `1`.
 *  - {Number} [perPage=20], number of items to list per page, max is `100`.
 * @param {Function(err, rows)} callback
 */
Resource.prototype.list = function (params, callback) {
  this.client.request('get', this.path, params, callback);
};

/**
 * Create a resource.
 * 
 * @param {Object} params
 * @param {Function(err, row)} callback
 */
Resource.prototype.create = function (params, callback) {
  this.client.request('post', this.path, params, callback);
};

/**
 * Update a resource.
 * 
 * @param {Object} params
 * @param {Function(err, row)} callback
 */
Resource.prototype.update = function (params, callback) {
  this.client.request('put', this.onePath, params, callback);
};

/**
 * Remove a resource.
 * 
 * @param {Object} params
 * @param {Function(err, row)} callback
 */
Resource.prototype.remove = function (params, callback) {
  this.client.request('delete', this.onePath, params, callback);
};

module.exports = Resource;
