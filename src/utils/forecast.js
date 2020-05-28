const request = require('request');

module.exports = (latitude, longitude, callback) => {
  const url = `http://api.weatherstack.com/current?access_key=c82a5d856dcb66a83ef84e2eca2adf2d&query=${latitude},${longitude}`;

  request({ url, json: true }, (err, { body }) => {
    if (err) {
      return callback('Unable to connect to weather service! Try again', undefined);
    }
    if (body.error) {
      return callback('Unable to find location! Try again', undefined);
    }

    const { temperature, feelslike, weather_descriptions } = body.current;

    callback(undefined, { temperature, feelslike, description: weather_descriptions[0] });
  });
}