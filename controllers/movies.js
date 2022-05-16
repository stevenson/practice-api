const HttpStatusCodes = require('http-status-codes');
const { checkForValidationErrors } = require('helpers/check-validation');
const { Response } = require('helpers/response-handler')
const repo = require('repositories/movies');

async function retrieveMany(req) {
  checkForValidationErrors(req);
  const { query } = req;
  const pagination = {
    size: query.size || 100,
    offset: query.offset || 0,
    sort: query.sort || { field: 'score', order: 'DESC' },
  };
  console.log('test');
  const data = await repo.retrieveMany(query, pagination);
  return new Response(data, HttpStatusCodes.OK, { pagination })
}

module.exports = {
  retrieveMany,
};
