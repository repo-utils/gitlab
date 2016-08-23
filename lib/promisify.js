/**!
 * gitlab - lib/promisify.js
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

/* jshint ignore:start */
var Promise = require('any-promise');
/* jshint ignore:end */
var properties = require('./properties');

module.exports = promisifyAll;

function promisifyAll(source) {
  var target = {
    request: promisify('request', source.request.bind(source))
  };
  Object.keys(properties).forEach(function (name) {
    var methods = properties[name];
    target[name] = {};
    methods.forEach(function (method) {
      target[name][method] = promisify(method, source[name][method].bind(source[name]));
    });
  });
  return target;
}

function promisify(name, fn) {
  /* jshint evil:true */
  return eval('(function ' + name + '() {\n'
    + '  var len = arguments.length;\n'
    + '  var args = new Array(len + 1);\n'
    + '  for (var i = 0; i < len; ++i) { args[i] = arguments[i]; }\n'
    + '  var lastIndex = i;\n'
    + '  return new Promise(function (resolve, reject) {\n'
    + '    args[lastIndex] = makeCallback(resolve, reject);\n'
    + '    fn.apply(null, args);\n'
    + '  });\n'
    + '});');
}

function makeCallback(resolve, reject) {
  return function (err, result) {
    if (err) {
      reject(err);
    } else {
      resolve(result);
    }
  };
}
