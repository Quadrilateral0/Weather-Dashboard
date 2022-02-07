//OpenWeather API
//var issueContainer = document.getElementById('issues');
//var fetchButton = document.getElementById('fetch-button');

//function getApi() {
  //var requestUrl = "https://api.openweathermap.org/data/2.5/onecall?lat={lat}&lon={lon}&exclude={part}&appid={186df4cc5a59136cead083a7ffe439e3}";

  //fetch(requestUrl)
  //  .then(function (response) {
  //    return response.json();
  //  })
  //  .then(function (data) {
 //     console.log(data);
  //    for (var i = 0; i < data.length; i++) {
  //      var userName = document.createElement('h3');
  //      var issueTitle = document.createElement('p');
  //      userName.textContent = data[i].user.login;
  //      issueTitle.textContent = data[i].title;
  //      issueContainer.append(userName);
  //      issueContainer.append(issueTitle);
   //   }
  //  });
//}
//fetchButton.addEventListener('click', getApi);

////Save search location in local storage and display in sidebar
var searchButton = document.getElementById("search-button");
var text = document.getElementById("search-bar");
var searchDisplay = document.getElementById("search-append");
var searchItem = [];

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

        li.textContent = searchArray;
        li.setAttribute("search-index", i);

        var remove = document.createElement("button");
        remove.textContent = "X";

        li.appendChild(remove);
        searchDisplay.appendChild(li);
        }
};

//Save input to local storage array using search bar submit button
searchButton.addEventListener("click", function(event) {
  event.preventDefault();
  console.log(text);

  if (text === ""){
      return;
  };

  var inputText = text.value.trim();
  searchItem.push(inputText);
  text.value = "";

  saveSearch();
  renderSearch();
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

//Function that runs on page load to maintain previous search history
function init() {
    var displayText = JSON.parse(localStorage.getItem("searchItem"));
    if (displayText !== null) {
    searchItem = displayText;
    }
    renderSearch();
};

init();