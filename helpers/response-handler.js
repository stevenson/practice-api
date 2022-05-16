const HttpStatusCodes = require('http-status-codes');
const _ = require("lodash");

let logger = console;

class ErrorResponse extends Error {
    constructor(message, statusCode = HttpStatusCodes.INTERNAL_SERVER_ERROR, logMessage = null, extraBodyFields = {}) {
        super(message);
        this.statusCode = statusCode;
        this.logMessage = logMessage;
        this.body = { message, ...extraBodyFields }
    }
}

class Response {
    constructor(data, statusCode = HttpStatusCodes.OK, extraBodyFields = {}) {
        this.statusCode = statusCode;
        this.data = data;
        this.extraBodyFields = extraBodyFields;
        this.body = { data, ...extraBodyFields };
    }
}

function configure(config) {
    logger = _.get(config, 'customLogger', console);
}

function handleError(error, req, res, next) {
    logger.debug('Controller Error', error);

    if (error instanceof ErrorResponse) {
        if (error.logMessage) {
            logger.error(error.logMessage)
        }

        return res.status(error.statusCode)
            .send(error.body)
    }

    if (!_.isEmpty(error['error'])) {
        logger.error(error['error']);
    }

    res.status(error['status'] || error['_status'] || HttpStatusCodes.INTERNAL_SERVER_ERROR)
        .send(error['data'] || error['_body'] || error['body'] || error)
}

function handleResult(res) {
    return (result) => {
        if (result instanceof Response) {
            return res.status(result.statusCode).send(result.body)
        }

        const status = _.get(result, '_status');
        return status
            ? res.status(status).send(result['data'] || result['_body'] || result['body'])
            : res.send(result)
    }
}

function handlePromise(middleware) {
    return (req, res, next) => {
        middleware(req, res)
            .then(handleResult(res))
            .catch(next)
    }
}

module.exports = {
    configure,
    handleError,
    handlePromise,
    ErrorResponse,
    Response
};
