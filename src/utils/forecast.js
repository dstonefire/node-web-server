const request = require('request');

const forecast = (latitude, longitude, callback) => {

    const url = 'https://api.darksky.net/forecast/8675ddd98799f6a683f191d2d1cf3be5/' + latitude  + ',' + longitude;

    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback("Unable to connect to weather service!", {summary: undefined, currentTemp: undefined, precipProb: undefined} );
        } else if (body.error) {
            callback('Unable to find location!', { latitude, longitude, summary: undefined, currentTemp: undefined, precipProb: undefined});
        } else {
            const currentTemp = body.currently.temperature;
            const precipProb = body.currently.precipProbability;
            const summary = body.daily.data[0].summary;

            callback(undefined, summary + ' It is currently ' + currentTemp + " degrees with " + precipProb + "% chance of precipitation.")
        }
    })
}

module.exports = forecast;
