const { StatusCodes } = require('http-status-codes');
const _ = require('lodash');
const { checkForValidationErrors } = require('helpers/check-validation');
const { Response } = require('helpers/response-handler');
const repo = require('repositories/movies');

async function retrieveMany(req) {
    checkForValidationErrors(req);
    const { query } = req;
    const pagination = {
        size: query.size || 100,
        offset: query.offset || 0,
        sort: query.sort || { field: 'score', order: 'DESC' },
    };
    const filter = _.pick(query, ['genre', 'time']);
    const data = await repo.retrieveMany(filter, pagination);
    // TODO: implement pagination
    return new Response(data, StatusCodes.OK, { pagination });
}

module.exports = {
    retrieveMany,
};
