const request = require("request")

const forecast =(latitude, longitude, callback) => {

    const url = "https://api.openweathermap.org/data/2.5/onecall?lat="+ latitude +"&lon="+ longitude +"&exclude=hourly,daily&appid=b00fb7b0f99abcb692a3d0a343cc5836&units=imperial"

    request({url, json:true}, (error, {body}) => {

        if(error) {

            callback("There is no internet connection", undefined);
            
        } else if (body.message) {
            
            callback("Unable to find location",undefined);
            
        }else {

            const tempreture = body.current.temp
            const humidity = body.current.humidity
            const summary = body.current.weather[0].description

            callback(undefined, `${summary}. It is currently ${tempreture} degrees out. There is a ${humidity}% chance of rain` )

        }
    })
}

module.exports = forecast