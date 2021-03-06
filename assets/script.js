//OpenWeather API
var APIKey = "186df4cc5a59136cead083a7ffe439e3";
var text = document.getElementById("search-bar");
var searchButton = document.getElementById("search-button");
var searchDisplay = document.getElementById("search-append");
var dataDisplay = document.querySelector("#data-display");
var error = document.querySelector("#error");

var forecastDisplay1 = document.querySelector("#forecast-display1");
var forecastDisplay1Date = document.querySelector("#forecast-display1-date");
var forecastDate1 = document.createElement("p");
var forecastMin1 = document.createElement("p");
var forecastMax1 = document.createElement("p");
var forecastAbout1 = document.createElement("p");
var forecastIcon1 = document.createElement("pre");
var forecastHum1 = document.createElement("p");

var forecastDisplay2 = document.querySelector("#forecast-display2");
var forecastDisplay2Date = document.querySelector("#forecast-display2-date");
var forecastDate2 = document.createElement("p");
var forecastMin2 = document.createElement("p");
var forecastMax2 = document.createElement("p");
var forecastAbout2 = document.createElement("p");
var forecastIcon2 = document.createElement("pre");
var forecastHum2 = document.createElement("p");

var forecastDisplay3 = document.querySelector("#forecast-display3");
var forecastDisplay3Date = document.querySelector("#forecast-display3-date");
var forecastDate3 = document.createElement("p");
var forecastMin3 = document.createElement("p");
var forecastMax3 = document.createElement("p");
var forecastAbout3 = document.createElement("p");
var forecastIcon3 = document.createElement("pre");
var forecastHum3 = document.createElement("p");

var forecastDisplay4 = document.querySelector("#forecast-display4");
var forecastDisplay4Date = document.querySelector("#forecast-display4-date");
var forecastDate4 = document.createElement("p");
var forecastMin4 = document.createElement("p");
var forecastMax4 = document.createElement("p");
var forecastAbout4 = document.createElement("p");
var forecastIcon4 = document.createElement("pre");
var forecastHum4 = document.createElement("p");

var forecastDisplay5 = document.querySelector("#forecast-display5");
var forecastDisplay5Date = document.querySelector("#forecast-display5-date");
var forecastDate5 = document.createElement("p");
var forecastMin5 = document.createElement("p");
var forecastMax5 = document.createElement("p");
var forecastAbout5 = document.createElement("p");
var forecastIcon5 = document.createElement("pre");
var forecastHum5 = document.createElement("p");

var searchLocation = document.createElement("h3");
var windLocation = document.createElement("p");
var tempLocation = document.createElement("p");
var humLocation = document.createElement("p");
var feelsLocation = document.createElement("p");
var iconLocation = document.createElement("p");
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
      tempLocation.textContent = "Current temperature: " + data.main.temp + "??F";
      windLocation.textContent = "Current wind speed: " + data.wind.speed + " miles per hour";
      humLocation.textContent = "Current humidity: " + data.main.humidity + "%";
      feelsLocation.textContent = "Current temperature feels like: " + data.main.feels_like + "??F";
      iconLocation.innerHTML = "<img src=http://openweathermap.org/img/w/" + data.weather[0].icon + ".png width='150'>";

      dataDisplay.append(searchLocation);
      dataDisplay.append(tempLocation);
      dataDisplay.append(feelsLocation);
      dataDisplay.append(windLocation);
      dataDisplay.append(humLocation);
      dataDisplay.append(iconLocation);

      var lat = data.coord.lat;
      var lon = data.coord.lon;

      getForecastApi(data.coord.lat, data.coord.lon);
    })
};

