var apikeyFromOWM;
var latitudeOfArea;
var longitudeOfArea;
const screenWidth = window.innerWidth;
console.log("Current screen width: " + screenWidth + "px");
function letsChat(){
    window.open("https://t.me/Priyanshuk_01",'_blank'); 
}
var counter= 0

function closeAndOpenPopUP(){
    const popUpWindow=document.getElementById("popup_window")
    if (counter == 0) {
        popUpWindow.classList.add("show"); // Add class to show popup
        counter++;
    } else {
        popUpWindow.classList.remove("show"); // Remove class to hide popup
        counter--;
    }
    
}




function setImages(description) {
    const imgHolder = document.getElementById("weatherDescriptionImage");

    switch (description) {
        case "sunny":
        case "clear sky":
            imgHolder.src = "resource/sunny_clearsky.png";
            break;

        case "few clouds":
            imgHolder.src = "resource/few_clouds.png";
            break;

        case "scattered clouds":
        case "broken clouds":
            imgHolder.src = "resource/broken_cloud.png";
            break;

        case "overcast clouds":
            imgHolder.src = "resource/over_cast.png";
            break;

        case "light rain":
        case "light intensity drizzle":
        case "drizzle":
        case "heavy intensity drizzle":
        case "light intensity drizzle rain":
        case "drizzle rain":
        case "heavy intensity drizzle rain":
            imgHolder.src = "resource/light_rain.png";
            break;

        case "moderate rain":
            imgHolder.src = "resource/rain.png";
            break;

        case "heavy intensity rain":
        case "heavy rain":
        case "extreme rain":
        case "very heavy rain":
        case "freezing rain":
            imgHolder.src = "resource/heavy_rain.png";
            break;

        case "thunderstorm with light rain":
        case "thunderstorm with rain":
        case "thunderstorm with heavy rain":
        case "light thunderstorm":
        case "heavy thunderstorm":
            imgHolder.src = "resource/thunder_with_rain.png";
            break;

        case "light snow":
        case "snow":
        case "heavy snow":
        case "sleet":
        case "light shower sleet":
        case "shower sleet":
        case "light rain and snow":
        case "rain and snow":
            imgHolder.src = "resource/snow.png";
            break;

        case "mist":
        case "fog":
        case "haze":
            imgHolder.src = "resource/mist.png";
            break;

        case "squalls":
        case "tornado":
        case "tropical storm":
        case "hurricane":
            imgHolder.src = "resource/tornado_without_rain.png";
            break;

        case "cold":
            imgHolder.src = "resource/cold.png";
            break;

        case "hot":
            imgHolder.src = "resource/hot.png";
            break;

        case "windy":
            imgHolder.src = "resource/windy.png";
            break;

        case "hail":
            imgHolder.src = "resource/hail.png";
            break;

        default:
            imgHolder.src = "resource/broken_image.png";
            break;
    }
}
const key = 'myKey';
const weatherData = document.getElementById('weatherData');
function loadData(){
    try {
        const value = localStorage.getItem(key);
        if (value === null) {
          throw new Error();
        }
      } catch (error) {
        weatherData.innerHTML = "No data available";
        console.log(`Key '${key}' does not exist in Local Storage`);
      }
       

}
function saveData(){
    const locationInputBox=document.getElementById("apiInputBox");
    if(locationInputBox.value!='' || locationInputBox.value!=""|| (locationInputBox.value).length>10){
        localStorage.setItem('apiKey',locationInputBox.value)
    }
    else{
        const toastTrigger = document.getElementById('liveToastBtn')
        const toastLiveExample = document.getElementById('liveToast')
        if (toastTrigger) {
            const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLiveExample)
            toastBootstrap.show()
    }
}
}
function checkApiKey() {
    var apiKey = localStorage.getItem('apiKey');
    const popUpWindow=document.getElementById("popup_window")
    if (apiKey) {
        apikeyFromOWM=apiKey
        getWeatherOnLoad(localStorage.getItem("lastLocation"))
    } else {
        popUpWindow.classList.add("show");
    }
  }
  //Adding function to make cross icon red on hover but its not working..
  //have to fix it bitch and I dont know how should I fix it........
document.getElementById("closeicon").addEventListener('mouseover',function(){
    document.getElementById("closeicon").style.backgroundColor="red"
});
document.addEventListener('DOMContentLoaded', function() {
    checkApiKey();
    document.getElementById("closeicon").addEventListener("click", closeAndOpenPopUP);
    fetchGeoCoordinate(apikeyFromOWM,localStorage.getItem("lastLocation"));
  });
