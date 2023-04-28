import { CHECK, UNCHECK, LINE_THROUGH } from "./script.js";

export function addToDo(toDo, id, done, trash) {
  if (trash) {
    return;
  }

  const DONE = done ? CHECK : UNCHECK;
  const LINE = done ? LINE_THROUGH : "";

  const item = `
    <li class="item">
      <img class="completed-circle ${DONE}" src="assets/icons/circle.svg" id="${id}" job="complete">
      <p class="textItem ${LINE}">${toDo}</p>
      <img class="trash-icon" src="./assets/icons/trash.svg" id=${id} job="delete">
    </li>
  `;

  const position = "beforeend";

  list.insertAdjacentHTML(position, item);
}
