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

### Project

https://github.com/gitlabhq/gitlabhq/blob/master/doc/api/projects.md

#### client.projects.list({archived, order_by, sort, search, ci_enabled_first})

Get a list of projects accessible by the authenticated user.

Parameters:

- archived (optional) - if passed, limit by archived status
- order_by (optional) - Return requests ordered by `id`, `name`, `path`, `created_at`, `updated_at` or `last_activity_at` fields. Default is `created_at`
- sort (optional) - Return requests sorted in `asc` or `desc` order. Default is `desc`
- search (optional) - Return list of authorized projects according to a search criteria
- ci_enabled_first - Return projects ordered by ci_enabled flag. Projects with enabled GitLab CI go first

```json
[
  {
    "id": 4,
    "description": null,
    "default_branch": "master",
    "public": false,
    "visibility_level": 0,
    "ssh_url_to_repo": "git@example.com:diaspora/diaspora-client.git",
    "http_url_to_repo": "http://example.com/diaspora/diaspora-client.git",
    "web_url": "http://example.com/diaspora/diaspora-client",
    "tag_list": [
      "example",
      "disapora client"
    ],
    "owner": {
      "id": 3,
      "name": "Diaspora",
      "created_at": "2013-09-30T13: 46: 02Z"
    },
    "name": "Diaspora Client",
    "name_with_namespace": "Diaspora / Diaspora Client",
    "path": "diaspora-client",
    "path_with_namespace": "diaspora/diaspora-client",
    "issues_enabled": true,
    "merge_requests_enabled": true,
    "wiki_enabled": true,
    "snippets_enabled": false,
    "created_at": "2013-09-30T13: 46: 02Z",
    "last_activity_at": "2013-09-30T13: 46: 02Z",
    "creator_id": 3,
    "namespace": {
      "created_at": "2013-09-30T13: 46: 02Z",
      "description": "",
      "id": 3,
      "name": "Diaspora",
      "owner_id": 1,
      "path": "diaspora",
      "updated_at": "2013-09-30T13: 46: 02Z"
    },
    "archived": false,
    "avatar_url": "http://example.com/uploads/project/avatar/4/uploads/avatar.png"
  },
  // ...
]
```

#### client.projects.get({id})

Get a specific project

Parameters:

- id (required) - The ID or NAMESPACE/PROJECT_NAME of a project

```json
{
  "id": 3,
  "description": null,
  "default_branch": "master",
  "public": false,
  "visibility_level": 0,
  "ssh_url_to_repo": "git@example.com:diaspora/diaspora-project-site.git",
  "http_url_to_repo": "http://example.com/diaspora/diaspora-project-site.git",
  "web_url": "http://example.com/diaspora/diaspora-project-site",
  "tag_list": [
    "example",
    "disapora project"
  ],
  "owner": {
    "id": 3,
    "name": "Diaspora",
    "created_at": "2013-09-30T13: 46: 02Z"
  },
  "name": "Diaspora Project Site",
  "name_with_namespace": "Diaspora / Diaspora Project Site",
  "path": "diaspora-project-site",
  "path_with_namespace": "diaspora/diaspora-project-site",
  "issues_enabled": true,
  "merge_requests_enabled": true,
  "wiki_enabled": true,
  "snippets_enabled": false,
  "created_at": "2013-09-30T13: 46: 02Z",
  "last_activity_at": "2013-09-30T13: 46: 02Z",
  "creator_id": 3,
  "namespace": {
    "created_at": "2013-09-30T13: 46: 02Z",
    "description": "",
    "id": 3,
    "name": "Diaspora",
    "owner_id": 1,
    "path": "diaspora",
    "updated_at": "2013-09-30T13: 46: 02Z"
  },
  "permissions": {
    "project_access": {
      "access_level": 10,
      "notification_level": 3
    },
    "group_access": {
      "access_level": 50,
      "notification_level": 3
    }
  },
  "archived": false,
  "avatar_url": "http://example.com/uploads/project/avatar/3/uploads/avatar.png"
}
```

