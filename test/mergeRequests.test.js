"use strict";

var client = require('./client');
var should = require('should');
var expected = require('./data/mergeRequestChangesResult');

describe('mergeRequests.test.js', function () {
    var mergeRequestId;

    describe("client.mergeRequests.changes()", function () {
        let requestData = {
            // https://gitlab.com/gitlab-org/gitlab-ce
            id: 13083,
            // mr 30
            merge_request_id: 8416
        }

        it("should fail if missing id", function (done) {
            (function () {
                client.mergeRequests.changes({
                    merge_request_id: requestData.iid
                });
            }).should.throw("project 'id' is required");
            done();
        });

        it("should fail if missing merge_request_id", function (done) {
            (function () {
                client.mergeRequests.changes({
                    id: requestData.id
                });
            }).should.throw("mergerequests 'merge_request_id' is required");
            done();
        });

        it("should return the changes for an existing merge request", function (done) {
            client.mergeRequests.changes(requestData, function (err, data) {
                should(err).be.null;
                should(data).not.be.null;
                data.should.eql(expected);
                done();
            });
        });
    });
});

