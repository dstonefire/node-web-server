const request = require('request');

// Littleton
// longitude: -105.0166
// latitude: 39.6133

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
            const tempHigh = body.daily.data[0].temperatureHigh;
            const tempLow = body.daily.data[0].temperatureLow;
            const message1 = summary + ' It is currently ' + currentTemp + " degrees. ";
            const message2 = "There is a " + precipProb + "% chance of precipitation. ";
            const message3 = "The high temperature today was " + tempHigh + " and low temperature today was " + tempLow;

            callback(undefined, message1 + message2 + message3);
        }
    })
}

module.exports = forecast;
