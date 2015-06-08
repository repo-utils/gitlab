module.exports = {
  api: process.env.NODE_GITLAB_API || 'https://gitlab.com/api/v3',
  privateToken: process.env.NODE_GITLAB_TOKEN || 'enEWf516mA168tP6BiVe',
  requestTimeout: 15000,
};
