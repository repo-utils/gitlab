/**!
 * gitlab - lib/thunkify.js
 *
 * Copyright(c) fengmk2 and other contributors.
 * MIT Licensed
 *
 * Authors:
 *   fengmk2 <fengmk2@gmail.com> (http://fengmk2.github.com)
 */

'use strict';

/**
 * Module dependencies.
 */

var thunkify = require('thunkify-wrap');
var properties = require('./properties');

module.exports = function (client) {
  thunkify(client, 'request');
  for (var key in properties) {
    var methods = properties[key];
    thunkify(client[key], methods);
  }
  return client;
};
