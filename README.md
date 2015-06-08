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

Gitlab API Node.js client

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
  console.log(err, milestones);
});
```

### Thunk way

Require [co](https://github.com/visionmedia/co) and node >= `0.11.12`:

```js
var co = require('co');
var gitlab = require('node-gitlab');

var client = gitlab.createThunk({
  api: 'https://gitlab.com/api/v3',
  privateToken: 'your private token'
});

co(function* () {
  var milestones = yield client.milestones.list({id: 1});
})();
```

### Promise way

Require node >= `0.11.13` or [bluebird](https://github.com/petkaantonov/bluebird):

```js
var gitlab = require('node-gitlab');

var client = gitlab.createPromise({
  api: 'https://gitlab.com/api/v3',
  privateToken: 'your private token'
});

client.milestones.list({id: 1})
  .then(function (milestones) {
    console.log(milestones);
  })
  .catch(function (err) {
    throw err;
  });
```

## Document

@see [Gitlab API document](https://github.com/gitlabhq/gitlabhq/tree/master/doc/api).

### Issues

https://github.com/gitlabhq/gitlabhq/blob/master/doc/api/issues.md

#### client.issues.list({id})

Get a list of project issues. This function accepts pagination parameters page and per_page to return the list of project issues.

Parameters:

- id (required) - The ID of a project
- iid (optional) - Return the issue having the given `iid`
- state (optional) - Return `all` issues or just those that are `opened` or `closed`
- labels (optional) - Comma-separated list of label names
- milestone (optional) - Milestone title
- order_by (optional) - Return requests ordered by `created_at` or `updated_at` fields. Default is `created_at`
- sort (optional) - Return requests sorted in `asc` or `desc` order. Default is `desc`

#### client.issues.get({id, issue_id})

Gets a single project issue.

Parameters:

- id (required) - The ID of a project
- issue_id (required) - The ID of a project issue

```json
{
  "id": 42,
  "iid": 3,
  "project_id": 8,
  "title": "Add user settings",
  "description": "",
  "labels": [
    "feature"
  ],
  "milestone": {
    "id": 1,
    "title": "v1.0",
    "description": "",
    "due_date": "2012-07-20",
    "state": "closed",
    "updated_at": "2012-07-04T13:42:48Z",
    "created_at": "2012-07-04T13:42:48Z"
  },
  "assignee": {
    "id": 2,
    "username": "jack_smith",
    "email": "jack@example.com",
    "name": "Jack Smith",
    "state": "active",
    "created_at": "2012-05-23T08:01:01Z"
  },
  "author": {
    "id": 1,
    "username": "john_smith",
    "email": "john@example.com",
    "name": "John Smith",
    "state": "active",
    "created_at": "2012-05-23T08:00:58Z"
  },
  "state": "opened",
  "updated_at": "2012-07-12T13:43:19Z",
  "created_at": "2012-06-28T12:58:06Z"
}
```

#### client.issues.create({id, title, description, assignee_id, milestone_id, labels})

Creates a new project issue.

Parameters:

- id (required) - The ID of a project
- title (required) - The title of an issue
- description (optional) - The description of an issue
- assignee_id (optional) - The ID of a user to assign issue
- milestone_id (optional) - The ID of a milestone to assign issue
- labels (optional) - Comma-separated label names for an issue

If the operation is successful, 200 and the newly created issue is returned. If an error occurs, an error number and a message explaining the reason is returned.

#### client.issues.update({id, issue_id, title, description, assignee_id, milestone_id, labels})

Updates an existing project issue. This function is also used to mark an issue as closed.

Parameters:

- id (required) - The ID of a project
- issue_id (required) - The ID of a project's issue
- title (optional) - The title of an issue
- description (optional) - The description of an issue
- assignee_id (optional) - The ID of a user to assign issue
- milestone_id (optional) - The ID of a milestone to assign issue
- labels (optional) - Comma-separated label names for an issue
- state_event (optional) - The state event of an issue ('close' to close issue and 'reopen' to reopen it)

If the operation is successful, 200 and the updated issue is returned. If an error occurs, an error number and a message explaining the reason is returned.

#### client.issues.listNotes({id, issue_id})

Gets a list of all notes for a single issue.

Parameters:

- id (required) - The ID of a project
- issue_id (required) - The ID of an issue

```json
[
  {
    "id": 302,
    "body": "Status changed to closed",
    "attachment": null,
    "author": {
      "id": 1,
      "username": "pipin",
      "email": "admin@example.com",
      "name": "Pip",
      "state": "active",
      "created_at": "2013-09-30T13:46:01Z"
    },
    "created_at": "2013-10-02T09:22:45Z"
  },
  {
    "id": 305,
    "body": "Text of the comment\r\n",
    "attachment": null,
    "author": {
      "id": 1,
      "username": "pipin",
      "email": "admin@example.com",
      "name": "Pip",
      "state": "active",
      "created_at": "2013-09-30T13:46:01Z"
    },
    "created_at": "2013-10-02T09:56:03Z"
  }
]
```

#### client.issues.getNote({id, issue_id, note_id})

Returns a single note for a specific project issue

Parameters:

- id (required) - The ID of a project
- issue_id (required) - The ID of a project issue
- note_id (required) - The ID of an issue note

#### client.issues.createNote({id, issue_id})

Creates a new note to a single project issue.

Parameters:

- id (required) - The ID of a project
- issue_id (required) - The ID of an issue
- body (required) - The content of a note

#### client.issues.updateNote({id, issue_id, note_id})

Modify existing note of an issue.

Parameters:

- id (required) - The ID of a project
- issue_id (required) - The ID of an issue
- note_id (required) - The ID of a note
- body (required) - The content of a note

### Milestones

https://github.com/gitlabhq/gitlabhq/blob/master/doc/api/milestones.md

#### client.milestones.list({id})

Returns a list of project milestones.

```json
[
  {
    "id": 12,
    "iid": 3,
    "project_id": 16,
    "title": "10.0",
    "description": "Version",
    "due_date": "2013-11-29",
    "state": "active",
    "updated_at": "2013-10-02T09:24:18Z",
    "created_at": "2013-10-02T09:24:18Z"
  }
]
```

Parameters:

- {String} id (required) - The ID of a project
- {String} iid (optional) - Return the milestone having the given iid

#### client.milestones.get({id, milestone_id})

Gets a single project milestone.

Parameters:

- {String} id (required) - The ID of a project
- {String} milestone_id (required) - The ID of a project milestone

#### client.milestones.create({id, title, description, due_date})

Creates a new project milestone.

Parameters:

- {String} id (required) - The ID of a project
- {String} title (required) - The title of an milestone
- {String} description (optional) - The description of the milestone
- {String} due_date (optional) - The due date of the milestone

#### client.milestones.update({id, milestone_id, title, description, due_date})

Updates an existing project milestone.

Parameters:

- {String} id (required) - The ID of a project
- {String} milestone_id (required) - The ID of a project milestone
- {String} title (optional) - The title of a milestone
- {String} description (optional) - The description of a milestone
- {String} due_date (optional) - The due date of the milestone
- {String} state_event (optional) - The state event of the milestone (`close`|`activate`)

#### client.milestones.listIssues({id, milestone_id})

Gets all issues assigned to a single project milestone.

Parameters:

- {String} id (required) - The ID of a project
- {String} milestone_id (required) - The ID of a project milestone

### Hooks

https://github.com/gitlabhq/gitlabhq/blob/master/doc/api/projects.md#hooks

#### client.hooks.list({id})

Get a list of project hooks.

Parameters:

- {String} id (required) - The ID or NAMESPACE/PROJECT_NAME of a project

#### client.hooks.get({id, hook_id})

Get a specific hook for a project.

```json
{
  "id": 1,
  "url": "http://example.com/hook",
  "project_id": 3,
  "push_events": "true",
  "issues_events": "true",
  "merge_requests_events": "true",
  "created_at": "2012-10-12T17:04:47Z"
}
```

Parameters:

* {String} id (required) - The ID or NAMESPACE/PROJECT_NAME of a project
* {String} hook_id (required) - The ID of a project hook

#### client.hooks.create({id, url, push_events, issues_events, merge_requests_events, tag_push_events})

Adds a hook to a specified project.

Parameters:

* {String} id (required) - The ID or NAMESPACE/PROJECT_NAME of a project
* {String} url (required) - The hook URL
* {Boolean} push_events - Trigger hook on push events, default is `true`
* {Boolean} issues_events - Trigger hook on issues events
* {Boolean} merge_requests_events - Trigger hook on merge_requests events
* {Boolean} tag_push_events - Trigger hook on push_tag events

#### client.hooks.update({id, hook_id, url, push_events, issues_events, merge_requests_events, tag_push_events})

Edits a hook for a specified project.

Parameters:

* {String} id (required) - The ID or NAMESPACE/PROJECT_NAME of a project
* {String} hook_id (required) - The ID of a project hook
* {String} url (required) - The hook URL
* {Boolean} push_events - Trigger hook on push events, default is `true`
* {Boolean} issues_events - Trigger hook on issues events
* {Boolean} merge_requests_events - Trigger hook on merge_requests events
* {Boolean} tag_push_events - Trigger hook on push_tag events

#### client.hooks.remove({id, hook_id})

Removes a hook from a project. This is an idempotent method and can be called multiple times. Either the hook is available or not.

Parameters:

* {String} id (required) - The ID or NAMESPACE/PROJECT_NAME of a project
* {String} hook_id (required) - The ID of a project hook

### RepositoryFiles

https://github.com/gitlabhq/gitlabhq/blob/master/doc/api/repository_files.md

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

Copyright (c) 2015 repo-utils
Copyright (c) 2013 - 2014 fengmk2 <fengmk2@gmail.com>

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
