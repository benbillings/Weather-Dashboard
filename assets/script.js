var cityInputEl = document.getElementById('cityInput');
var searchBtnEl = document.getElementById('searchBtn');
var searchHistoryDivEl = document.getElementById('searchHistory');
var currentWeatherDivEl = document.getElementById('currentWeather');
var futureWeatherDivEl = document.getElementById('futureWeather');
var day2DivEl = document.getElementById('day2');
var day3DivEl = document.getElementById('day3');
var day4DivEl = document.getElementById('day4');
var day5DivEl = document.getElementById('day5');
var day6DivEl = document.getElementById('day6');

const apiKey = '060d14e161e683217f175e18c35d2138';

searchBtnEl.addEventListener('click', getCity);

function getCity() {
    var searchInput = cityInputEl.value;
    localStorage.setItem('cityName', searchInput);
}

// variable for city name
var cityName = localStorage.getItem('cityName')
fetchCity();

// function to convert city name into lat and lon
function fetchCity(data) {
    fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=${apiKey}`)
    .then(response => response.json())
    .then(data => fetchWeatherData(data));
}

function fetchWeatherData(data) {
    console.log(data);
    var latitude = data[0].lat;
    var longitude = data[0].lon;
    console.log(latitude);
    console.log(longitude);

    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=imperial&appid=${apiKey}`)
    .then(response => response.json())
    .then(data => {
        console.log(data);
        let currentTemp = data.main.temp;
        let highTemp = data.main.temp_max;
        let lowTemp = data.main.temp_min;
        let currentHumidity = data.main.humidity;
        let windSpeed = data.wind.speed;
        
        console.log(currentTemp);
        console.log(currentHumidity);
        console.log(windSpeed);
        
    })

}

