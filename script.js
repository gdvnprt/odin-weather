function searchWeather(location) {
    let searchPull = 'https://api.weatherapi.com/v1/current.json?key=04869068a4cf4ff4b4d20647240305&q=' + location
    fetch(searchPull, {mode: 'cors'})
        .then(function(response) {
            return response.json();
        })
        // Filter out info I want here into new json object
        // current.condition.text
        // current.temp_f and temp_c
        // current.feelslike_f and feelslike_c
        // current.humidity
        // current.precip_in and precip_mm
        // current.wind_mph and kph
        // current.wind_dir
        // location.localtime
        // current.last_updated
        .then(function(response) {
            console.log(response);
        })
        .catch(function(err) {
            alert("Error");
        })
};

// Do DOM stuff with JSON object
// do a GIFY API pull with current.condition.text