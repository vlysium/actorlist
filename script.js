const data = "actors.json"; //json file
const filterButtons = document.querySelectorAll(".filter-btn"); //filter buttons
const list = document.getElementById("list"); //parent element to actors
const template = document.querySelector("template").content; //template element
const modal = document.querySelector("dialog"); //pop-up

let actorlist; //array of actors
let movieFilter = "All"; //movie filter

//fetch data from the actors.json file
async function fetchData() {
  const response = await fetch(data);
  actorlist = await response.json();
  display(actorlist);
  console.log(actorlist);
}

//makes the buttons clickable when the document has finished loading
document.addEventListener("DOMContentLoaded", () => {
  filterButtons.forEach((btn) => {
    btn.addEventListener("click", filterMovies);
  });
  fetchData(data);
});

//buttons to filter movies
function filterMovies() {
  movieFilter = this.dataset.movie;
  document.querySelector(".selected").classList.remove("selected");
  this.classList.add("selected");
  display(actorlist);
}

//clears the list when called to filter movies
function display(actorlist) {
  list.textContent = "";

  //filter actors by movies
  actorlist.forEach((actor) => {
    if (movieFilter == actor.movie || movieFilter == "All") {
      const clone = template.cloneNode(true);
      clone.querySelector(".full-name").textContent = `Name: ${actor.fullname}`;
      clone.querySelector(".movie").textContent = `Movie: ${actor.movie}`;
      clone.querySelector(".actor").addEventListener("click", () => modalView(actor));

      //color the actor based on the movie they appear in
      switch (actor.movie) {
        case "Fight Club":
          clone.querySelector(".actor").classList.add("fight-club");
          break;
        case "Goodfellas":
          clone.querySelector(".actor").classList.add("goodfellas");
          break;
        case "Inception":
          clone.querySelector(".actor").classList.add("inception");
          break;
        case "Pulp Fiction":
          clone.querySelector(".actor").classList.add("pulp-fiction");
          break;
      }

      list.appendChild(clone);
    }
  });
}

//shows a pop-up box when the function is called
//see https://developer.mozilla.org/en-US/docs/Web/API/HTMLDialogElement for <dialog> methods
function modalView(actor) {
  modal.querySelector(".modal-full-name").textContent = `Name: ${actor.fullname}`;
  modal.querySelector(".modal-movie").textContent = `Movie: ${actor.movie}`;
  modal.showModal(); //displays the pop-up
  document.addEventListener("click", function (event) {
    if (event.target == modal) modal.close(); //closes the pop-up when clicked outside the pop-up
  });
}
