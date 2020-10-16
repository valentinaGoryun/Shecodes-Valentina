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
  console.log(response)
  let temperature = Math.round(response.data.main.temp);
  let city = response.data.name;
  let h1 = document.querySelector("h1");
  let tempToday = document.querySelector("#tempToday");
  let iconElement = document.querySelector("#icon");
  let iconCode = response.data.weather[0].icon;
  let windSpeed = document.querySelector("#wind");
  let humidity = document.querySelector("#humidity");
  celciusTemperature = response.data.main.temp;
  
  tempToday.innerHTML = `${temperature}`;
  wind.innerHTML = Math.round(response.data.wind.speed);
  humidity.innerHTML = Math.round(response.data.main.humidity);
  h1.innerHTML = `${city}`;
  document.querySelector("#description").innerHTML = response.data.weather[0].main;
  iconElement.setAttribute("src",`http://openweathermap.org/img/wn/${iconCode}@2x.png`);   
  iconElement.setAttribute("alt", response.data.weather[0].description);
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
  let city = response.data.name;
  let iconElement = document.querySelector("#icon");
  let iconCode = response.data.weather[0].icon;
  let windSpeed = document.querySelector("#wind");
    let humidity = document.querySelector("#humidity");
  celciusTemperature = response.data.main.temp;
 
  h1.innerHTML = `${city}`;
  temp.innerHTML = `${temperature}`;
  wind.innerHTML = Math.round(response.data.wind.speed);
  humidity.innerHTML = Math.round(response.data.main.humidity);
  document.querySelector("#description").innerHTML = response.data.weather[0].main;
  iconElement.setAttribute("src",`http://openweathermap.org/img/wn/${iconCode}@2x.png`);   
  iconElement.setAttribute("alt", response.data.weather[0].description);
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

function displayFahrTemp(event){
event.preventDefault();
let temp = document.querySelector("#tempToday");
let fahrTemp = (celciusTemperature * 9) / 5 + 32;
temp.innerHTML = Math.round(fahrTemp);
celciusLink.classList.remove("notActive");
fahrLink.classList.add("notActive");
}

function displayCelciusTemp(event){
event.preventDefault();
let temp = document.querySelector("#tempToday");
temp.innerHTML = Math.round(celciusTemperature);s
celciusLink.classList.add("notActive");
fahrLink.classList.remove("notActive");

}

search("Amsterdam");

let celciusTemperature = null;

let fahrLink = document.querySelector("#fahr-link");
fahrLink.addEventListener("click", displayFahrTemp);

let celciusLink = document.querySelector("#celcius-link");
celciusLink.addEventListener("click", displayCelciusTemp);


