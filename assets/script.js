//OpenWeather API
var APIKey = "186df4cc5a59136cead083a7ffe439e3";
//var limit = "5";
var text = document.getElementById("search-bar");
var searchButton = document.getElementById("search-button");
var searchDisplay = document.getElementById("search-append");
var searchItem = [];

function getApi() {
    //var queryURL = "https://api.openweathermap.org/geo/1.0/direct?q=" + text.value + "&limit=" + limit + "&appid=" + APIKey;
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?appid=" + APIKey + "&q=" + text.value;
    fetch(queryURL)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      console.log(data.name);
      for (var i = 0; i < data.length; i++) {
        var searchLocation = document.createElement("h3");
        var dataDisplay = document.getElementById("data-display");
        //var searchData = document.createElement("p");
        searchLocation.textContent = data[i].name;
        //searchData.textContent = data[i].wind.speed;
        dataDisplay.append(searchLocation);
        //searchDisplay.append(searchData);
      }
    });
}

//Store search queries in the searchItem array in local storage
function saveSearch() {
  localStorage.setItem("searchItem", JSON.stringify(searchItem)); 
};

//Append search query to page
function renderSearch() {
    searchDisplay.innerHTML = "";
    for (var i = 0; i < searchItem.length; i++) {
        var searchArray = searchItem[i] + "  ";
        var li = document.createElement("li");
        var remove = document.createElement("button");

        li.textContent = searchArray;
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
searchButton.addEventListener("click", function(event) {
  event.preventDefault();

  if (text === ""){
      return;
  };

  var inputText = text.value.trim();
  searchItem.push(inputText);
  //text.value = "";

  saveSearch();
  renderSearch();
  getApi();
});

// Add click remove event to saved search history
searchDisplay.addEventListener("click", function(event) {
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