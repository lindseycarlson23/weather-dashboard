
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
            // let currentList = document.createElement('ul');
            // let printedCityName = getCity.value;
            // //let date = DAYJS stuff
            // //icon representation of weather condition
           
            let temperature = data.main.temp;
            console.log(temperature);
            
            
           

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
