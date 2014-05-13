gitlab
=======

[![Build Status](https://secure.travis-ci.org/repo-utils/gitlab.png)](http://travis-ci.org/repo-utils/gitlab)
[![Coverage Status](https://coveralls.io/repos/repo-utils/gitlab/badge.png)](https://coveralls.io/r/repo-utils/gitlab)

![logo](https://raw.github.com/repo-utils/gitlab/master/logo.png)

Gitlab API nodejs client.

* [Gitlab API document](https://github.com/gitlabhq/gitlabhq/tree/master/doc/api)

## Install

```bash
$ npm install node-gitlab
```

## Usage

```js
var gitlab = require('node-gitlab');

var client = gitlab.create({
  api: 'https://gitlab.com/api/v3',
  privateToken: 'your private token'
});
client.milestone.list({id: 1}, function (err, milestones) {
  console.log(milestones);
});
```

## Document

@see [Gitlab API document](https://github.com/gitlabhq/gitlabhq/tree/master/doc/api).

### Milestones

```js
/**
 * Get a project's milestone.
 *
 * @param {Object} params
 *  - {Number} id, project's id
 *  - {Number} milestone_id, milestone's id.
 * @param {Function(err, row)} callback
 */
Milestone.prototype.get = function (params, callback);

/**
 * List a project's all milestones.
 *
 * @param {Object} params
 *  - {Number} id, project's id.
 *  - {Number} [page=1], page number, default is `1`.
 *  - {Number} [perPage=20], number of items to list per page, max is `100`.
 * @param {Function(err, rows)} callback
 */
Milestone.prototype.list = function (params, callback);

/**
 * Create a milestone.
 *
 * @param {Object} params
 *  - {Number} id The ID of a project
 *  - {String} title The title of an milestone
 *  - {String} [description] The description of the milestone
 *  - {String} [due_date] The due date of the milestone
 * @param {Function(err, row)} callback
 */
Milestone.prototype.create = function (params, callback);

/**
 * Update a milestone.

 * @param {Object} params
 *  - {Number} id The ID of a project
 *  - {Number} milestone_id The ID of a project milestone
 *  - {String} title The title of an milestone
 *  - {String} [description] The description of the milestone
 *  - {String} [due_date] The due date of the milestone
 *  - {String} [closed] The status of the milestone
 * @param {Function(err, row)} callback
 */
Milestone.prototype.update = function (params, callback);
```

### Repository

```js
/**
 * Get a list of repository branches from a project, sorted by name alphabetically.
 *
 * @param {Object} params
 *  - {String} id The ID of a project
 * @param {Function} callback
 */
Repository.prototype.getBranches = function (params, callback);

/**
 * Protects a single project repository branch.
 * This is an idempotent function, protecting an already protected repository branch
 * still returns a 200 Ok status code.
 *
 * @param {Object} params
 *  - {String} id The ID of a project
 *  - {String} branch The name of the branch
 * @param {Function} callback
 */
Repository.prototype.protectBranch = function (params, callback);

/**
 * Unprotects a single project repository branch.
 * This is an idempotent function, unprotecting an already unprotected repository branch
 * still returns a 200 Ok status code.
 *
 * @param {Object} params
 *  - {String} id The ID of a project
 *  - {String} branch The name of the branch
 * @param {Function} callback
 */
Repository.prototype.unprotectBranch = function (params, callback);

/**
 * Get a single project repository branch.
 *
 * @param {Object} params
 *  - {String} id The ID of a project
 *  - {String} branch The name of the branch
 * @param {Function} callback
 */
Repository.prototype.getBranch = function (params, callback);

/**
 * Get a list of repository tags from a project, sorted by name in reverse alphabetical order.
 *
 * @param {Object} params
 *  - {String} id The ID of a project
 * @param {Function} callback
 */
Repository.prototype.getTags = function (params, callback);

/**
 * Get a list of repository commits in a project.
 *
 * @param {Object} params
 *  - {String} id The ID of a project
 *  - {String} [ref_name] The name of a repository branch or tag or if not given the default branch
 * @param {Function} callback
 */
Repository.prototype.getCommits = function (params, callback);

/**
 * Get a list of repository files and directories in a project.
 *
 * @param {Object} params
 *  - {String} id The ID of a project
 *  - {String} [path] The path inside repository, default is '/'. Used to get contend of subdirectories. e.g.: `test`
 *  - {String} [ref_name] The name of a repository branch or tag or if not given the default branch
 * @param {Function} callback
 */
Repository.prototype.getTree = function (params, callback);

/**
 * Get the raw file contents for a file.
 *
 * @param {Object} params
 *  - {String} id The ID of a project
 *  - {String} sha The commit or branch name
 *  - {String} filepath The path the file
 * @param {Function} callback
 */
Repository.prototype.getBlob = function (params, callback);
```

## Authors

```bash
$ git summary

 project  : gitlab
 repo age : 5 months
 active   : 11 days
 commits  : 22
 files    : 26
 authors  :
    20  fengmk2                 90.9%
     2  Ondrej                  9.1%
```

## License

(The MIT License)

Copyright (c) 2013 - 2014 fengmk2 &lt;fengmk2@gmail.com&gt;

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
'Software'), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
