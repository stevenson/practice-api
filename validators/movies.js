const { query } = require('express-validator');
const _ = require('lodash');

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
  ],
};
