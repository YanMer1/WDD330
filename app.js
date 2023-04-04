const display = document.querySelector("#weather-info");
const displayAlert = document.querySelector("#weather-alert");

const searchBtn = document.querySelector("#search-btn");
searchBtn.addEventListener("click", fetchWeather);

function fetchWeather() {
  const searchInput = document.querySelector("#search-input").value;
  if (!searchInput) {
    return;
  }

  // Clear previous weather information
  display.innerHTML = "";
  displayAlert.innerHTML = "";

  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${searchInput}&appid=11a2e58d6328f2a786e3358f2c695671&units=imperial`;

  fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => {
      const lat = data.coord.lat;
      const lon = data.coord.lon;
      const oneCallUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly&appid=11a2e58d6328f2a786e3358f2c695671&units=imperial`;
      return fetch(oneCallUrl);
    })
    .then((response) => response.json())
    .then((weatherData) => {
      currentWeather(weatherData);
      createDailyCards(weatherData);
    })
    .catch((error) => {
      console.error(error);
      displayAlert.innerHTML = "Unable to retrieve weather information.";
      showAlert();
    });
}

const weekday = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
const month = [
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

function createDailyCards(weatherData) {
    for (let i = 1; i < 4; i++) {
        let card = document.createElement("div");
        let h2 = document.createElement("h2");
        let pic = document.createElement("picture");
        let img = document.createElement("img");
        let p1 = document.createElement("p");
        let p2 = document.createElement("p");
        let p3 = document.createElement("p");

        const d = new Date(+new Date() + 86400000 * i);
        h2.innerHTML = `${weekday[d.getDay()]}, ${month[d.getMonth()]} ${d.getDate()} ${d.getFullYear()}`;
        img.setAttribute("src", `https://yanmer1.github.io//WDD330/images/weatherIcons/${weatherData.daily[i].weather[0].icon}.png`);
        img.setAttribute("width", "75");

        // Capitalize first letter of each word.
        const descweather = weatherData.daily[i].weather[0].description;
        const descweatherdisplay = descweather.split(" ");
        for (let i = 0; i < descweatherdisplay.length; i++) {
            descweatherdisplay[i] = descweatherdisplay[i].charAt(0).toUpperCase() + descweatherdisplay[i].slice(1);
        }

        img.setAttribute("alt", `${descweather}`);
        p1.innerHTML = `${Math.round((weatherData.daily[i].temp.day.toFixed(0)))}°F`;
        p2.innerHTML = `${descweather}`;

        card.classList.add("daily");

        card.appendChild(h2);
        card.appendChild(pic);
        pic.appendChild(img);
        card.appendChild(p1);
        card.appendChild(p2);
        card.appendChild(p3);

        display.append(card);
    }
}

function currentWeather(weatherData) {
  let card = document.createElement("div");
  let h2 = document.createElement("h2");
  let pic = document.createElement("picture");
  let img = document.createElement("img");
  let p1 = document.createElement("p");
  let p2 = document.createElement("p");
  let p3 = document.createElement("p");

  h2.innerHTML = `Current Weather`;
  img.setAttribute("src",`https://yanmer1.github.io//WDD330/images/weatherIcons/${weatherData.current.weather[0].icon}.png`);

  // Capitalize first letter of each word.
  const descweather = weatherData.current.weather[0].description;
  const descweatherdisplay = descweather.split(" ");
  for (var i = 0; i < descweatherdisplay.length; i++) {
    descweatherdisplay[i] = descweatherdisplay[i].charAt(0).toUpperCase() + descweatherdisplay[i].slice(1);
  }

  img.setAttribute("alt", `${descweather}`);
  p1.innerHTML = `${Math.round((weatherData.current.temp.toFixed(0)))}°F`;
  p2.innerHTML = `${descweather}`;
  p3.innerHTML = `Humidity: ${weatherData.current.humidity}`;

  card.appendChild(h2);
  card.appendChild(pic);
  pic.appendChild(img);
  card.appendChild(p1);
  card.appendChild(p2);
  card.appendChild(p3);

  display.append(card);
}

function currentWeather(weatherData) {
  let card = document.createElement("div");
  let h2 = document.createElement("h2");
  let pic = document.createElement("picture");
  let img = document.createElement("img");
  let p1 = document.createElement("p");
  let p2 = document.createElement("p");
  let p3 = document.createElement("p");

  h2.innerHTML = `Current Weather`;
  img.setAttribute("src",`https://yanmer1.github.io//WDD330/images/weatherIcons/${weatherData.current.weather[0].icon}.png`);

  // Capitalize first letter of each word.
  const descweather = weatherData.current.weather[0].description;
  const descweatherdisplay = descweather.split(" ");
  for (var i = 0; i < descweatherdisplay.length; i++) {
    descweatherdisplay[i] = descweatherdisplay[i].charAt(0).toUpperCase() + descweatherdisplay[i].slice(1);
  }

  img.setAttribute("alt", `${descweather}`);
  p1.innerHTML = `${Math.round((weatherData.current.temp.toFixed(0)))}°F`;
  p2.innerHTML = `${descweather}`;
  p3.innerHTML = `Humidity: ${weatherData.current.humidity}`;

  card.appendChild(h2);
  card.appendChild(pic);
  pic.appendChild(img);
  card.appendChild(p1);
  card.appendChild(p2);
  card.appendChild(p3);

  display.append(card);
}

function weatherAlert(weatherData) {
  let card = document.createElement("div");
  let button = document.createElement("button");
  let h2 = document.createElement("h2");
  let p1 = document.createElement("p");
  let p2 = document.createElement("p");
  let p3 = document.createElement("p");
  let p4 = document.createElement("p");
  let p5 = document.createElement("p");

  button.innerHTML = `X`;
  button.setAttribute("onclick", `hideAlert()`);
  h2.innerHTML = `Weather Alert`;
  p1.innerHTML = `${weatherData.alerts[0].sender_name}`;
  p2.innerHTML = `${weatherData.alerts[0].event}`;
  const dStart = new Date(weatherData.alerts[0].start);
  const dEnd = new Date(weatherData.alerts[0].end);
  p3.innerHTML = `From: ${dStart}`;
  p4.innerHTML = `To: ${dEnd}`;
  p5.innerHTML = `${weatherData.alerts[0].description}`;

  card.appendChild(button);
  card.appendChild(h2);
  card.appendChild(p1);
  card.appendChild(p2);
  card.appendChild(p3);
  card.appendChild(p4);
  card.appendChild(p5);

  displayAlert.classList.remove("hidden");
  displayAlert.append(card);
}

async function apiFetch(apiURL) {
  try {
    const response = await fetch(apiURL);
    if (response.ok) {
      const data = await response.json();
      if ("alerts" in data) {
        weatherAlert(data);
      }
      currentWeather(data);
      createDailyCards(data);
    } else {
      throw Error(await response.text());
    }
  } catch (error) {
    console.log(error);
  }
}

let date = new Date();
let year = date.getFullYear();
document.getElementById("curYr").innerHTML = year;
// select the elements to manipulate (output to)
const datefield = document.querySelector(".date");

// derive the current date using a date object
const now = new Date();
const fulldate = new Intl.DateTimeFormat("en-US", { dateStyle: "full" }).format(
	now
);
