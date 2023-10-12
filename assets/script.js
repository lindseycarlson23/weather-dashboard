
// open weather api key
// 8980709b01eacb693df9c072a37725fa


var rememberCity = document.querySelector('.remember');
var forgetCity = document.querySelector('.forget');
var form = document.querySelector('form');
var getCity = document.querySelector('#entercity');
var submitBtn = document.querySelector('#submitcity');
var forgetBtn = document.querySelector('#forgetcity');

var h1 = document.querySelector('h1');

form.addEventListener('submit', function(e) {
    e.preventDefault();
    getWeather(getCity.value);
    displayCityButtons();
})

submitBtn.addEventListener('click', function() {
    let previousCities = JSON.parse(localStorage.getItem('saved-cities')) || [];
    previousCities.push(getCity.value);
    localStorage.setItem('saved-cities', JSON.stringify(previousCities));

})

function savedCitySearchApi (event) {
    getWeather(event.target.innerText);
}

function displayCityButtons () {
    let previousCities = JSON.parse(localStorage.getItem('saved-cities')) || [];
    let savedCityButtonElem = document.querySelector('#saved-city-buttons');
    savedCityButtonElem.innerHTML = "";
    previousCities.forEach(city => {
        console.log(city)
        let button = document.createElement('button');
        button.textContent = city;
        button.addEventListener('click', savedCitySearchApi)
        savedCityButtonElem.append(button);
    });
}

displayCityButtons();


function getWeather (city) {

    var currentElem = document.getElementById('current-weather');
    var baseApi = "https://api.openweathermap.org/data/2.5/weather";
    var apiKey = "8980709b01eacb693df9c072a37725fa"
    var apiUrl = baseApi + "?q=" +city+ "&units=imperial&appid=" + apiKey;

    fetch(apiUrl)
        .then(function(response) {
            return response.json();
        })

        .then(function(data) {
            console.log(data)

            let printedCityName = getCity.value;
            console.log(printedCityName);
            var currentCityElem = document.getElementById("city-name");
            currentCityElem.innerHTML = printedCityName;

            let iconCode = data.weather[0].icon;
            console.log(iconCode);
            let iconUrl = "https://openweathermap.org/img/wn/" + iconCode + "@2x.png";
            console.log(iconUrl);
            var img = document.createElement('img');
            img.src = iconUrl;
            var src = document.getElementById('icon');
            src.append(img);
            
            
            let currentDate = dayjs().format('MMM DD, YYYY');
            console.log(currentDate);
            var currentDateElem = document.getElementById("date");
            currentDateElem.innerHTML = currentDate;
                       
            let temperature = data.main.temp;
            console.log(temperature);
            var currentTempElem = document.getElementById("temperature");
            currentTempElem.innerHTML = "Temperature: "+temperature;

            let humidity = data.main.humidity;
            console.log(humidity);
            var currentHumidityElem = document.getElementById("humidity");
            currentHumidityElem.innerHTML = "Humidity: "+humidity;

            let windspeed = data.wind.speed;
            console.log(windspeed);

            // var currentConditions = [printedCityName, currentDate, "temperature: "+ temperature, humidity, windspeed]

            // for (var i = 0; i = currentConditions.length; i++) {
            //     let currentConditions = document.createElement('li')
            //     currentConditions.innerText = [i];
            //     currentElem.append(currentConditions);
            // }
            
            
            // currentConditionsFact.innerText = "Temperature: "+temperature;
            // currentElem.append(currentConditionsFact);
            // currentConditionsFact.innerText = iconCode;




            

            
           

        })

       
}


//display the weather items on the page

    // var currentElem = document.getElementById('current-weather');
    // var fiveDayElem = document.getElementById('five-day-forecast');

    // var city = cityInput;
    // var baseApi = "https://api.openweathermap.org/data/2.5/forecast";
    // var lat = 44.34;
    // var lon = 10;
    // var apiKey = "8980709b01eacb693df9c072a37725fa"
    // var apiUrl = baseApi + "?lat=" +lat+ "&lon=" +lon+ "&appid=" + apiKey;

    // fetch(apiUrl)
    //     .then(function(response) {
    //         return response.json();
    //     })

    //     .then(function(data) {
    //         console.log(data)
    //         var currentWeather;
    //         var fiveDayForecast;

    //         currentElem.innerHTML = currentWeather
    //         fiveDayElem.innerHTML = fiveDayForecast

    //     })

//     }
// //click on search, city is appended to URL sent to API
