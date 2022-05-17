const path = require('path');
require('app-module-path').addPath(path.resolve());

process.env.LOG_LEVEL = 'debug';
process.env.LOG_JSON = '0';
process.env.NODE_ENV = 'test';

// Ensure that firebase won't work
process.env.FIREBASE_SERVICE_ACCOUNT = '{}';

const config = require('config');
const logger = require('helpers/logger');

logger.configure({ appName: config.APP.NAME, level: config.LOG.LEVEL, json: config.LOG.JSON });

process.on('unhandledRejection', error => logger.error(error));
