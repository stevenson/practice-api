const _ = require('lodash');

const { query } = require('express-validator');

async function checkIfSortValid(sort) {
  const { field, order } = sort;

  if (!sortableFields.includes(field)) {
    throw new Error('Sort field unsupported');
  }

  if (!['DESC', 'ASC'].includes(order)) {
    throw new Error('Sort order unsupported');
  }
}

function splitSortString(str) {
  const [field, order = 'DESC'] = _.isString(str) ? str.split(',') : [];

  return { field, order };
}

module.exports = {
  retrieveMany: [
    query('size').optional().default('1').isInt({ min: 1, max: 100 })
      .withMessage('Beyond allowed range')
      .toInt(),
    query('offset').optional().isInt({ min: 0 }).withMessage('Beyond allowed range')
      .toInt(),
    query('sort').optional().customSanitizer(splitSortString).custom(checkIfSortValid),
    // TODO: add sanitizer functions to genre and time
    query('genre').optional().isAlphanumeric().withMessage('Must Be AlphaNumeric'),
    query('time').optional().isString(),
    //Note: the time string is just a string comparison
    // ideally we should be having like a movie data time stored somewhere but this should suffice
  ],
};
