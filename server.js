require('app-module-path/register');

const _ = require('lodash');
const express = require('express');
const rewrite = require('express-urlrewrite');

// load config and routes
const config = require('config');
const routes = require('routes');

// utilize a centralized error logger and error handler
const responseHandler = require('helpers/response-handler');
const logger = require('helpers/logger');
logger.configure({ appName: config.APP.NAME, level: config.LOG.LEVEL, json: config.LOG.JSON });
responseHandler.configure({ customLogger: logger });

// add everything to the app
const app = express();
app.use(rewrite('/movies', '/'));
app.use(rewrite('/movies/*', '/$1'));
app.use(rewrite('/movies?*', '/?$1'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// added ping endpoint for keep alive checks
app.get('/ping', (req, res) => res.send({
  name: config.APP.NAME,
  description: config.APP.DESCRIPTION,
  version: config.APP.VERSION,
}));

routes.setup(app);
app.use(responseHandler.handleError);

if (process.env.NODE_ENV !== 'test') {
  const port = _.get(process, 'env.PORT', config.APP.PORT);
  app.listen(port, () => {
    logger.info(`Server running on port ${port}`);
  });
}

module.exports = app;
