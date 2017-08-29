module.exports = {
  api: process.env.NODE_GITLAB_API || 'https://gitlab.com/api/v3',
  privateToken: process.env.NODE_GITLAB_TOKEN || 'enEWf516mA168tP6BiVe',
  accessToken: process.env.NODE_GITLAB_ACCESS_TOKEN || 'dbbf3e41770035b126fe203138c94007f7bc15c9ce2dd18766d243eda904dfb3',
  requestTimeout: 30000,
};
