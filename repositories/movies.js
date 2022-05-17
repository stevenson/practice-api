const axios = require('axios');
const _ = require('lodash');
const moment = require('moment');
const logger = require('helpers/logger');

async function retrieveBaseData() {
    const response = await axios.get('https://pastebin.com/raw/cVyp3McN');
    if (response.data) {
        return response.data;
    }
    return [
        {
            name: 'Moonlight',
            rating: 98,
            genres: [
                'Drama',
            ],
            showings: [
                '18:30:00+11:00',
                '20:30:00+11:00',
            ],
        },
        {
            name: 'Zootopia',
            rating: 92,
            genres: [
                'Action & Adventure',
                'Animation',
                'Comedy',
            ],
            showings: [
                '19:00:00+11:00',
                '21:00:00+11:00',
            ],
        },
        {
            name: 'The Martian',
            rating: 92,
            genres: [
                'Science Fiction & Fantasy',
            ],
            showings: [
                '17:30:00+11:00',
                '19:30:00+11:00',
            ],
        },
        {
            name: 'Shaun The Sheep',
            rating: 80,
            genres: [
                'Animation',
                'Comedy',
            ],
            showings: [
                '19:00:00+11:00',
            ],
        },
    ];
}

// normally this should be done using the storage solution
async function filterAndSort(movies, filter) {
    // TODO: maybe refactor this
    // NOTE: doing a single loop might make it faster but less readable
    // - just leaving it in this way since its not a real persistence storage
    // - prioritizing readability
    let filteredData = movies;
    if (filter.genre) {
        filteredData = _.filter(filteredData, movie => {
            logger.debug('- a movie: ', filter.genre, movie.genres);
            // eslint-disable-next-line no-restricted-syntax
            for (const genre of movie.genres) {
                if (genre.toLowerCase() === filter.genre.toLowerCase()) {
                    return true;
                }
            }
            return false;
        });
    }
    if (filter.time) {
        const date = moment().format('YYYY-MM-DD');
        const dateTimeString = `${date.toString()}, ${filter.time}+11:00`;
        logger.debug(dateTimeString);
        const filterTime = moment(dateTimeString).add(30, 'minutes');
        logger.debug(filterTime);
        filteredData = _.filter(filteredData, movie => {
            // eslint-disable-next-line no-restricted-syntax
            for (const showing of movie.showings) {
                const showTime = moment(`${date.toString()}T${showing}`);
                logger.debug('- movie ', movie.name, showing, filter.time);
                logger.debug('--- show time', showTime);
                logger.debug('--- filter time: ', filterTime);
                const duration = moment.duration(showTime.diff(filterTime));
                logger.debug('--- duration: ', duration.asMinutes());
                if (duration.asMinutes() >= 0) {
                    return true;
                }
            }
            return false;
        });
    }
    return filteredData;
}

async function retrieveMany(filter) {
    // TODO: add tests to the filter function
    const movies = await retrieveBaseData();
    logger.debug('filter: ', filter);
    const filterData = await filterAndSort(movies, filter);

    return filterData;
}

module.exports = {
    retrieveMany,
};
