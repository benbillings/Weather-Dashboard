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

var apiKey = '520320703f34c13be437af71fe35996e';

// var apiUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${cityName}&appid=${apiKey}`;
// var apiUrl2 = `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&units=imperial&appid=${apiKey}`;


function getCity (event) {
    
    event.preventDefault();
    var cityName = cityInputEl.value;
    
    var cityHeading = document.createElement('h2');
    cityHeading.textContent = cityName;
    cityHeading.id = ('city-heading');
    currentWeatherDivEl.append(cityHeading);

    currentSearch = document.createElement('button');
    currentSearch.textContent = cityName;
    currentSearch.id = cityName;
    currentSearch.id = 'result';
    searchHistoryDivEl.append(currentSearch);
    // currentSearch.setAttribute("href", "google.com")
    
    var apiUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${cityName}&appid=${apiKey}`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => getWeatherData(data))

        searchInputEl.value = ""
}