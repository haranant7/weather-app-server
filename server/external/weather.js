const request = require('request');
require('dotenv').config();

var weatherResponse = {} ;

var getWeather= (req,callback) => {
    var city = req.query.city;
    request({
        url:`${process.env.URL_WEATHER}?q=${city}&APPID=${process.env.API_KEY_WEATHER}&units=metric`,
        json: true
    },(error,response,body)=>{
        console.log("weather api", body);        
        if (!error && response.statusCode === 200){
            processWeatherAPIResponse(body);
            request({
                url:`${process.env.URL_GETTIME}?key=${process.env.API_KEY_GETTIME}&lat=${body.coord.lat}&lng=${body.coord.lon}&format=json&by=position`,
                json: true
            },(error,response,body)=>{
                console.log("time api", body);
                if (!error && response.statusCode === 200 && body.status == "OK"){
                    processTimeAPIResponse(body);
                    weatherResponse["errorCode"] = 0;
                    callback(error,weatherResponse);
                }
                else {
                    console.log("Time API error", body);
                    callback(error,{'errorCode':100, 'statusMsg':'Time API error'});
                }
            });
        }
        else {
            console.log("Weather API error", body);
            callback(error,{'errorCode':100, 'statusMsg':'Weather API error'});
        }
    });
}

function processWeatherAPIResponse(resBody){
    weatherResponse["weather"] = resBody.weather[0].main;
    weatherResponse["weatherIcon"] = resBody.weather[0].icon;
    weatherResponse["weatherDesc"] = resBody.weather[0].description;
    weatherResponse["sunrise"] = resBody.sys.sunrise;
    weatherResponse["sunset"] = resBody.sys.sunset;
    weatherResponse["temp"] = resBody.main.temp;
}

function processTimeAPIResponse(resBody){
    weatherResponse["currentTime"] = resBody.formatted.substr(11,5);
    weatherResponse["sunrise"] = get24HrFormat(weatherResponse["sunrise"],resBody.zoneName);
    weatherResponse["sunset"] = get24HrFormat(weatherResponse["sunset"],resBody.zoneName);
}

function get24HrFormat(timestamp,zoneName){
    return new Date(timestamp*1000).toLocaleTimeString("en-US",{"timeZone":zoneName,"hour12":false}).substr(0,5);

}

module.exports.getWeather = getWeather;