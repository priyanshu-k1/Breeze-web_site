
const closeButton=document.getElementById("closeicon")
var apikeyFromOWM;
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
        // getWeatherOnLoad(localStorage.getItem("lastLocation"))
    } else {
        popUpWindow.classList.add("show");
    }
  }
  
document.addEventListener('DOMContentLoaded', function() {
    checkApiKey();
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
            weatherData.innerHTML = `
                <p>Humidity: ${data.main.humidity}%</p>
                <p>Wind Speed: ${data.wind.speed} m/s</p>
            `;
        })
        .catch(error => {
            document.getElementById('weatherData').innerHTML = `<p>${error.message}</p>`;
        });
}

function getWeather(){
    apiKey=apikeyFromOWM;
    const city = document.getElementById('locationInputBox').value;
    localStorage.setItem("lastLocation",city)
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${capitalizeFirstLetter(city).trim()}&appid=${apiKey.trim()}&units=metric`;

    fetchTheData(url)    
}
function getWeatherOnLoad(city){
    apiKey=apikeyFromOWM;
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${capitalizeFirstLetter(city).trim()}&appid=${apiKey.trim()}&units=metric`;
    fetchTheData(url)    
}
