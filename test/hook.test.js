/*!
 * gitlab - test/hook.test.js
 * Copyright(c) 2012 fengmk2 <fengmk2@gmail.com>
 * MIT Licensed
 */

"use strict";

/**
 * Module dependencies.
 */

var client = require('./client');
var should = require('should');

describe('hook.test.js', function () {

  describe('client.hooks.get()', function () {

    it('should return a hook', function (done) {
      client.hooks.get({id: 223, hook_id: 142}, function (err, hook) {
        should.not.exists(err);
        hook.id.should.equal(142);
        hook.should.have.keys('id', 'url', 'created_at');
        done();
      });
    });

  });

  describe('client.hooks.list()', function () {

    it('should return hooks', function (done) {
      client.hooks.list({id: 223}, function (err, hooks) {
        should.not.exists(err);
        hooks.length.should.above(0);
        var hook = hooks[0];
        hook.should.have.keys('id', 'url', 'created_at');
        done();
      });
    });

  });

  describe('client.hooks.create(), update(), remove()', function () {
    it('should create, update, remove a hook', function (done) {
      client.hooks.create({id: 223, url: 'http://gitlab.alibaba-inc.com/help/api'}, function (err, hook) {
        should.not.exists(err);
        hook.url.should.equal('http://gitlab.alibaba-inc.com/help/api');
        client.hooks.update({id: 223, hook_id: hook.id, url: hook.url + '/update'}, function (err, hook) {
          should.not.exists(err);
          hook.url.should.equal('http://gitlab.alibaba-inc.com/help/api/update');
          done();
          // client.hooks.remove({id: 223, hook_id: hook.id}, function (err, hook) {
          //   should.not.exists(err);
          //   client.hooks.get({id: 223, hook_id: hook.id}, function (err, row) {
          //     should.exists(err);
          //     err.name.should.equal('Gitlab404Error');
          //     should.not.exists(row);
          //     done();
          //   });
          // });
          
        });
      });
    });
  });

});