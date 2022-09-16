var cityInputEl = document.getElementById('cityInput');
var searchBtnEl = document.getElementById('search-btn');
var searchHistoryDivEl = document.getElementById('search-history');
var currentWeatherDivEl = document.getElementById('current-weather');
var futureWeatherDivEl = document.getElementById('future-weather');
var day2DivEl = document.getElementById('day2');
var day3DivEl = document.getElementById('day3');
var day4DivEl = document.getElementById('day4');
var day5DivEl = document.getElementById('day5');
var day6DivEl = document.getElementById('day6');


searchBtnEl.addEventListener('click', function(event) {
    event.preventDefault();
    recordSearchHistory();
})


var searchHistoryArr = JSON.parse(localStorage.getItem('city-log'));
if (!searchHistoryArr) {
    searchHistoryArr = [];
}

function recordSearchHistory() {
    var cityName = cityInputEl.value;
    searchHistoryArr.push(cityName);
    localStorage.setItem('city-log', JSON.stringify(searchHistoryArr));

    if (searchHistoryArr) {
        for (var i = 0; i < searchHistoryArr.length; i++) {
            console.log(searchHistoryArr[i]);
        }
    
    
    // var recentSearchesHeader = document.createElement('h2');
    
    var listSearchHistory = document.createElement('ul')
    listSearchHistory.setAttribute('class', 'list-group list-group-flush');
    
    searchHistoryDivEl.append(listSearchHistory, mostRecentSearch);
    listSearchHistory.prepend(mostRecentSearch);
    
    var mostRecentSearch = document.createElement('li');
    mostRecentSearch.setAttribute('class', 'list-group-item');
    mostRecentSearch.textContent = searchHistoryArr[0];
    
    cityInputEl.value = '';
    fetchData();
}




// function to convert city name into lat and lon
function fetchData(data) {
    var cityName = document.querySelector('#cityInput').value;
    console.log(cityName);
    var apiKey = '8161f3f9ed2905c19ded06d7bf135162'
    fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=${apiKey}`)
    .then(response => response.json())
    .then(data => {
        console.log(data);
    })
    
    
    
    
    // fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=8161f3f9ed2905c19ded06d7bf135162`)
    // .then(response => response.json())
    // .then(data => {
    //         console.log(data);
    
    //         var latitude = data[0].lat;
    //         var longitude = data[0].lon;
    //         console.log(latitude);
    //         console.log(longitude);
            // function fetchWeather(data) {
            //     fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=imperial&appid=8161f3f9ed2905c19ded06d7bf135162`)
            //     .then(response => response.json())
            //     .then(data => { console.log(data) })
            // }  
    // })    



// function renderWeather(data) {
//     console.log(data);
//     // convert date from unix
//     var unixTimeStamp = data.dt;
//     var milliseconds = unixTimeStamp * 1000;
//     var dateObject = new Date(milliseconds)
//     var dateArr = dateObject.toLocaleString().split(',');
    
//     var date = dateArr[0];
//     var currentTemp = data.main.temp;
//     var highTemp = data.main.temp_max;
//     var lowTemp = data.main.temp_min;
//     var currentHumidity = data.main.humidity;
//     var windSpeed = data.wind.speed;
//     var iconCode = data.weather[0].icon;
    
//     const iconUrl = `http://openweathermap.org/img/wn/${iconCode}@4x.png`
    
    
    
    
//     var cardDivEl = document.querySelector('.card');
    
//     let weatherIcon = document.createElement('img');
//     weatherIcon.src = iconUrl;
//     weatherIcon.alt = 'Icon displaying the current weather';
//     weatherIcon.className = 'card-img-top';
//     cardDivEl.appendChild(weatherIcon); 
//     weatherIcon.style.width = '50%';
//     weatherIcon.style.alignSelf = 'center';

//     let cardBody = document.createElement('div');
//     cardBody.className = 'card-body';
//     cardDivEl.appendChild(cardBody);
    
//     let renderCityName = document.createElement('h3');
//     renderCityName.textContent = cityName;
//     cardBody.appendChild(renderCityName);
//     renderCityName.className = 'card-title';

//     let renderDate = document.createElement('h4');
//     renderDate.textContent = date;
//     cardBody.appendChild(renderDate);
//     renderDate.className = 'card-title';
    
//     let renderTemp = document.createElement('p');
//     renderTemp.innerHTML = 'Current Temperature: ' + currentTemp + ' degrees';
//     cardBody.appendChild(renderTemp);
//     renderTemp.className = 'card-text';
    
//     let renderHighTemp = document.createElement('p');
//     renderHighTemp.innerHTML = 'High Temperature: ' + highTemp + ' degrees';
//     cardBody.appendChild(renderHighTemp);
//     renderHighTemp.className = 'card-text';
    
//     let renderLowTemp = document.createElement('p');
//     renderLowTemp.innerHTML = 'Low Temperature: ' + lowTemp + ' degrees';
//     cardBody.appendChild(renderLowTemp);
//     renderLowTemp.className = 'card-text';
    
//     let renderHumidity = document.createElement('p');
//     renderHumidity.innerHTML = 'Humidity: ' + currentHumidity + '%';
//     cardBody.appendChild(renderHumidity);
//     renderHumidity.className = 'card-text';
    
//     let renderWindSpeed = document.createElement('p');
//     renderWindSpeed.innerHTML = 'Wind Speed: ' + windSpeed + ' mph';
//     cardBody.appendChild(renderWindSpeed);
//     renderWindSpeed.className = 'card-text';
        }
    }