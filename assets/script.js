var cityInputEl = document.getElementById('cityInput');
var searchBtnEl = document.getElementById('search-btn');
var searchHistoryDivEl = document.getElementById('search-history');
var currentWeatherDivEl = document.querySelector('.current-weather');
var cardBodyDivEl = document.querySelector('.card-body');
var futureWeatherDivEl = document.getElementById('future-weather');

var searchHistoryArr = JSON.parse(localStorage.getItem('city-log'));
if (!searchHistoryArr) {
    searchHistoryArr = [];
}

searchBtnEl.addEventListener('click', function(event) {
    event.preventDefault();
    $('.current-weather').empty();
    $('.future-weather').empty();
    recordSearchHistory();
    fetchWeather();
})


function recordSearchHistory() {
    var cityName = cityInputEl.value;
    searchHistoryArr.push(cityName);
    localStorage.setItem('city-log', JSON.stringify(searchHistoryArr));

    if (searchHistoryArr) {
        for (var i = 0; i < searchHistoryArr.length; i++) {
            // console.log(searchHistoryArr[i]);
        }

    // var capsCityName = cityName.charAt(0).toUpperCase() + cityName.slice(1);
    function capitalize(cityName) {
        return cityName.charAt(0).toUpperCase() + cityName.slice(1);
    }
    const capsCityName = cityName.split(' ').map(capitalize).join(' ');

    
    // let listSearchHistory = document.createElement('div');
    // listSearchHistory.setAttribute('class', 'list-group search-his-div');
    
    let mostRecentSearch = document.createElement('button');
    mostRecentSearch.setAttribute('class', 'list-group-item list-group-item-action');
    mostRecentSearch.setAttribute('id', 'search-history-btn');
    mostRecentSearch.setAttribute('type', 'button');
    mostRecentSearch.textContent = capsCityName;
    // mostRecentSearch.setAttribute('onclick', "window.location = ")
    // NEEDS TO BE FINISHED ONCE SITE IS DEPLOYED

    searchHistoryDivEl.prepend(mostRecentSearch);

    // Use bootstrap collapse here
}}

