const validator = require('express-validator');
const { StatusCodes } = require('http-status-codes');
const { ErrorResponse } = require('./response-handler');

// TODO: We might be able to embed this to the a specific library since
//       this is ran before almost all controllers.

/*
* Checks for validation errors thrown by express-validator and throws a formatted error response
*
* @param {Request} req
* @throws {ErrorResponse} Throws a validation error response if there are validation errors
*/
function checkForValidationErrors(req) {
    const errors = validator.validationResult(req);
    if (!errors.isEmpty()) {
        throw new ErrorResponse('Failed to validate request', StatusCodes.BAD_REQUEST, null, { errors: errors.array() });
    }
}

module.exports = {
    checkForValidationErrors,
};
