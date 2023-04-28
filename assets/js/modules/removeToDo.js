export function removeToDo(element) {
    element.parentNode.parentNode.removeChild(element.parentNode);
    LIST[element.id].trash = true;


    localStorage.setItem("TODO", JSON.stringify(LIST));
  }
  