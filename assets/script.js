var rememberCity = document.querySelector('.remember');
var forgetCity = document.querySelector('.forget');
var form = document.querySelector('form');
var getCity = document.getElementById('entercity');
var submitBtn = document.getElementById('submitcity');
var h1 = document.querySelector('h1');



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
    var currentElem = document.getElementById('current-weather');
    var baseApi = "https://api.openweathermap.org/data/2.5/weather";
    var apiKey = "8980709b01eacb693df9c072a37725fa";
    var apiUrl = baseApi + "?q=" +city+ "&units=imperial&appid=" + apiKey;

    fetch(apiUrl)
        .then(function(response) {
           
            return response.json();
        })

        .then(function(data) {
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
                
        });
       

    //5 DAY FORECAST

    
    // renders one day block of data into the dom
         
    function renderDayBlock(dayData) {
        
        var ul = document.createElement('ul');
        var liDate = document.createElement('li');
        var date = dayData.date
        var dateArray = date.split(' ')
        liDate.textContent = dayjs(dateArray[0]).format('MMM DD, YYYY')
        ul.append(liDate);
        var dayDiv = document.createElement('div');
        dayDiv.setAttribute('class', 'day');
      
        let img = document.createElement('img');
        let iconUrl = dayData.iconUrl;
        img.src = iconUrl;
        dayDiv.append(img);
        dayDiv.append(ul);
        
        var liTemp = document.createElement('li');
        liTemp.textContent = "Temp: "+dayData.temp+"\xB0";
        ul.append(liTemp);
       
        
        var liHumidity = document.createElement('li');
        liHumidity.textContent = "Humidity: "+dayData.humidity+"%";
        ul.append(liHumidity);
        
        
        var liWindspeed = document.createElement('li');
        liWindspeed.innerText = "Windspeed: "+dayData.windspeed+"mph";
        ul.append(liWindspeed);
        
        var container = document.getElementById("five-day-container");
        container.append(dayDiv);        
    };
    
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

                for (var i = 0; i <= 40; i+=8) {
                    let dayOneData = prepareData(forecastData, i);
                    renderDayBlock(dayOneData);
                }
            })           
    }

    forecastWeather();
}