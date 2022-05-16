const _ = require('lodash');

const truthyValues = ['1', 'true', 'yes', 't', true];

module.exports = {
  APP: {
    PORT: _.get(process.env, 'SERVER_PORT', 5000),
    NAME: _.get(process.env, 'APP_NAME', 'movies-api'),
    DESCRIPTION: _.get(process.env, 'APP_NAME', 'API backend for movie recommendation (but really just a practice api)'),
    VERSION: _.get(process.env, 'APP_VERSION', '0.0.1'),
  },
  LOG: {
    LEVEL: _.get(process.env, 'LOG_LEVEL', 'info'),
    JSON: truthyValues.includes(_.get(process.env, 'LOG_JSON', true)),
  },
};