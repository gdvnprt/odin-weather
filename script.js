//DOM manipulation here
const weatherForm = document.querySelector('#weather-form');

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const fd = new FormData(weatherForm);
    let searchInput = Object.fromEntries(fd);
    searchInput = searchInput.search.replace(/\s+/g, '-').toLowerCase();
    searchWeather(searchInput);
});

//base search function
function searchWeather(location) {
    let searchPull = 'https://api.weatherapi.com/v1/current.json?key=04869068a4cf4ff4b4d20647240305&q=' + location;
    fetch(searchPull, {mode: 'cors'})
        .then(function(response) {
            return response.json();
        })
        .then(function(response) {
            return filterWeather(response);
        })
        .then(function(response) {
            displayWeather(response);
        })
        .catch(function(err) {
            alert(err);
        })
};


//filter the returned object from weather API
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

const displayWeather = (object) => {

    const placeText = document.querySelector('#place-text');
    placeText.innerHTML = object.location.place;

    const otherLocText = document.querySelector('#small-location-text');
    otherLocText.innerHTML = object.location.region + ", " + object.location.country;

    const timeText = document.querySelector('#local-time-text');
    timeText.innerHTML = object.time.local;

    const updateText = document.querySelector('#last-updated-text');
    updateText.innerHTML = object.time.lastUpdated;

    //unit toggle here
    const checkMetric = document.querySelector('#metric')
    //continuing
    const tempText = document.querySelector('#temp-text');
    if (checkMetric.checked) {
        tempText.innerHTML = object.temp.cels.deg_c;
    } else {
        tempText.innerHTML = object.temp.faren.deg_f;
    };
    
    const conditionText = document.querySelector('#condition-text');
    conditionText.innerHTML = object.condition;

    const windSpeedText = document.querySelector("#wind-speed-text");
    if (checkMetric.checked) {
        windSpeedText.innerHTML = object.wind.windSpeed.kph;
    } else {
        windSpeedText.innerHTML = object.wind.windSpeed.mph;
    };

    const windDirText = document.querySelector('#wind-direction-text');
    windDirText.innerHTML = object.wind.direction;

    const humidityText = document.querySelector('#humidity-text');
    humidityText.innerHTML = object.humidity + "%";

    const gifDiv = document.querySelector('#gif-div');
    while (gifDiv.firstChild) {
        gifDiv.removeChild(gifDiv.firstChild);
    };
    gifSearch(object);
};

function gifSearch(object) { 
    const newGif = document.createElement('img');
    let searchStr = object.condition;
    gifStr = searchStr.replace(/\s+/g, '-').toLowerCase();
    let gifTerm = 'https://api.giphy.com/v1/gifs/translate?api_key=RECjs3jIRTKUzZOoPwnj6QKVtble9rpU&s=' + gifStr;
    fetch(gifTerm, {mode: 'cors'})
        .then(function(response) {
            return response.json();
        })
        .then(function(response) {
            return response.data.images.original.url;
        })
        .then(function(response) {
            newGif.src = response.data.images.original.url;
            gifDiv.appendChild(newGif);
        })
        .catch(function(err) {
            console.log(err);
        });
};