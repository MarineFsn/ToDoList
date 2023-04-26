//selectionner les éléments dans HTML

//fonction de la To-Do list
const refresh = document.querySelector(".refresh");
//add date
const dateElement = document.getElementById("date");
//placer les items
const list = document.getElementById("list");
//récupérer les informations que l'utilisateur écrit dans la zone de texte
const input = document.getElementById("input");

//noms de classes
const CHECK = "circle.svg";
const UNCHECK = "completed-circle.svg";
const LINE_THROUGH = "lineThrough";

//variables
let LIST, id;

//garder les items dans le local storage

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

//effacer le local storage avec le bouton refresh
refresh.addEventListener("click", function () {
  localStorage.clear();
  location.reload();
});

const header = document.querySelector("header");
//insérer une date
function showingDate() {
  const today = new Date();
  const options = { weekday: "long", month: "long", day: "numeric" };

  //insérer la date en innerHTML
  dateElement.innerHTML = today.toLocaleDateString("fr-FR", options);
}
//Mise à jour initiale de la date
showingDate();

//Mise à jour de la date toutes les secondes
setInterval(showingDate, 1000);

// add a to-do

function addToDo(toDo, id, done, trash) {
  if (trash) {
    return;
  }

  const DONE = done ? CHECK : UNCHECK;
  const LINE = done ? LINE_THROUGH : "";

  const item = ` <li class="item">
                       <img class="completed-circle  ${DONE}  " src="assets/icons/circle.svg"id="${id}"
                       job="complete">
                       <p class="textItem ${LINE} ">${toDo}</p>
                       <img class="trash-icon" src="./assets/icons/trash.svg" id=${id} job="delete">
                  </li>
                `;

  const position = "beforeend";

  list.insertAdjacentHTML(position, item);
}

// Ajoute un élément à la liste avec la touche "Entrée"
document.addEventListener("keyup", function (event) {
  if (event.key === "Enter") {
    const toDo = input.value;

    //si l'input n'est pas vide
    if (toDo) {
      addToDo(toDo, id, false, false);

      LIST.push({
        name: toDo,
        id: id,
        done: false,
        trash: false,
      });

      //ajouter les items dans le local storage
      localStorage.setItem("TODO", JSON.stringify(LIST));

      id++;
    }

    input.value = "";
  }
});

const addBtn = document.querySelector(".plus-circle");
addBtn.addEventListener("click", function () {
  const toDo = input.value;

  //si l'input n'est pas vide
  if (toDo) {
    addToDo(toDo, id, false, false);

    LIST.push({
      name: toDo,
      id: id,
      done: false,
      trash: false,
    });

    //ajouter les items dans le local storage
    localStorage.setItem("TODO", JSON.stringify(LIST));

    id++;

    input.value = "";
  }
});

//complete to-do

function completeToDo(element) {
  element.classList.toggle(CHECK);
  element.classList.toggle(UNCHECK);
  element.parentNode.querySelector(".textItem").classList.toggle(LINE_THROUGH);

  LIST[element.id].done = LIST[element.id].done ? false : true;

  const circle = element.parentNode.querySelector(".completed-circle");
  if (LIST[element.id].done) {
    circle.src = "assets/icons/checkedcircle.svg";
  } else {
    circle.src = "assets/icons/circle.svg";
  }
}

//remove to-do

function removeToDo(element) {
  element.parentNode.parentNode.removeChild(element.parentNode);

  LIST[element.id].trash = true;
}

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