#### client.projects.create({name, path, namespace_id, description, issues_enabled, merge_requests_enabled,
  wiki_enabled, snippets_enabled, public, visibility_level, import_url})

Creates a new project owned by the authenticated user.

Parameters:

- name (required) - new project name
- path (optional) - custom repository name for new project. By default generated based on name
- namespace_id (optional) - namespace for the new project (defaults to user)
- description (optional) - short project description
- issues_enabled (optional)
- merge_requests_enabled (optional)
- wiki_enabled (optional)
- snippets_enabled (optional)
- public (optional) - if true same as setting visibility_level = 20
- visibility_level (optional)
- import_url (optional)

#### client.projects.update({id, path, namespace_id, description, default_branch, issues_enabled, merge_requests_enabled,
  wiki_enabled, snippets_enabled, public, visibility_level})

Updates an existing project

Parameters:

- id (required) - The ID of a project
- name (optional) - project name
- path (optional) - repository name for project
- description (optional) - short project description
- default_branch (optional)
- issues_enabled (optional)
- merge_requests_enabled (optional)
- wiki_enabled (optional)
- snippets_enabled (optional)
- public (optional) - if true same as setting visibility_level = 20
- visibility_level (optional)

On success, method returns 200 with the updated project. If parameters are invalid, 400 is returned.

#### client.projects.remove({id})

Removes a project including all associated resources (issues, merge requests etc.)

Parameters:

- id (required) - The ID of a project

#### client.projects.search({query, per_page, page, order_by, sort})

Search for projects by name which are accessible to the authenticated user.

Parameters:

- query (required) - A string contained in the project name
- per_page (optional) - number of projects to return per page
- page (optional) - the page to retrieve
- order_by (optional) - Return requests ordered by `id`, `name`, `created_at` or `last_activity_at` fields
- sort (optional) - Return requests sorted in `asc` or `desc` order

#### client.projects.fork({id})

Forks a project into the user namespace of the authenticated user.

Parameters:

- id (required) - The ID of the project to be forked

#### client.projects.listEvents({id})

Get the events for the specified project. Sorted from newest to latest

Parameters:

- id (required) - The ID or NAMESPACE/PROJECT_NAME of a project

```json
[
  {
    "title": null,
    "project_id": 15,
    "action_name": "closed",
    "target_id": 830,
    "target_type": "Issue",
    "author_id": 1,
    "author_username": "john",
    "data": null,
    "target_title": "Public project search field"
  },
  {
    "title": null,
    "project_id": 15,
    "action_name": "opened",
    "target_id": null,
    "target_type": null,
    "author_id": 1,
    "author_username": "john",
    "data": {
      "before": "50d4420237a9de7be1304607147aec22e4a14af7",
      "after": "c5feabde2d8cd023215af4d2ceeb7a64839fc428",
      "ref": "refs/heads/master",
      "user_id": 1,
      "user_name": "Dmitriy Zaporozhets",
      "repository": {
        "name": "gitlabhq",
        "url": "git@dev.gitlab.org:gitlab/gitlabhq.git",
        "description": "GitLab: self hosted Git management software. \r\nDistributed under the MIT License.",
        "homepage": "https://dev.gitlab.org/gitlab/gitlabhq"
      },
      "commits": [
        {
          "id": "c5feabde2d8cd023215af4d2ceeb7a64839fc428",
          "message": "Add simple search to projects in public area",
          "timestamp": "2013-05-13T18:18:08+00:00",
          "url": "https://dev.gitlab.org/gitlab/gitlabhq/commit/c5feabde2d8cd023215af4d2ceeb7a64839fc428",
          "author": {
            "name": "Dmitriy Zaporozhets",
            "email": "dmitriy.zaporozhets@gmail.com"
          }
        }
      ],
      "total_commits_count": 1
    },
    "target_title": null
  },
  {
    "title": null,
    "project_id": 15,
    "action_name": "closed",
    "target_id": 840,
    "target_type": "Issue",
    "author_id": 1,
    "author_username": "john",
    "data": null,
    "target_title": "Finish & merge Code search PR"
  }
]
```

