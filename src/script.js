function getDay() {
  let date = new Date();
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

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let currentYear = date.getFullYear();
  let currentMonth = months[date.getMonth()];
  let currentDay = days[date.getDay()];
  let currentDate = date.getDate();
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let theDate = document.querySelector("h2");
  let clock = document.querySelector("#clock");
  theDate.innerHTML = `${currentDay} | ${currentDate} ${currentMonth}, ${currentYear} `;
  clock.innerHTML = `⏲${hours}:${minutes}`;
}

getDay();

function showTemperature(response) {
  let temperature = Math.round(response.data.main.temp);
  let city = response.data.name;
  let h1 = document.querySelector("h1");
  h1.innerHTML = `${city}`;
  let tempToday = document.querySelector("#tempToday");
  tempToday.innerHTML = `${temperature}°C`;
  document.querySelector("#description").innerHTML =
    response.data.weather[0].main;
}

function search(city) {
  let apiKey = "0f8aae56fcc82b00428b3611d576957b";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showTemperature);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#inputCity").value;
  search(city);
}

let inputCity = document.querySelector("#form");
inputCity.addEventListener("submit", handleSubmit);

function showCurrentTemp(response) {
  let h1 = document.querySelector("h1");
  let temp = document.querySelector("#tempToday");
  let temperature = Math.round(response.data.main.temp);
  temp.innerHTML = `${temperature}°C`;
  let city = response.data.name;
  h1.innerHTML = `${city}`;
}

function showCurrentPosition(position) {
  let lon = position.coords.longitude;
  let lat = position.coords.latitude;
  let apiKey = "0f8aae56fcc82b00428b3611d576957b";
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
  axios.get(url).then(showCurrentTemp);
}

function getLocation() {
  navigator.geolocation.getCurrentPosition(showCurrentPosition);
}

let currentLocationButton = document.querySelector("#location-button");
currentLocationButton.addEventListener("click", getLocation);

search("Amsterdam");
