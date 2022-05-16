const axios = require('axios');
const _ = require('lodash');
const moment = require('moment');

async function retrieveBaseData() {
  const response = await axios.get('https://pastebin.com/raw/cVyp3McN');
  if (response.data) {
    return response.data;
  } else {
    return [
      {
        "name": "Moonlight",
        "rating": 98,
        "genres": [
          "Drama"
        ],
        "showings": [
          "18:30:00+11:00",
          "20:30:00+11:00"
        ]
      },
      {
        "name": "Zootopia",
        "rating": 92,
        "genres": [
          "Action & Adventure",
          "Animation",
          "Comedy"
        ],
        "showings": [
          "19:00:00+11:00",
          "21:00:00+11:00"
        ]
      },
      {
        "name": "The Martian",
        "rating": 92,
        "genres": [
          "Science Fiction & Fantasy"
        ],
        "showings": [
          "17:30:00+11:00",
          "19:30:00+11:00"
        ]
      },
      {
        "name": "Shaun The Sheep",
        "rating": 80,
        "genres": [
          "Animation",
          "Comedy"
        ],
        "showings": [
          "19:00:00+11:00"
        ]
      }
    ];
  }
}

// normally this should be done using the storage solution 
// but we can do it manually?
async function filterAndSort(movies, filter) {
  if (filter.genre) {
    movies = _.filter(movies, (m) => {
      console.log('- a movie: ', filter.genre, m.genres);
      for (genre of m.genres) {
        if (genre === filter.genre) {
          return true;
        }
      }
      return false;
    });
  }
  if (filter.time) {
    const date = moment().format('YYYY-MM-DD');
    const filterTime = moment(date.toString() + ' ' + filter.time + '+11:00').add(30, 'minutes');
    console.log(filterTime);
    movies = _.filter(movies, (m) => {
      for (showing of m.showings) {
        let showTime = moment(date.toString() + ' ' + showing);
        console.log('- movie ', m.name, showing, filter.time);
        console.log('--- show time', showTime);
        console.log('--- filter time: ', filterTime);
        let duration = moment.duration(showTime.diff(filterTime));
        console.log('--- duration: ', duration.asMinutes());
        if (duration.asMinutes() >= 0) {
          return true;
        }
      }
      return false;
    });
  }
  return movies;
}

async function retrieveMany(filter) {
  // TODO: add tests to the filter function
  const movies = await retrieveBaseData();
  console.log('filter: ', filter);
  const filterData = await filterAndSort(movies, filter);

  return filterData;
}

// if (!_.isEmpty(m.showings)) {

//   if (!_.isNil(filter.time)) {
//     const date = moment().format('YYYY-MM-DD');
//     let filterTime = moment(date.toString() + ' ' + filter.time + '+11:00');
//     for (showing of m.showings) {
//       let showingDateTime = moment(date.toString() + ' ' + showing);
//       validTime = filterTime.isBefore(showingDateTime);
//       if (validTime && validGenre) {
//         return m;
//       }
//     }
//   }
//   if (validTime && validGenre) {
//     return m;
//   }
// }
// })

module.exports = {
  retrieveMany,
}