function fetchWeather(data) {
    var cityName = cityInputEl.value;
    // console.log(cityName);
    var apiKey = '8161f3f9ed2905c19ded06d7bf135162'
    fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=${apiKey}`)

    
    .then(response => response.json())
    .then(data => {
        // console.log(data);
        // console.log(latitude + ' and ' + longitude)
        var latitude = data[0].lat;
        var longitude = data[0].lon;
        var state = data[0].state;
        fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=imperial&appid=8161f3f9ed2905c19ded06d7bf135162`)
        .then(response => response.json())
        .then(data => { 
            // console.log(data);
            // convert date from unix
            var unixTimeStamp = data.dt;
            var milliseconds = unixTimeStamp * 1000;
            var dateObject = new Date(milliseconds)
            var dateArr = dateObject.toLocaleString().split(',');
            
            var date = dateArr[0];
            var currentTemp = data.main.temp;
            var highTemp = data.main.temp_max;
            var lowTemp = data.main.temp_min;
            var currentHumidity = data.main.humidity;
            var windSpeed = data.wind.speed;
            // var uvIndex = data.current.uvi;
            var iconCode = data.weather[0].icon;
            localStorage.setItem('icon-code', iconCode);
            
            const iconUrl = `http://openweathermap.org/img/wn/${iconCode}@4x.png`
            
            function capitalize(cityName) {
                return cityName.charAt(0).toUpperCase() + cityName.slice(1);
            }
            const capCityName = cityName.split(' ').map(capitalize).join(' ');
                
                let weatherIcon = document.createElement('img');
                weatherIcon.src = iconUrl; 
                weatherIcon.alt = data.weather[0].description + ' icon';
                weatherIcon.className = 'icon-float-left';
                
                let cardBodyDivEl = document.createElement('div');
                cardBodyDivEl.className = 'card-body';
                
                let displayCity = document.createElement('h3');
                displayCity.textContent = capCityName;
                displayCity.className = 'card-title';
                
                let displayState = document.createElement('h4');
                displayState.textContent = state;
                displayState.className = 'card-title';

                let displayDate = document.createElement('h4');
                displayDate.textContent = date;
                displayDate.className = 'card-title';

                let displayCurrentTemp = document.createElement('p');
                displayCurrentTemp.textContent = 'Current Temperature: ' + currentTemp + ' degrees';
                displayCurrentTemp.className = 'card-text text-left';
                
                let displayHighTemp = document.createElement('p');
                displayHighTemp.textContent = 'High Temperature: ' + highTemp + ' degrees';
                displayHighTemp.className = 'card-text text-left';
                
                let displayLowTemp = document.createElement('p');
                displayLowTemp.textContent = 'Low Temperature: ' + lowTemp + ' degrees';
                displayLowTemp.className = 'card-text text-left';
                
                let displayHumidity = document.createElement('p');
                displayHumidity.textContent = 'Humidity: ' + currentHumidity + '%';
                displayHumidity.className = 'card-text text-left';
                
                let displayWindSpeed = document.createElement('p');
                displayWindSpeed.textContent= 'Wind Speed: ' + windSpeed + ' mph';
                displayWindSpeed.className = 'card-text text-left';
                

                currentWeatherDivEl.append(cardBodyDivEl);
                cardBodyDivEl.append(weatherIcon, displayCity, displayState, displayDate, displayCurrentTemp, displayHighTemp, displayLowTemp, displayHumidity, displayWindSpeed);
                
                
                if (data.weather[0].icon === '01n' || data.weather[0].icon === '02n' 
                    || data.weather[0].icon === '03n' || data.weather[0].icon === '04n' 
                    || data.weather[0].icon === '09n' || data.weather[0].icon === '10n' 
                    || data.weather[0].icon === '11n' || data.weather[0].icon === '13n' 
                    || data.weather[0].icon === '50n') {
                        cardBodyDivEl.style.backgroundColor = '#191970';
                        cardBodyDivEl.style.color = 'white';
                    }

                if (data.weather[0].icon === '01d' || data.weather[0].icon === '02d' 
                || data.weather[0].icon === '03d' || data.weather[0].icon === '04d' 
                || data.weather[0].icon === '09d' || data.weather[0].icon === '10d' 
                || data.weather[0].icon === '11d' || data.weather[0].icon === '13d' 
                || data.weather[0].icon === '50d') {
                    cardBodyDivEl.style.backgroundColor = '#87CEEB';
                    cardBodyDivEl.style.color = '#191970';
                }

                // CHANGE H1 AND FOOTER FOR NIGHT AND DAY AS WELL, NEED TO CREATE SLECTORS
            })
        fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&units=imperial&appid=${apiKey}`)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            var futureWeatherDivEl = document.querySelector('.future-weather');
            // create div for each day
            var day1DivEl = document.createElement('div');
            futureWeatherDivEl.append(day1DivEl);

            var day2DivEl = document.createElement('div');
            futureWeatherDivEl.append(day2DivEl);

            var day3DivEl = document.createElement('div');
            futureWeatherDivEl.append(day3DivEl);

            var day4DivEl = document.createElement('div');
            futureWeatherDivEl.append(day4DivEl);

            var day5DivEl = document.createElement('div');
            futureWeatherDivEl.append(day5DivEl);

            for (var x = 0; x < 40; x++) {
                var dateTimeArr = data.list[x].dt_txt;
                var splitDateTimeArr = dateTimeArr.split(' ');
                var dateOnly = splitDateTimeArr[0];
                
                var currentDt = moment().format('YYYY-MM-D');
                var plus1Day = moment().add(1, 'days').format('YYYY-MM-D');
                var plus2Day = moment().add(2, 'days').format('YYYY-MM-D');
                var plus3Day = moment().add(3, 'days').format('YYYY-MM-DD');
                var plus4Day = moment().add(4, 'days').format('YYYY-MM-DD');
                var plus5Day = moment().add(5, 'days').format('YYYY-MM-DD');
                

                if (currentDt === dateOnly) {
                    console.log(x);
                }

                if (plus1Day === dateOnly) {
                    console.log(x);
                }
            
                if (plus2Day === dateOnly) {
                    console.log(x);
                }
                
                if (plus3Day === dateOnly) {
                    console.log(x);
                }

                if (plus4Day === dateOnly) {
                    console.log(x);
                }

                if (plus5Day === dateOnly) {
                    console.log(x);
                }
            }
            // for (var x = 0; x < 41; x++) {
            //     while (dateOnly = currentDt) {
            //         minTempArr.push(data.list[x].main.temp_min);
            //         maxTempArr.push(data.list[x].main.temp_max);
            //         var currentMinTemp = Math.min(...minTempArr);
            //         var currentMaxTemp = Math.max(...maxTempArr);
            //         console.log(currentMaxTemp, currentMinTemp);
            //     }
            // }




            // var dayDivArr = [day1DivEl, day2DivEl, day3DivEl, day4DivEl, day5DivEl];
            // for (var i = 6; i < data.list.length; i+= 8) {
            //     console.log(i);
            //     var day1Temp = ;
            // }
            
            // console.log(currentDayDiv);



            var iconCode = localStorage.getItem('icon-code');
            if (iconCode === '01n' || iconCode === '02n' || iconCode === '03n' 
            || iconCode === '04n' || iconCode === '09n' || iconCode === '10n' 
            || iconCode === '11n' || iconCode === '13n' || iconCode === '50n') {
                day1DivEl.style.backgroundColor = '#191970';
                day1DivEl.style.color = 'white';
                day2DivEl.style.backgroundColor = '#191970';
                day2DivEl.style.color = 'white';
                day3DivEl.style.backgroundColor = '#191970';
                day3DivEl.style.color = 'white';
                day4DivEl.style.backgroundColor = '#191970';
                day4DivEl.style.color = 'white';
                day5DivEl.style.backgroundColor = '#191970';
                day5DivEl.style.color = 'white';
            } 

            if (iconCode === '01d' || iconCode === '02d' || iconCode === '03d' 
            || iconCode === '04d' || iconCode === '09d' || iconCode === '10d' 
            || iconCode === '11d' || iconCode === '13d' || iconCode === '50d') {
                day1DivEl.style.backgroundColor = '#87ceeb';
                day1DivEl.style.color = '#191970';
                day2DivEl.style.backgroundColor = '#87ceeb';
                day2DivEl.style.color = '#191970';
                day3DivEl.style.backgroundColor = '#87ceeb';
                day3DivEl.style.color = '#191970';
                day4DivEl.style.backgroundColor = '#87ceeb';
                day4DivEl.style.color = '#191970';
                day5DivEl.style.backgroundColor = '#87ceeb';
                day5DivEl.style.color = '#191970';
            }
        })
    })
    cityInputEl.value = '';
}

        // fetch four day forcast data