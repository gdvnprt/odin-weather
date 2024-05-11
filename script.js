function searchWeather(location) {
    let searchPull = 'https://api.weatherapi.com/v1/current.json?key=04869068a4cf4ff4b4d20647240305&q=' + location
    fetch(searchPull, {mode: 'cors'})
        .then(function(response) {
            return response.json();
        })
        .then(function(response) {
            return filterWeather(response);
        })
        .then(function(response) {
            console.log(response);
        })
        .catch(function(err) {
            alert(err);
        })
};

// Do DOM stuff with JSON object
// do a GIFY API pull with current.condition.text

function filterWeather(jsonObject) {
    let place = jsonObject.location.name;
    let region = jsonObject.location.region;
    let country = jsonObject.location.country;
    let location = { place, region, country };

    let local = jsonObject.location.localtime;
    let lastUpdated = jsonObject.current.last_updated;
    let time = { local, lastUpdated };

    let condition = jsonObject.current.condition.text;

    let deg_f = jsonObject.current.temp_f
    let feelslike_f = jsonObject.current.feelslike_f;
    let faren = { deg_f, feelslike_f };

    let deg_c = jsonObject.current.temp_c;
    let feelslike_c = jsonObject.current.feelslike_c;
    let cels = { deg_c, feelslike_c };

    let temp = { faren, cels };

    let humidity = jsonObject.current.humidity;

    let mph = jsonObject.current.wind_mph;
    let kph = jsonObject.current.wind_kph;
    let windSpeed = { mph, kph };
    let direction = jsonObject.current.wind_dir;
    let wind = { direction, windSpeed };

    return { location, time, condition, temp, humidity, wind };
};