let now = new Date();
let h2 = document.querySelector("h2");

let date = now.getDate();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[now.getDay()];
let months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
let month = months[now.getMonth()];
let hour = now.getHours();
if (hour < 10) {
  hour = `0${hour}`;
}
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}
h2.innerHTML = `${day} ${date} ${month} ${hour}:${minutes}`;

function displayWeather(response) {
  document.querySelector("#city").innerHTML = response.data.name;
  celciusTemperature = Math.round(response.data.main.temp);
  document.querySelector(
    "#todays-temperature"
  ).innerHTML = `${celciusTemperature}°C`;
  document.querySelector("#weather-description").innerHTML =
    response.data.weather[0].description;
  let wind = Math.round(response.data.wind.speed);
  document.querySelector("#todays-windspeed").innerHTML = `${wind}km/h`;
  let humidity = response.data.main.humidity;
  document.querySelector("#todays-humidity").innerHTML = `${humidity}%`;
  let weatherIcon = response.data.weather[0].icon;
  document
    .querySelector("#weather-icon")
    .setAttribute(
      "src",
      `http://openweathermap.org/img/wn/${weatherIcon}@2x.png`
    );
  document
    .querySelector("#weather-icon")
    .setAttribute("alt", "response.data.weather[0].description");

  getForecast(response.data.coord);
}

function searchCity(city) {
  let apiKey = "331c76d641825dad26f812aa56daaa6c";
  let cityApiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&&units=metric`;
  axios.get(cityApiUrl).then(displayWeather);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#location-search-input").value;
  searchCity(city);
}
document
  .querySelector("#location-search-form")
  .addEventListener("submit", handleSubmit);

function searchLocation(position) {
  let apiKey = "331c76d641825dad26f812aa56daaa6c";
  let positionApiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&&units=metric`;
  axios.get(positionApiUrl).then(displayWeather);
}
function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

document
  .querySelector("#current-location-button")
  .addEventListener("click", getCurrentLocation);

function changeFormatFahrenheit(event) {
  event.preventDefault();
  let todaysTemperature = document.querySelector("#todays-temperature");
  let fahrenheitTemperature = Math.round((celciusTemperature * 9) / 5 + 32);
  todaysTemperature.innerHTML = `${fahrenheitTemperature}°F`;
  formatCelsius.classList.remove("active");
  formatFahrenheit.classList.add("active");
}

let formatFahrenheit = document.querySelector("#fahrenheit");
formatFahrenheit.addEventListener("click", changeFormatFahrenheit);

function changeFormatCelsius(event) {
  event.preventDefault();
  let todaysTemperature = document.querySelector("#todays-temperature");
  todaysTemperature.innerHTML = `${celciusTemperature}°C`;
  formatFahrenheit.classList.remove("active");
  formatCelsius.classList.add("active");
}

let formatCelsius = document.querySelector("#celsius");
formatCelsius.addEventListener("click", changeFormatCelsius);

let celciusTemperature = null;

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"];
  return days[day];
}

function displayForecast(response) {
  let weatherForecast = response.data.daily;
  let forecast = document.querySelector("#forecast");
  let forecastHTML = `<div class="row">`;
  weatherForecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `
                <div class="col-2">
                <div class="weatherForecastDate">${formatDay(
                  forecastDay.dt
                )}</div>
                <img src="http://openweathermap.org/img/wn/${
                  forecastDay.weather[0].icon
                }@2x.png" alt="" />
                <div class="weatherForecastTemperatures">
                  <span class="forecastHighTemperature">${Math.round(
                    forecastDay.temp.max
                  )}°C</span>
                  <span class="forecastLowTemperature">${Math.round(
                    forecastDay.temp.min
                  )}°C</span>
                </div>
              </div>`;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecast.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  let apiKey = "331c76d641825dad26f812aa56daaa6c";
  let forecastApi = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(forecastApi).then(displayForecast);
}

searchCity("London");
