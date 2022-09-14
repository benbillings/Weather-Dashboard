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

// get city name
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
    .then(data => renderWeather(data)) 
}    

function renderWeather(data) {
    console.log(data);
    // convert date from unix
    let unixTimeStamp = data.dt;
    let milliseconds = unixTimeStamp * 1000;
    let dateObject = new Date(milliseconds)
    let dateArr = dateObject.toLocaleString().split(',');
    
    let date = dateArr[0];
    let currentTemp = data.main.temp;
    let highTemp = data.main.temp_max;
    let lowTemp = data.main.temp_min;
    let currentHumidity = data.main.humidity;
    let windSpeed = data.wind.speed;
    let iconCode = data.weather[0].icon;
    

    const iconUrl = `http://openweathermap.org/img/wn/${iconCode}@4x.png`
    var cardDivEl = document.querySelector('.card');
    
    let weatherIcon = document.createElement('img');
    weatherIcon.src = iconUrl;
    weatherIcon.alt = 'Icon displaying the current weather';
    weatherIcon.className = 'card-img-top';
    cardDivEl.appendChild(weatherIcon); 
    weatherIcon.style.width = '50%';
    weatherIcon.style.alignSelf = 'center';

    let cardBody = document.createElement('div');
    cardBody.className = 'card-body';
    cardDivEl.appendChild(cardBody);
    
    let renderCityName = document.createElement('h3');
    renderCityName.textContent = cityName;
    cardBody.appendChild(renderCityName);
    renderCityName.className = 'card-title';

    let renderDate = document.createElement('h4');
    renderDate.textContent = date;
    cardBody.appendChild(renderDate);
    renderDate.className = 'card-title';
    
    let renderTemp = document.createElement('p');
    renderTemp.innerHTML = 'Current Temperature: ' + currentTemp + ' degrees';
    cardBody.appendChild(renderTemp);
    renderTemp.className = 'card-text';
    
    let renderHighTemp = document.createElement('p');
    renderHighTemp.innerHTML = 'High Temperature: ' + highTemp + ' degrees';
    cardBody.appendChild(renderHighTemp);
    renderHighTemp.className = 'card-text';
    
    let renderLowTemp = document.createElement('p');
    renderLowTemp.innerHTML = 'Low Temperature: ' + lowTemp + ' degrees';
    cardBody.appendChild(renderLowTemp);
    renderLowTemp.className = 'card-text';
    
    let renderHumidity = document.createElement('p');
    renderHumidity.innerHTML = 'Humidity: ' + currentHumidity + '%';
    cardBody.appendChild(renderHumidity);
    renderHumidity.className = 'card-text';
    
    let renderWindSpeed = document.createElement('p');
    renderWindSpeed.innerHTML = 'Wind Speed: ' + windSpeed + ' mph';
    cardBody.appendChild(renderWindSpeed);
    renderWindSpeed.className = 'card-text';
}





// let renderCity = document.createElement('button');
// renderCity.textContent = cityName;
// currentCityDisplay.appendChild(renderCity);