function capitalizeFirstLetter(str) {
    if (!str) return ''; // Handle empty string
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
// Function to fetch weather data

function fetchTheData(url){
    // Fetch weather data
    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error("City not found");
            }
            return response.json();
        })
        .then(data => {
            // Display the weather data
            const weatherData = document.getElementById('weatherData');
            const cityNameElement=document.getElementById("cityName");
            const cityTempElement=document.getElementById("TemperatureTemplate");
            const cityDescElement=document.getElementById("weatherDescription");
            cityNameElement.innerHTML=`${data.name}, ${data.sys.country}`
            cityTempElement.innerHTML= `${data.main.temp}°C`
            cityDescElement.innerHTML= `${data.weather[0].description}`
            setImages(`${data.weather[0].description}`)
        })
        .catch(error => {
            console.log(error)
        });
}

async function fetchGeoCoordinate(key,city){
    const geocodeUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${key}`;
    try {
        const response = await fetch(geocodeUrl);
    
        // Check if the response is OK (status 200-299)
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
    
        const data = await response.json();
    
        // Check if data exists and is not empty
        if (data.length === 0) {
          throw new Error('No data found for the provided location.');
        }
        const latitude = data[0].lat;
        const longitude = data[0].lon;

        // latitudeOfArea=latitude;
        // longitudeOfArea=longitude;

        getMoreDetails(key,latitude,longitude);
        GetAboutAir(key,latitude,longitude);

      } catch (error) {
        // Log any error
        console.error('Error:', error.message);
      }
}

function getMoreDetails(key,lat,lon){
    const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${key}&units=metric`;
    const rainVolumeElement =document.getElementById("RainVolume");
    const relativeHumidity =document.getElementById("RelativeHumidity");
    const windSpeedElement =document.getElementById("WindSpeed");
    fetch(weatherUrl)
    .then(response => response.json())
    .then(data => {
        // Wind speed in meters/sec
        const windSpeed = data.wind.speed;
        // Humidity in percentage
        const humidity = data.main.humidity;
        // Rain volume in the last 1 hour (if available)

        const rainVolume = data.rain ? data.rain['1h'] : 0;  // In mm
        rainVolumeElement.innerHTML=`${rainVolume} mm`;
        relativeHumidity.innerHTML=`${humidity}%`;
        windSpeedElement.innerHTML=` ${windSpeed} m/s`;

        console.log(`Wind Speed: ${windSpeed} m/s`);
        console.log(`Humidity: ${humidity}%`);
        console.log(`Rain Volume (last hour): ${rainVolume} mm`);

    })
    .catch(error => console.error('Error:', error));

}


function GetAboutAir(key,lat,lon){
    const pollutionUrl = `https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${key}`;
    const nitrogen =document.getElementById("N2");
    const aqiElement =document.getElementById("AirQualityIndex");
    const sulfur =document.getElementById("So2");
    const monoxide =document.getElementById("CO");
    const triOxide =document.getElementById("O3");
    fetch(pollutionUrl)
    .then(response => response.json())
    .then(data => {
        // AQI (Air Quality Index)
        const aqi = data.list[0].main.aqi; // AQI values: 1 (Good) to 5 (Very Poor)
        // Pollutants (concentration in μg/m³)
        const no2 = data.list[0].components.no2;  // Nitrogen dioxide
        const so2 = data.list[0].components.so2;  // Sulfur dioxide
        const co = data.list[0].components.co;    // Carbon monoxide
        const o3 = data.list[0].components.o3; 

        aqiElement.innerHTML=`${aqi}${aqiDescription(aqi)}`;
        nitrogen.innerHTML=`${no2} μg/m³`;
        sulfur.innerHTML=`${so2} μg/m³`;
        monoxide.innerHTML=` ${co} μg/m³`;
        triOxide.innerHTML=`${o3} μg/m³`;
        // CO2 is not available in OpenWeather's Air Pollution API
    })
    .catch(error => console.error('Error:', error));

}

function aqiDescription(num){
    if(num=="1"){return " (Good)"}
    else if(num=="2"){return " (Fair)"}
    else if(num=="3"){return " (Moderate)"}
    else if(num=="4"){return " (Poor)"}
    else if(num=="5"){return " (Very Poor)"}
    else{
        return "";
    }

}




function getWeather(){
    apiKey=apikeyFromOWM;
    const city = document.getElementById('locationInputBox').value;
    localStorage.setItem("lastLocation",city)
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${capitalizeFirstLetter(city).trim()}&appid=${apiKey.trim()}&units=metric`;
    fetchTheData(url)
    fetchGeoCoordinate(apiKey,city)
}
function getWeatherOnLoad(city){
    apiKey=apikeyFromOWM;
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${capitalizeFirstLetter(city).trim()}&appid=${apiKey.trim()}&units=metric`;
    fetchTheData(url)
    fetchGeoCoordinate(apiKey,city)

}
