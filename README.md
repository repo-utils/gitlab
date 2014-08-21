gitlab
=======

[![NPM version][npm-image]][npm-url]
[![build status][travis-image]][travis-url]
[![Test coverage][coveralls-image]][coveralls-url]
[![Gittip][gittip-image]][gittip-url]
[![David deps][david-image]][david-url]
[![node version][node-image]][node-url]
[![npm download][download-image]][download-url]

[npm-image]: https://img.shields.io/npm/v/node-gitlab.svg?style=flat-square
[npm-url]: https://npmjs.org/package/node-gitlab
[travis-image]: https://img.shields.io/travis/repo-utils/gitlab.svg?style=flat-square
[travis-url]: https://travis-ci.org/repo-utils/gitlab
[coveralls-image]: https://img.shields.io/coveralls/repo-utils/gitlab.svg?style=flat-square
[coveralls-url]: https://coveralls.io/r/repo-utils/gitlab?branch=master
[gittip-image]: https://img.shields.io/gittip/fengmk2.svg?style=flat-square
[gittip-url]: https://www.gittip.com/fengmk2/
[david-image]: https://img.shields.io/david/repo-utils/gitlab.svg?style=flat-square
[david-url]: https://david-dm.org/repo-utils/gitlab
[node-image]: https://img.shields.io/badge/node.js-%3E=_0.10-green.svg?style=flat-square
[node-url]: http://nodejs.org/download/
[download-image]: https://img.shields.io/npm/dm/node-gitlab.svg?style=flat-square
[download-url]: https://npmjs.org/package/node-gitlab

![logo](https://raw.github.com/repo-utils/gitlab/master/logo.png)

Gitlab API nodejs client.

* [Gitlab API document](https://github.com/gitlabhq/gitlabhq/tree/master/doc/api)

## Install

```bash
$ npm install node-gitlab --save
```

## Usage

```js
var gitlab = require('node-gitlab');

var client = gitlab.create({
  api: 'https://gitlab.com/api/v3',
  privateToken: 'your private token'
});
client.milestones.list({id: 1}, function (err, milestones) {
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

### RepositoryFiles

https://gitlab.com/help/api/repository_files

#### client.repositoryFiles.get({id, file_path, ref})

Get file from repository.
Allows you to receive information about file in repository like name, size, content.
Note that file content is Base64 encoded.

```json
{
  "file_name": "key.rb",
  "file_path": "app/models/key.rb",
  "size": 1476,
  "encoding": "base64",
  "content": "IyA9PSBTY2hlbWEgSW5mb3...",
  "ref": "master",
  "blob_id": "79f7bbd25901e8334750839545a9bd021f0e4c83",
  "commit_id": "d5a3ff139356ce33e37e73add446f16869741b50"
}
```

Parameters:

* {String} file_path (required) - Full path to new file. Ex. lib/class.rb
* {String} ref (required) - The name of branch, tag or commit

#### client.repositoryFiles.create({id, file_path, branch_name, encoding, content, commit_message})

Create new file in repository

Parameters:

* {String} file_path (required) - Full path to new file. Ex. lib/class.rb
* {String} branch_name (required) - The name of branch
* {String} encoding (optional) - 'text' or 'base64'. Text is default.
* {String} content (required) - File content
* {String} commit_message (required) - Commit message

#### client.repositoryFiles.update({id, file_path, branch_name, encoding, content, commit_message})

Update existing file in repository

Parameters:

* {String} file_path (required) - Full path to new file. Ex. lib/class.rb
* {String} branch_name (required) - The name of branch
* {String} encoding (optional) - 'text' or 'base64'. Text is default.
* {String} content (required) - New file content
* {String} commit_message (required) - Commit message

#### client.repositoryFiles.remove({id, file_path, branch_name, commit_message})

Delete existing file in repository

Parameters:

* {String} file_path (required) - Full path to new file. Ex. lib/class.rb
* {String} branch_name (required) - The name of branch
* {String} commit_message (required) - Commit message

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
