const apiKey = "e40d422451dd18756a2b41146de056af";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon")

async function checkWeather(city) {
    // Correcting the URL construction
    const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
    var data = await response.json();
    console.log(data);

    document.querySelector(".city").innerHTML = data.name;
    document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C"; 
    document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
    document.querySelector(".wind").innerHTML = data.wind.speed + "Km/h";

    if(data.weather[0].main == "Clear"){
       weatherIcon.src = "icons/clear.png";
    }
    else if(data.weather[0].main == "Clouds"){
        weatherIcon.src = "icons/cloud.png";
     }
     else if(data.weather[0].main == "Drizzle"){
        weatherIcon.src = "icons/drizzle.png";
     }
     else if(data.weather[0].main == "Rain"){
        weatherIcon.src = "icons/rain.png";
     }
     else if(data.weather[0].main == "Mist"){
        weatherIcon.src = "icons/mist.png";
     }
}

searchBtn.addEventListener("click", () => {
    checkWeather(searchBox.value);
});
