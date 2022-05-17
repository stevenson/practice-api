const { StatusCodes } = require('http-status-codes');

class Response {
    constructor(data, statusCode = StatusCodes.OK, extraBodyFields = {}) {
        this.statusCode = statusCode;
        this.data = data;
        this.extraBodyFields = extraBodyFields;
        this.body = { data, ...extraBodyFields };
    }
}

module.exports = {
    Response,
};
