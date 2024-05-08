function searchWeather(location) {
    let searchPull = 'https://api.weatherapi.com/v1/current.json?key=04869068a4cf4ff4b4d20647240305&q=' + location
    fetch(searchPull, {mode: 'cors'})
        .then(function(response) {
            return response.json();
        })
        .then(function(response) {
            console.log(response);
        })
        .catch(function(err) {
            alert("Error");
        })
};