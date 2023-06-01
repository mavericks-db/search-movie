let searchInput = document.querySelector("#searchInput");
let searchBtn = document.querySelector("#searchBtn");
let container = document.querySelector(".container");
let img = document.querySelector(".img");
let info = document.querySelector(".info");
let cards = document.querySelector(".cards");

// Default Movies
const movies = ["Iron Man", "Avengers", "Guardians of the Galaxy", "Thor", "Hulk", "Doctor Strange"];

// Base API URL
let baseApiUrl = "https://www.omdbapi.com/?apikey=52cc332f&t=";

// Search Functionality
function searchFunc() {
  // Clears the previous content
  img.innerHTML = "";
  info.innerHTML = "";

  let apiUrl = baseApiUrl + searchInput.value;

  fetch(apiUrl).then(res => res.json()).then(data => {
    let poster = document.createElement("img");
    poster.src = data.Poster;

    let title = document.createElement("h1");
    title.textContent = data.Title;

    let year = document.createElement("p");
    year.textContent = "Year: " + data.Year;

    let rated = document.createElement("p");
    rated.textContent = "Rated: " + data.Rated;

    let released = document.createElement("p");
    released.textContent = "Released: " + data.Released;

    let runtime = document.createElement("p");
    runtime.textContent = "Runtime: " + data.Runtime;

    let genre = document.createElement("p");
    genre.textContent = "Genre: " + data.Genre;

    let director = document.createElement("p");
    director.textContent = "Director: " + data.Director;

    let writer = document.createElement("p");
    writer.textContent = "writer: " + data.Writer;

    let actors = document.createElement("p");
    actors.textContent = "Actors: " + data.Actors;

    let plot = document.createElement("p");
    plot.textContent = "Plot: " + data.Plot;

    img.appendChild(poster);
    info.append(title, year, rated, released, runtime, genre, director, writer, actors, plot);
    container.append(img, info);
  });

  // Clears the search input
  searchInput.value = "";
}

// When Enter Key is Pressed
function enterKeyFunc(e) {
  if (e.keyCode == 13) {
    searchFunc();
  }
}

// Click Event
searchBtn.addEventListener("click", searchFunc);

// Enter Key Event
window.addEventListener("keypress", (e) => {
  enterKeyFunc(e);
});

function defaultSearch(arr) {
  arr = movies;

  arr.map(movie => {
    console.log(movie);
    fetch(`${baseApiUrl} + ${movie}`).then(res => res.json()).then(data => {
      console.log(data);

      let cardDiv = document.createElement("div");
      cardDiv.classList.add("card");

      let imgEl = document.createElement("img");
      imgEl.classList.add("card-img-top");
      imgEl.src = data.Poster;
      
      let cardBodyDiv = document.createElement("div");
      cardBodyDiv.classList.add("card-body");

      let cardTitle = document.createElement("h5");
      cardTitle.classList.add("card-title");
      cardTitle.textContent = data.Title;

      let cardText = document.createElement("p");
      cardText.classList.add("card-text");
      cardText.textContent = data.Year;

      cardBodyDiv.append(cardTitle, cardText);
      cardDiv.append(imgEl, cardBodyDiv);
      cards.appendChild(cardDiv);
    })
  })
}

// DOMContent is loaded
window.addEventListener("DOMContentLoaded", defaultSearch);
window.addEventListener("load", () => {
  searchInput.focus();
});

