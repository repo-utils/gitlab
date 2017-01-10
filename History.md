
1.6.0 / 2017-01-11
==================

  * feat: Adding repository.compare() (#30)

1.5.0 / 2017-01-10
==================

  * feat: Add repository.archive functionality (#29)
  * test: Fixed Testing (#26)

1.4.0 / 2016-10-12
==================

  * feat: gets a list of all commits for a single merge request. (#25)

1.3.0 / 2016-08-23
==================

  * Adds support for MR notes (#20)
  * Replace depracted package (#24)
  * removed old test for deprecated gitlab functionality
  * fixed project tests
  * Fixed project member test
  * fixed gitlab test
  * fixed issue tests
  * fixed hook tests

1.2.1 / 2015-08-26
==================

 * Missing code block in README
 * Fix accidental change in README
 * Add support for project deploy keys

1.2.0 / 2015-08-26
==================

 * feat: Ability to list project labels

1.1.0 / 2015-06-11
==================

 * docs: improve document
 * feat(issues): add getNote(), updateNote()

1.0.0 / 2014-10-12
==================

 * support promise and thunk. fixed #6
 * test travis use node 0.11
 * mv all resources to lib/resources

0.4.1 / 2014-09-18
==================

 * add groups and projectMembers

0.4.0 / 2014-08-22
==================

 * add groupMembers resource

0.3.0 / 2014-07-05
==================

  * bump restful-client

0.2.1 / 2014-06-10
==================

 * add getRawBlob() on repository
 * add: Get the raw file contents for a blob by blob sha

0.2.0 / 2014-05-29
==================

 * add repository files api

0.1.2 / 2014-05-27
==================

 * Added global hooks (@vsviridov)

0.1.1 / 2014-05-13
==================

 * Add MergeRequest resource. (@ledsun)

0.1.0 / 2013-08-07
==================

  * use restful-client
  * fix package.json desc

0.0.7 / 2013-07-26
==================

  * support repository api

0.0.6 / 2013-07-25
==================

  * added user(s) ressource (@Ondrej)
  * Create user.js
  * fixed test cases

0.0.5 / 2013-05-06
==================

  * move requestData to data when error
  * fixed test case for gitlab@0.5; add debug;

0.0.4 / 2013-03-27
==================

  * add client.projects.getByPath()

0.0.3 / 2013-03-26
==================

  * support custom token
  * open create issue case

0.0.2 / 2013-03-25
==================

  * add hook, issue, member, milestone, project
  * remove client config

0.0.1 / 2013-03-22
==================

  * init version, only support milestone get(), list(), create(), update()