//Render's five day forecast according to search query
function getForecastApi(lat, lon) {
  var queryURL2 = "https://api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" + lon + "&units=imperial&appid=" + APIKey;
  var outcome = {};
  fetch(queryURL2)
    .then(function (response) {
      if (200 !== response.status) {
        error.append(
          "There was a problem with your query. Status Code: " + response.status
        );
        return;
      }
      return response.json();
    })

    .then(function (data) {
      console.log(data);
      outcome.forecastResults = [];
      for (i = 0; i < 5; i++) {
        var forecast = {};
        forecast.icon = data.list[i].weather[0].icon;
        forecast.date = data.list[i].dt_txt;
        forecast.min = data.list[i].main.temp_min;
        forecast.max = data.list[i].main.temp_max;
        forecast.hum = data.list[i].main.humidity;
        forecast.about = data.list[i].weather[0].description;
        outcome.forecastResults.push(forecast);
      }
      //http://openweathermap.org/img/w/10d.png
      
      forecastIcon1.innerHTML = "<img src=http://openweathermap.org/img/w/" + data.list[i].weather[0].icon + ".png width='90'>";
      forecastDisplay1.append(forecastIcon1);
      forecastDate1.textContent = data.list[0].dt_txt;
      forecastDisplay1Date.append(forecastDate1);
      forecastMin1.textContent = "Min temp: " + data.list[0].main.temp_min + "??F";
      forecastDisplay1.append(forecastMin1);
      forecastMax1.textContent = "Max temp: " + data.list[0].main.temp_max + "??F";
      forecastDisplay1.append(forecastMax1);
      forecastHum1.textContent = data.list[i].main.humidity + "% humidity";
      forecastDisplay1.append(forecastHum1);
      forecastAbout1.textContent = data.list[i].weather[0].description;
      forecastDisplay1.append(forecastAbout1);

      forecastIcon2.innerHTML = "<img src=http://openweathermap.org/img/w/" + data.list[i].weather[0].icon + ".png width='90'>";
      forecastDisplay2.append(forecastIcon2);
      forecastDate2.textContent = data.list[1].dt_txt;
      forecastDisplay2Date.append(forecastDate2);
      forecastMin2.textContent = "Min temp: " + data.list[0].main.temp_min + "??F";
      forecastDisplay2.append(forecastMin2);
      forecastMax2.textContent = "Max temp: " + data.list[0].main.temp_max + "??F";
      forecastDisplay2.append(forecastMax2);
      forecastHum2.textContent = data.list[i].main.humidity + "% humidity";
      forecastDisplay2.append(forecastHum2);
      forecastAbout2.textContent = data.list[i].weather[0].description;
      forecastDisplay2.append(forecastAbout2);

      forecastIcon3.innerHTML = "<img src=http://openweathermap.org/img/w/" + data.list[i].weather[0].icon + ".png width='90'>";
      forecastDisplay3.append(forecastIcon3);
      forecastDate3.textContent = data.list[2].dt_txt;
      forecastDisplay3Date.append(forecastDate3);
      forecastMin3.textContent = "Min temp: " + data.list[0].main.temp_min + "??F";
      forecastDisplay3.append(forecastMin3);
      forecastMax3.textContent = "Max temp: " + data.list[0].main.temp_max + "??F";
      forecastDisplay3.append(forecastMax3);
      forecastHum3.textContent = data.list[i].main.humidity + "% humidity";
      forecastDisplay3.append(forecastHum3);
      forecastAbout3.textContent = data.list[i].weather[0].description;
      forecastDisplay3.append(forecastAbout3);

      forecastIcon4.innerHTML = "<img src=http://openweathermap.org/img/w/" + data.list[i].weather[0].icon + ".png width='90'>";
      forecastDisplay4.append(forecastIcon4);
      forecastDate4.textContent = data.list[3].dt_txt;
      forecastDisplay4Date.append(forecastDate4);
      forecastMin4.textContent = "Min temp: " + data.list[0].main.temp_min + "??F";
      forecastDisplay4.append(forecastMin4);
      forecastMax4.textContent = "Max temp: " + data.list[0].main.temp_max + "??F";
      forecastDisplay4.append(forecastMax4);
      forecastHum4.textContent = data.list[i].main.humidity + "% humidity";
      forecastDisplay4.append(forecastHum4);
      forecastAbout4.textContent = data.list[i].weather[0].description;
      forecastDisplay4.append(forecastAbout4);

      forecastIcon5.innerHTML = "<img src=http://openweathermap.org/img/w/" + data.list[i].weather[0].icon + ".png width='90'>";
      forecastDisplay5.append(forecastIcon5);
      forecastDate5.textContent = data.list[4].dt_txt;
      forecastDisplay5Date.append(forecastDate5);
      forecastMin5.textContent = "Min temp: " + data.list[0].main.temp_min + "??F";
      forecastDisplay5.append(forecastMin5);
      forecastMax5.textContent = "Max temp: " + data.list[0].main.temp_max + "??F";
      forecastDisplay5.append(forecastMax5);
      forecastHum5.textContent = data.list[i].main.humidity + "% humidity";
      forecastDisplay5.append(forecastHum5);
      forecastAbout5.textContent = data.list[i].weather[0].description;
      forecastDisplay5.append(forecastAbout5);
    });
};

//Store search queries in the searchItem array in local storage
function saveSearch() {
  localStorage.setItem("searchItem", JSON.stringify(searchItem));
};

//Append search query to page
function renderSearch() {
  searchDisplay.innerHTML = "";
  for (var i = 0; i < searchItem.length; i++) {
    var searchArray = searchItem[i];
    var li = document.createElement("li");
    var addButton = document.createElement("button");

    addButton.textContent = searchArray;
    li.setAttribute("search-index", i);
    searchDisplay.appendChild(addButton);
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

  text.value = "";
});

// Add click event to saved search history
searchDisplay.addEventListener("click", function (event) {
  var element = event.target;

  if (element.matches("button") === true) {
    var buttonText = element.textContent;
    text.value = buttonText;

    saveSearch();
    renderSearch();
    getApi();
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