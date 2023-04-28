import { addToDo } from "./addToDo.js";
import { completeToDo } from "./completeToDo.js";
import { removeToDo } from "./removeToDo.js";
//Selector
const refresh = document.querySelector(".refresh");
const dateElement = document.getElementById("date");
const list = document.getElementById("list");
const input = document.getElementById("input");
//Class names
export const CHECK = "circle.svg";
export const UNCHECK = "completed-circle.svg";
export const LINE_THROUGH = "lineThrough";
//variables
export let LIST, id;

//add the date in the Header
function showingDate() {
  const header = document.querySelector("header");
  const today = new Date();
  const options = { weekday: "long", month: "long", day: "numeric" };
  //insert in the DOM
  dateElement.innerHTML = today.toLocaleDateString("fr-FR", options);
}
//Update in real time
showingDate();
//update every second
setInterval(showingDate, 1000);

//Keep the items in Local Storage
let data = localStorage.getItem("TODO");
if (data) {
  LIST = JSON.parse(data);
  id = LIST.length;
  loadlist(LIST);
} else {
  LIST = [];
  id = 0;
}
function loadlist(array) {
  array.forEach(function (item) {
    addToDo(item.name, item.id, item.done, item.trash);
  });
}
//clear the local storage with refresh btn
refresh.addEventListener("click", function () {
  localStorage.clear();
  location.reload();
});

//addEventListener AddToDo
// add an item in the list using "enter"key
document.addEventListener("keyup", function (event) {
  if (event.key === "Enter") {
    const toDo = input.value;
    //If the input isn't empty
    if (toDo) {
      addToDo(toDo, id, false, false);
      LIST.push({
        name: toDo,
        id: id,
        done: false,
        trash: false,
      });
      //Add the items in the local storage
      localStorage.setItem("TODO", JSON.stringify(LIST));
      id++;
    }
    input.value = "";
  }
});
// add the items using the click on "+"
export const addBtn = document.querySelector(".plus-circle");
addBtn.addEventListener("click", function () {
  const toDo = input.value;
  //if the input isn't empty
  if (toDo) {
    addToDo(toDo, id, false, false);

    LIST.push({
      name: toDo,
      id: id,
      done: false,
      trash: false,
    });
    //Add the items in the local storage
    localStorage.setItem("TODO", JSON.stringify(LIST));
    id++;
    input.value = "";
  }
});
// cibler les éléments crée
list.addEventListener("click", function (event) {
  const element = event.target;
  //retour de l'element cliqué dans la list
  const elementJob = element.attributes.job.value;
  if (elementJob == "complete") {
    completeToDo(element);
  } else if (elementJob == "delete") {
    removeToDo(element);
  }
  //ajouter les items dans le local storage
  localStorage.setItem("TODO", JSON.stringify(LIST));
});
