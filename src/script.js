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
  let temperature = Math.round(response.data.main.temp);
  document.querySelector("#todays-temperature").innerHTML = `${temperature}°C`;
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

searchCity("London");

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
