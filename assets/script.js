var rememberCity = document.querySelector('.remember');
var forgetCity = document.querySelector('.forget');
var form = document.querySelector('form');
var getCity = document.getElementById('entercity');
var submitBtn = document.getElementById('submitcity');
// var forgetBtn = document.querySelector('#forgetcity');

var h1 = document.querySelector('h1');

// form.addEventListener('submit', function(e) {
//     e.preventDefault();
//     if (getCity.value === "") {
//         return
//     };
//     getWeather(getCity.value);
//     displayCityButtons();
// })

submitBtn.addEventListener('click', function() {
    if (getCity.value === "") {
        return;
    }
    // This is assuming there is an array object in local storage.
    let previousCities = new Set(JSON.parse(localStorage.getItem('saved-cities')) || []);
    // Adds the city input to the Set
    previousCities.add(getCity.value);
    // Puts the Set into localStorage by converting the Set into an Array first
    localStorage.setItem('saved-cities', JSON.stringify(Array.from(previousCities)));
    getWeather(getCity.value);
    displayCityButtons();
    
})

function savedCitySearchApi (event) {

    getWeather(event.target.textContent);
}

function displayCityButtons () {
    let previousCities = JSON.parse(localStorage.getItem('saved-cities')) || [];
    let savedCityButtonElem = document.getElementById('saved-city-buttons');
    savedCityButtonElem.textContent = "";
    previousCities.forEach(city => {
        console.log(city)
        let button = document.createElement('button');
        button.textContent = city;
        button.addEventListener('click', savedCitySearchApi)
        savedCityButtonElem.append(button);
    });
}

displayCityButtons();


// CLEAR FUNCTION

function clearContainer (elementId) {
    document.getElementById(elementId).innerHTML="";
}



function getWeather (city) {
    debugger;
    var currentElem = document.getElementById('current-weather');
    var baseApi = "https://api.openweathermap.org/data/2.5/weather";
    var apiKey = "8980709b01eacb693df9c072a37725fa";
    var apiUrl = baseApi + "?q=" +city+ "&units=imperial&appid=" + apiKey;

    debugger;
    fetch(apiUrl)
        .then(function(response) {
            debugger;
            return response.json();
        })

        .then(function(data) {
            debugger;
            clearContainer('five-day-container');
            clearContainer('icon');
            // console.log(data)

            //CURRENT WEATHER
            let printedCityName = data.name;
            // console.log(printedCityName);
            var currentCityElem = document.getElementById("city-name");
            currentCityElem.textContent = "Current Weather for " + printedCityName;

            let currentIconElem = document.getElementById('icon');
            let iconCode = data.weather[0].icon;
            // console.log(iconCode);
            let iconUrl = "https://openweathermap.org/img/wn/" + iconCode + "@2x.png";
            // console.log(iconUrl);
            let img = document.createElement('img');
            img.src = iconUrl;
            currentIconElem.append(img);
                                    
            let currentDate = dayjs().format('MMM DD, YYYY');
            // console.log(currentDate);
            var currentDateElem = document.getElementById("date");
            currentDateElem.textContent = currentDate;
                       
            let temperature = data.main.temp;
            let decimal = Math.trunc(temperature);
            // console.log(temperature);
            var currentTempElem = document.getElementById("temperature");
            currentTempElem.textContent = "Temp: " +decimal+"\xB0";

            let humidity = data.main.humidity;
            // console.log(humidity);
            var currentHumidityElem = document.getElementById("humidity");
            currentHumidityElem.textContent = "Humidity: "+humidity+"%";

            let windspeed = data.wind.speed;
            // console.log(windspeed);
            var currentWindElem = document.getElementById("windspeed");
            currentWindElem.textContent = "Windspeed: "+windspeed+"mph";

        })
        .catch (function(error){
                // debugger;
        });

        // CLEAR



            //5 DAY FORECAST

    /*
    renders one day block of data into the dom
    */       
    function renderDayBlock(dayData) {
        var ul = document.createElement('ul');
        var liDate = document.createElement('li');
        var date = dayData.date
        var dateArray = date.split(' ')
        liDate.textContent = dayjs(dateArray[0]).format('MMM DD, YYYY')
        ul.append(liDate);
        var dayDiv = document.createElement('div');
        // we want to createElement div
        dayDiv.setAttribute('class', 'day');
        // then we want to setAttribute for that div ('class', 'day')

        // then append the img and ul to the ^^^ above div
        let img = document.createElement('img');
        let iconUrl = dayData.iconUrl;
        img.src = iconUrl;
        dayDiv.append(img);
        dayDiv.append(ul);
        // then append that div to the five-day-container

        // instead of appending the ul to the five-day-container
        // we'll just append it to our newly created div
        
        // var src = document.getElementById('five-day-container');
        
        var liTemp = document.createElement('li');
        liTemp.textContent = "Temp: "+dayData.temp+"\xB0";
        ul.append(liTemp);
        // var container = document.getElementById("five-day-container");
        // container.append(ul);
        
        var liHumidity = document.createElement('li');
        liHumidity.textContent = "Humidity: "+dayData.humidity+"%";
        ul.append(liHumidity);
        // var container = document.getElementById("five-day-container");
        // container.append(ul);
        
        var liWindspeed = document.createElement('li');
        liWindspeed.innerText = "Windspeed: "+dayData.windspeed+"mph";
        ul.append(liWindspeed);
        // var container = document.getElementById("five-day-container");
        // container.append(ul);
        
        // here is where you'll append your new div to the five-day-container
        var container = document.getElementById("five-day-container");
        container.append(dayDiv)
    }
    /* 
    pass response object and get day n and return an object containing day n data
    dayNumber has to be a value between 1 and 5
    */
    function prepareData(forecastData, dayNumber) {
        let forecastIconCode = forecastData.list[dayNumber].weather[0].icon;
        console.log(forecastIconCode);
        let forecastIconUrl = "https://openweathermap.org/img/wn/" + forecastIconCode + "@2x.png";
        console.log(forecastIconUrl);
       

        var forecastDate = forecastData.list[dayNumber].dt_txt;
        console.log(forecastDate);
        

        let forecastTemperature = forecastData.list[dayNumber].main.temp;
        let decimal = Math.trunc(forecastTemperature);
        console.log(decimal);


        let forecastHumidity = forecastData.list[dayNumber].main.humidity;
        console.log(forecastHumidity);


        let forecastWindspeed = forecastData.list[dayNumber].wind.speed;
        console.log(forecastWindspeed);

        let returnObject = {
            "iconUrl": forecastIconUrl,
            "date": forecastDate,
            "temp": decimal,
            "humidity": forecastHumidity,
            "windspeed": forecastWindspeed
        };
        return returnObject;
    }


    function forecastWeather() {

        var baseApiForecast = "https://api.openweathermap.org/data/2.5/forecast";
        var apiKey = "8980709b01eacb693df9c072a37725fa";
        var apiUrlForecast = baseApiForecast + "?q=" +city+ "&units=imperial&appid=" + apiKey;
        

        fetch(apiUrlForecast)
            .then(function(response) {
            return response.json();
            })

            .then(function(forecastData) {
            console.log(forecastData);

            
            for (var i = 0; i <= 40; i+=8) {
                let dayOneData = prepareData(forecastData, i);
                renderDayBlock(dayOneData);
            }
 
            } ) 
           

        }

    forecastWeather();
}
