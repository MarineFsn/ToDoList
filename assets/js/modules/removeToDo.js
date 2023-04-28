export function removeToDo(element) {
    element.parentNode.parentNode.removeChild(element.parentNode);
    LIST[element.id].trash = true;

     //ajouter les items dans le local storage
     localStorage.setItem("TODO", JSON.stringify(LIST));
  }
