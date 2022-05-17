const { handlePromise } = require('helpers/response-handler');
const validator = require('validators/movies');
const controller = require('controllers/movies');

function setup(app) {
    app.get('', validator.retrieveMany, handlePromise(controller.retrieveMany));
}

module.exports = { setup };
