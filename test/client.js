var gitlab = require('../');

var client = gitlab.create(require('./config'));

client.createProject = function (callback) {
  client._list(function (err) {
    if (err) {
      return client._create(callback);
    }
    callback();
  });
};

client._list = function (callback) {
  client.request('get', '/projects', {}, function (err, repos) {
    if (err) {
      return callback(err);
    }
    for (var i = 0; i < repos.length; i++) {
      if (repos[i].name === 'node-gitlab-test') {
        client.id = repos[i].id;
        return callback();
      }
    }
    return callback(new Error('not found'));
  });
};

client._create = function(callback) {
  client.projects.create({
    name: 'node-gitlab-test',
    issues_enabled: true,
    merge_requests_enabled: true,
    public: true
  }, function (err, data) {
    if (err) {
      return callback(err);
    }
    client.id = data.id;
    callback(err, data);
  });
};

client.removeProject = function (callback) {
  client.projects.remove({
    id: client.id
  }, callback);
}

module.exports = client;

// client.request('get', '/users', {}, function () {
//   console.log(arguments);
// })
