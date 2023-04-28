import {CHECK,UNCHECK, LINE_THROUGH} from "./script.js";
import {LIST} from "./script.js";

export function completeToDo(element) {
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
    //ajouter les items dans le local storage
    localStorage.setItem("TODO", JSON.stringify(LIST));
  }