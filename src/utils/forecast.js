const request = require('postman-request')
//
// Goal: Create a reusable function for getting the forecast
//
// 1. Setup the "forecast" function in utils/forecast.js
// 2. Require the function in app.js and call it as shown below
// 3. The forecast function should have three potential calls to callback:
//    - Low level error, pass string for error
//    - Coordinate error, pass string for error
//    - Success, pass forecast string for data (same format as from before)

const forecast = (latitude, longitude, callback) => {

    const url = 'http://api.weatherstack.com/current?access_key=a96ecba43beded3296c66262ddd9799b&query=' + latitude + ',' + longitude+ '&units=f'

    request({url, json: true}, (error, {body}) => {
        if(error) {
          callback("unable to connect to weather service", undefined)
        }else if (body.error){
          callback("unable to find the location", undefined)
        }else{
        callback(undefined, body.current.weather_descriptions[0] + '. It is currently ' + body.current.temperature + 
        ' degrees but it feels like ' + body.current.feelslike + ' degrees out. ')
        }
    })
}



module.exports = forecast