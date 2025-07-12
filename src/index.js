function updatedWeather(response) {
  let temperatureElement = document.querySelector("#temperature");
  let temperature = response.data.temperature.current;
  let cityElement = document.querySelector("#city");
  //moved from the handleSearchSubmit function
  // to avoid mistyping the city name
  let timeElement = document.querySelector("#time");
  let descriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let WindSpeedElement = document.querySelector("#wind-speed");
  let date = new Date(response.data.time * 1000);
  let iconElement = document.querySelector("#icon");

  cityElement.innerHTML = response.data.city;
  timeElement.innerHTML = formateDate(date);
  descriptionElement.innerHTML = response.data.condition.description;
  humidityElement.innerHTML = `${response.data.temperature.humidity}%`;
  WindSpeedElement.innerHTML = `${response.data.wind.speed}km/h`;
  temperatureElement.innerHTML = Math.round(temperature);
  iconElement.innerHTML = `<img
    src="${response.data.condition.icon_url}" class= "icon"/>`;
}

function formateDate(date) {
  let minutes = date.getMinutes();
  let hours = date.getHours();

  let days = [
    "Saturday",
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
  ];
  let day = days[date.getDay()];

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  return `${day} ${hours}:${minutes}`;
}

function searchCity(city) {
  //new function for api(separation of concerns)
  //api call and update the interface
  //the value of the searchInput is going to send to this function
  let apiKey = "3e01514e9e60aafo05f35b074d89a4t4";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;

  axios.get(apiUrl).then(updatedWeather);
  //get the result of api
}

function handleSearchSubmit(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-city");

  searchCity(searchInput.value);
}

function displayForecast() {
  let days = ["Sat", "Sun", "Mon", "Tue", "Wed"]; //array with weekdays
  let forecastHTML = "";
  //string that provide all days //new forecast variable that is empty,
  // then i want to put all the forecast html in it.

  days.forEach(function (day) {
    //it is going to loop for each day one at a time, loope through array of days one at a time
    forecastHTML = //string through a loope
      forecastHTML +
      `
    <div class="weather-forecast-day">
      <div class="weather-forecast-date">${day}</div>
      <div clss="weather-forecast-icon">☀️</div>
      <div class="weather-forecast-tempratures">
        <div class="weather-forecast-temperature">
          <strong>31&deg;</strong>
        </div>
        <div class="weather-forecast-temperature">32&deg;</div>
      </div>
    </div>`;
  });

  forecastElement = document.querySelector("#forecast"); // select the forecast element
  forecastElement.innerHTML = forecastHTML;
  //when the loope os over, we inject the html inside our innerHTML
}

let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", handleSearchSubmit);

searchCity("Kabul");
displayForecast();
