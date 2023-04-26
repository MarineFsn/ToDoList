
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
const CHECK = "refresh-icon";
const UNCHECK = "completed-circle";
const LINE_THROUGH = "lineThrough";


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

function addToDo(toDo,id,done,trash) {
    const toDo = input.value.trim();

    if (!toDo) {
        return;
    }

    const item = `
        <li class="item">
            <img class="completed-circle" src="assets/icons/checkedcircle.svg"id="${id}">
            <p class="textItem">${toDo}</p>
            <img class="trash-icon" src="./assets/icons/trash.svg" id=${id}>
        </li>
    `;

    const position = "beforeend";

    list.insertAdjacentHTML(position, item);
}

// Ajoute un élément à la liste avec la touche "Entrée"
document.addEventListener("keyup", function(event) {
    if (event.keyCode === 13) {
        addToDo();
    }
});