#### client.projects.getLabels({id})

Get the labels for the specified project.

Parameters:

- id (required) - The ID or NAMESPACE/PROJECT_NAME of a project

```json
[
  { "name": "Bug", color: "#A8D695" },
  { "name": "Feature", color: "#5CB85C" }
]
```

#### client.projects.createLabel({id, name, color})

Create a label for the specified project.

Parameters:

- id (required) - The ID of a project
- name (required) - The name of the label
- color (required) - Color of the label given in 6-digit hex notation with leading '#' sign (e.g. #FFAABB)

```json
[
  { "name": "Bug", color: "#A8D695" },
  { "name": "Feature", color: "#5CB85C" }
]
```

#### client.projects.updateLabel({id, name, new_name, color})

Update a label for the specified project.

Parameters:

- id (required) - The ID of a project
- name (required) - The name of the existing label
- new_name (optional) - The new name of the label
- color (optional) - New color of the label given in 6-digit hex notation with leading '#' sign (e.g. #FFAABB)

#### client.projects.deleteLabel({id, name})

Delete a label for the specified project.

Parameters:

- id (required) - The ID of a project
- name (required) - The name of the label to be deleted

---

### Project Members

https://github.com/gitlabhq/gitlabhq/blob/master/doc/api/projects.md#team-members

#### client.projectMembers.list({id})

Get a list of a project's team members.

Parameters:

- id (required) - The ID or NAMESPACE/PROJECT_NAME of a project
- query (optional) - Query string to search for members

#### client.projectMembers.get({id, user_id})

Gets a project team member.

Parameters:

- id (required) - The ID or NAMESPACE/PROJECT_NAME of a project
- user_id (required) - The ID of a user

```json
{
  "id": 1,
  "username": "john_smith",
  "email": "john@example.com",
  "name": "John Smith",
  "state": "active",
  "created_at": "2012-05-23T08:00:58Z",
  "access_level": 40
}
```

#### client.projectMembers.create({id, user_id, access_level})

Adds a user to a project team. This is an idempotent method and can be called multiple times with the same parameters. Adding team membership to a user that is already a member does not affect the existing membership.

Parameters:

- id (required) - The ID or NAMESPACE/PROJECT_NAME of a project
- user_id (required) - The ID of a user to add
- access_level (required) - Project access level

#### client.projectMembers.update({id, user_id, access_level})

Updates a project team member to a specified access level.

Parameters:

- id (required) - The ID or NAMESPACE/PROJECT_NAME of a project
- user_id (required) - The ID of a team member
- access_level (required) - Project access level

#### client.projectMembers.remove({id, user_id})

Removes a user from a project team.

Parameters:

- id (required) - The ID or NAMESPACE/PROJECT_NAME of a project
- user_id (required) - The ID of a team member

This method is idempotent and can be called multiple times with the same parameters. Revoking team membership for a user who is not currently a team member is considered success. Please note that the returned JSON currently differs slightly. Thus you should not rely on the returned JSON structure.

---

### Deploy Keys

https://github.com/gitlabhq/gitlabhq/blob/master/doc/api/deploy_keys.md

#### client.deployKeys.list({id})

Get a list of a project's deploy keys.

Parameters:

* `{String}` `id` (required) - The ID or NAMESPACE/PROJECT_NAME of a project


#### client.deployKeys.get({id, key_id})

Gets a project deploy key.

Parameters:

* `{String}` `id` (required) - The ID or NAMESPACE/PROJECT_NAME of a project
* `{String}` `key_id` (required) - The ID of a key

```json
{
  "id": 1,
  "title": "Public key",
  "key": "ssh-rsa AAAAB3NzaC1yc2EAAAABJQAAAIEAiPWx6WM4lhHNedGfBpPJNPpZ7yKu+dnn1SJejgt4596k6YjzGGphH2TUxwKzxcKDKKezwkpfnxPkSMkuEspGRt/aZZ9wa++Oi7Qkr8prgHc4soW6NUlfDzpvZK2H5E7eQaSeP3SAwGmQKUFHCddNaP0L+hM7zhFNzjFvpaMgJw0=",
  "created_at": "2013-10-02T10:12:29Z"
}
```

#### client.deployKey.create({id, title, key})

Creates a new deploy key for a project. If deploy key already exists in another project - it will be joined to project but only if original one was is accessible by same user

Parameters:

* `{String}` `id` (required) - The ID or NAMESPACE/PROJECT_NAME of a project
* `{String}` `title` (required) - New deploy key's title
* `{String}` `key` (required) - New deploy key

#### client.deployKeys.remove({id, key_id})

Delete a deploy key from a project.

Parameters:

* `{String}` `id` (required) - The ID or NAMESPACE/PROJECT_NAME of a project
* `{String}` `key_id` (required) - The ID of the deploy key

---

### Repository Branches

https://github.com/gitlabhq/gitlabhq/blob/master/doc/api/projects.md#branches

#### client.repositoryBranches.list({id})

Lists all branches of a project.

Parameters:

- id (required) - The ID or NAMESPACE/PROJECT_NAME of a project

```json
[
  {
    "name": "async",
    "commit": {
      "id": "a2b702edecdf41f07b42653eb1abe30ce98b9fca",
      "parents": [
        {
          "id": "3f94fc7c85061973edc9906ae170cc269b07ca55"
        }
      ],
      "tree": "c68537c6534a02cc2b176ca1549f4ffa190b58ee",
      "message": "give Caolan credit where it's due (up top)",
      "author": {
        "name": "Jeremy Ashkenas",
        "email": "jashkenas@example.com"
      },
      "committer": {
        "name": "Jeremy Ashkenas",
        "email": "jashkenas@example.com"
      },
      "authored_date": "2010-12-08T21:28:50+00:00",
      "committed_date": "2010-12-08T21:28:50+00:00"
    },
    "protected": false
  },
  {
    "name": "gh-pages",
    "commit": {
      "id": "101c10a60019fe870d21868835f65c25d64968fc",
      "parents": [
        {
          "id": "9c15d2e26945a665131af5d7b6d30a06ba338aaa"
        }
      ],
      "tree": "fb5cc9d45da3014b17a876ad539976a0fb9b352a",
      "message": "Underscore.js 1.5.2",
      "author": {
        "name": "Jeremy Ashkenas",
        "email": "jashkenas@example.com"
      },
      "committer": {
        "name": "Jeremy Ashkenas",
        "email": "jashkenas@example.com"
      },
      "authored_date": "2013-09-07T12: 58: 21+00: 00",
      "committed_date": "2013-09-07T12: 58: 21+00: 00"
    },
    "protected": false
  }
]
```

#### client.repositoryBranches.get({id, branch})

Lists a specific branch of a project.

Parameters:

- id (required) - The ID or NAMESPACE/PROJECT_NAME of a project
- branch (required) - The name of the branch.

#### client.repositoryBranches.create({id, branch_name, ref})

Create a repository branch on a project.

Parameters:

- id (required) - The ID or NAMESPACE/PROJECT_NAME of a project
- branch_name (required) - The name of the branch.
- ref (required) - Create branch from commit SHA or existing branch.

#### client.repositoryBranches.remove({id, branch})

Delete repository branch

Parameters:

- id (required) - The ID of a project
- branch (required) - The name of the branch

It return 200 if succeed, 404 if the branch to be deleted does not exist or 400 for other reasons.
In case of an error, an explaining message is provided.

Success response:

```json
{
  "branch_name": "my-removed-branch"
}
```

#### client.repositoryBranches.protect({id, branch})

Protects a single branch of a project.

Parameters:

- id (required) - The ID or NAMESPACE/PROJECT_NAME of a project
- branch (required) - The name of the branch.

#### client.repositoryBranches.unprotect({id, branch})

Unprotects a single branch of a project.

Parameters:

- id (required) - The ID or NAMESPACE/PROJECT_NAME of a project
- branch (required) - The name of the branch.

---

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

---

### Merge Requests

https://github.com/gitlabhq/gitlabhq/blob/master/doc/api/merge_requests.md

https://github.com/gitlabhq/gitlabhq/blob/master/doc/api/notes.md#merge-requests


#### client.mergeRequests.list({id})

Get all merge requests for the project. This function accepts pagination parameters page and per_page to return the list of merge requests.

Parameters:

- id (required) - The ID of a project
- iid (optional) - Return the request having the given iid
- state (optional) - Return all requests or just those that are merged, opened or closed
- order_by (optional) - Return requests ordered by created_at or updated_at fields. Default is created_at
- sort (optional) - Return requests sorted in asc or desc order. Default is desc

#### client.mergeRequests.get({id, merge_request_id})

Gets a single project merge request.

Parameters:

- id (required) - The ID of a project
- merge_request_id (required) - The ID of MR


#### client.mergeRequests.create({id, source_branch, target_branch, title})

Creates a new merge request.

Parameters:

- id (required) - The ID of a project
- source_branch (required) - The source branch
- target_branch (required) - The target branch
- assignee_id (optional) - Assignee user ID
- title (required) - Title of MR
- description (optional) - Description of MR
- target_project_id (optional) - The target project (numeric id)
- labels (optional) - Labels for MR as a comma-separated list
- milestone_id (optional) - Milestone ID


If the operation is successful, 200 and the newly created merge request is returned. If an error occurs, an error number and a message explaining the reason is returned.

#### client.mergeRequests.update({id, merge_request_id})

Updates an existing merge request. You can change the target branch, title, or even close the MR.

Parameters:

- id (required) - The ID of a project
- merge_request_id (required) - ID of MR
- target_branch - The target branch
- assignee_id - Assignee user ID
- title - Title of MR
- description - Description of MR
- state_event - New state (close|reopen|merge)
- labels (optional) - Labels for MR as a comma-separated list
- milestone_id (optional) - Milestone ID

If the operation is successful, 200 and the updated merge request is returned. If an error occurs, an error number and a message explaining the reason is returned.

#### client.mergeRequests.merge({id, merge_request_id})

Merge changes submitted with MR using this API.

Parameters:

- id (required) - The ID of a project
- merge_request_id (required) - ID of MR
- merge_commit_message (optional) - Custom merge commit message
- should_remove_source_branch (optional) - if true removes the source branch
- merged_when_build_succeeds (optional) - if true the MR is merge when the build succeeds

If merge success you get 200 OK.
If it has some conflicts and can not be merged - you get 405 and error message 'Branch cannot be merged'.
If merge request is already merged or closed - you get 405 and error message 'Method Not Allowed'
If you don't have permissions to accept this merge request - you'll get a 401

#### client.mergeRequests.listNotes({id, merge_request_id})

Gets a list of all notes/comments for a single merge request.

Parameters:

- id (required) - The ID of a project
- merge_request_id (required) - The ID of a project merge request


#### client.mergeRequests.getNote({id, merge_request_id, note_id})

Returns a single note for a given merge request.

Parameters:

- id (required) - The ID of a project
- merge_request_id (required) - The ID of a project merge request
- note_id (required) - The ID of a merge request note

#### client.mergeRequests.createNote({id, merge_request_id})

Creates a new note for a single merge request.

Parameters:

- id (required) - The ID of a project
- merge_request_id (required) - The ID of a project merge request
- body (required) - The content of a note

#### client.mergeRequests.updateNote({id, merge_request_id, note_id})

Modify existing note of a merge request.

Parameters:

- id (required) - The ID of a project
- merge_request_id (required) - The ID of a project merge request
- note_id (required) - The ID of a note
- body (required) - The content of a note

#### client.mergeRequests.listCommits({id, merge_request_id})

Gets a list of all commits for a single merge request.

Parameters:

- id (required) - The ID of a project
- merge_request_id (required) - The ID of a project merge request

---

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
