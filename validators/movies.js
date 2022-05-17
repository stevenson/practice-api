const _ = require('lodash');
const moment = require('moment');
const { query } = require('express-validator');

const sortableFields = ['key'];

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

async function checkTime(time) {
    const errorMessage = 'Time must have an hh:mm (24 format) or hh:mm A (12 hour format followed by am or pm)';
    try {
        const date = moment().format('YYYY-MM-DD');
        const filterTime = moment(`${date.toString()}, ${time}+11:00`);
        if (!filterTime.isValid()) {
            throw new Error(errorMessage);
        }
    } catch (error) {
        throw new Error(errorMessage);
    }
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
        query('genre').optional().isString(),
        query('time').optional().isString().custom(checkTime),
        // Note: the time string is just a string comparison
        // ideally we should be having like a movie data time stored somewhere
        // but this should suffice
    ],
};
