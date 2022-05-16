const axios = require('axios');

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

async function retrieveMany() {

  const data = await retrieveBaseData();

  return data;
}


module.exports = {
  retrieveMany,
}