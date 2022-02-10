//OpenWeather API
var APIKey = "186df4cc5a59136cead083a7ffe439e3";
var text = document.getElementById("search-bar");
var searchButton = document.getElementById("search-button");
var searchDisplay = document.getElementById("search-append");
var dataDisplay = document.querySelector("#data-display");
var forecastDisplay = document.querySelector("#forecast-display");
var searchLocation = document.createElement("h3");
var windLocation = document.createElement("p");
var tempLocation = document.createElement("p");
var humLocation = document.createElement("p");
var feelsLocation = document.createElement("p");
var lat = "";
var lon = "";
var searchItem = [];

//Renders today's weather data according to search query
function getApi() {
  var queryURL = "https://api.openweathermap.org/data/2.5/weather?appid=" + APIKey + "&q=" + text.value + "&units=imperial";
  fetch(queryURL)
    .then(function (response) {
      if (200 !== response.status) {
        dataDisplay.append(
          "There was a problem with your query. Status Code: " + response.status
        );
        return;
      }
      return response.json();
    })

    .then(function (data) {
      console.log(data);
      searchLocation.textContent = data.name;
      tempLocation.textContent = "Current temperature: " + data.main.temp + "°F";
      windLocation.textContent = "Current wind speed: " + data.wind.speed + " miles per hour";
      humLocation.textContent = "Current humidity: " + data.main.humidity + "%";
      feelsLocation.textContent = "Current temperature feels like: " + data.main.feels_like + "°F";

      lat = data.coord.lat;
        saveLat();
      lon = data.coord.lon;
        saveLon();

      dataDisplay.append(searchLocation);
      dataDisplay.append(tempLocation);
      dataDisplay.append(feelsLocation);
      dataDisplay.append(windLocation);
      dataDisplay.append(humLocation);
    })
};

function getForecastApi() {
  var queryURL2 = "https://api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" + lon + "&units=imperial&appid=" + APIKey;
  //var outcome = {};
  fetch(queryURL2)
    .then(function (response) {
      if (200 !== response.status) {
        forecastDisplay.append(
          "There was a problem with your query. Status Code: " + response.status
        );
        return;
      }
      return response.json();
    })

    //.then(function (data) {
    //  console.log(data);
    //  outcome.forecastResults = [];
    //  for (i = 0; i < 5; i++) {
    //    var forecast = {};
    //    forecast.date = data[i].dt_txt;
    //    forecast.minTemp = data[i].main.temp_min;
    //    forecast.maxTemp = data[i].main.temp_max;
    //    forecast.img = data[i].weather[0].icon;
    //    forecast.desc = data[i].weather[0].description;
    //    outcome.forecastResults.push(forecast);
    //  }
    //  console.log(outcome.forecastResults);
    //});
};

//Store search queries in the searchItem array in local storage
function saveSearch() {
  localStorage.setItem("searchItem", JSON.stringify(searchItem));
};

//Store latitude & longitude in local storage
function saveLat() {
  localStorage.setItem("lat", JSON.stringify(lat));
};
function saveLon() {
  localStorage.setItem("lon", JSON.stringify(lon));
};

//Append search query to page
function renderSearch() {
  searchDisplay.innerHTML = "";
  for (var i = 0; i < searchItem.length; i++) {
    var searchArray = searchItem[i] + "  ";
    var li = document.createElement("li");
    var remove = document.createElement("button");

    remove.textContent = searchArray;
    li.setAttribute("search-index", i);
    searchDisplay.appendChild(remove);
  }
};

//Dynamic update of current date and time
function currentDay() {
  document.getElementById("currentDay").innerHTML = moment().format("dddd, MMMM Do, YYYY");
}
setInterval(currentDay, 1000);

//Save input to local storage array, render search to page, and trigger API call using search bar submit button
searchButton.addEventListener("click", function (event) {
  event.preventDefault();

  if (text === "") {
    return;
  };

  var inputText = text.value.trim();
  searchItem.push(inputText);

  saveSearch();
  renderSearch();
  getApi();
  getForecastApi();

  text.value = "";
});

// Add click remove event to saved search history
searchDisplay.addEventListener("click", function (event) {
  var element = event.target;

  if (element.matches("button") === true) {
    var index = element.parentElement.getAttribute("search-index");
    searchItem.splice(index, 1);

    saveSearch();
    renderSearch();
  }
});

//Creates a reset button to refresh the data and start over
var resetButton = document.getElementById("reset-button");
function rButton() {
  rButton = location.reload();
}
resetButton.addEventListener("click", rButton, false);

//Function that runs on page load to maintain previous search history
function init() {
  var displayText = JSON.parse(localStorage.getItem("searchItem"));
  if (displayText !== null) {
    searchItem = displayText;
  }
  renderSearch();
};

init();