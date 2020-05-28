const request = require('request');

module.exports = (address, callback) => {
  address = encodeURIComponent(address);
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=pk.eyJ1IjoiaXJhbmFkcnlhbiIsImEiOiJja2FvcTBlZGkwYmJjMndwMXVwMjIweWFxIn0.c7jB0k1oZHtOvV7XXdkODA&limit=1`

  request({ url, json: true }, (err, { body }) => {
    if (err) {
      return callback('Unable to connect to location service! Try again', undefined);
    }
    if (body.features.length === 0) {
      return callback('Unable to find location! Try again', undefined);
    }

    const [{ center, place_name }] = body.features;

    callback(undefined, {
      latitude: center[1],
      longitude: center[0],
      location: place_name
    });
  });
}