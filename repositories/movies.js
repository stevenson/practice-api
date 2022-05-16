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

async function retrieveMany(query) {

  const data = await retrieveBaseData();
  console.log(query)
  let filtered = _.filter(data, (movie) => {
    if (!_.isEmpty(movie.showings)) {
      let validTime = true;
      let validGenre = true;
      if (!_.isNil(query.time)) {
        const date = moment().format('YYYY-MM-DD');
        let filterTime = moment(date.toString() + ' ' + query.time + '+11:00');
        for (showing of movie.showings) {
          let showingDateTime = moment(date.toString() + ' ' + showing);
          validTime = filterTime.isBefore(showingDateTime);
          if (validTime && validGenre) {
            return movie;
          }
        }
      }
      if (validTime && validGenre) {
        return movie;
      }
    }
  })
  return filtered;
}


module.exports = {
  retrieveMany,
}