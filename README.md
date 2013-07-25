gitlab [![Build Status](https://secure.travis-ci.org/fengmk2/gitlab.png)](http://travis-ci.org/fengmk2/gitlab) 
[![Dependencies](http://david-dm.org/fengmk2/gitlab.png)](http://david-dm.org/fengmk2/gitlab) 
[![Coverage Status](https://coveralls.io/repos/fengmk2/gitlab/badge.png)](https://coveralls.io/r/fengmk2/gitlab)
=======

![logo](https://raw.github.com/fengmk2/gitlab/master/logo.png)

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
 *  - {Number} id (required) - The ID of a project
 *  - {String} title (required) - The title of an milestone
 *  - {String} [description] (optional) - The description of the milestone
 *  - {String} [due_date] (optional) - The due date of the milestone
 * @param {Function(err, row)} callback
 */
Milestone.prototype.create = function (params, callback);

/**
 * Update a milestone.
 * @param {Object} params
 *  - {Number} id (required) - The ID of a project
 *  - {Number} milestone_id (required) - The ID of a project milestone
 *  - {String} title (required) - The title of an milestone
 *  - {String} [description] (optional) - The description of the milestone
 *  - {String} [due_date] (optional) - The due date of the milestone
 *  - {String} [closed] (optional) - The status of the milestone
 * @param {Function(err, row)} callback
 */
Milestone.prototype.update = function (params, callback);
```

## Authors

```bash
$ git summary 

 project  : gitlab
 repo age : 4 months
 active   : 8 days
 commits  : 17
 files    : 25
 authors  : 
    15  fengmk2                 88.2%
     2  Ondrej                  11.8%
```

## License 

(The MIT License)

Copyright (c) 2013 fengmk2 &lt;fengmk2@gmail.com&gt;

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
