//localStorage.removeItem("storedTasks");
console.log("Hi");

function addToMyTasks(task, tasksList) {
  let labelElement = document.createElement("label");
  let todoItemsContainer = document.getElementById("todoItemsContainer");
  //creating list Item
  let listItem = document.createElement("li");
  listItem.id = "list" + task.uniqueNo;
  listItem.classList.add("todo-item-container", "d-flex", "flex-row");
  todoItemsContainer.appendChild(listItem);
  //creating checkbox append to listItem
  let checkboxElement = document.createElement("input");
  checkboxElement.type = "checkbox";
  checkboxElement.id = "id" + task.uniqueNo;
  if (task.isChecked === true) {
    checkboxElement.checked = true;
    labelElement.classList.add("strike");
  } else {
    checkboxElement.checked = false;
    labelElement.classList.add("strike");
    labelElement.classList.remove("strike");
  }
  checkboxElement.onclick = function () {
    labelElement.classList.toggle("strike");

    if (checkboxElement.checked === true) {
      //labelElement.classList.add("strike");
      task.isChecked = true;
    } else {
      // labelElement.classList.remove("strike");
      task.isChecked = false;
    }

    let index = tasksList.indexOf(task);
    tasksList[index] = task;
    console.log(tasksList);
    //localStorage.setItem("storedTasks",JSON.stringify(tasksList));
    localStorage.setItem("storedTasks", JSON.stringify(tasksList));
  };
  checkboxElement.classList.add("checkbox-input");
  listItem.appendChild(checkboxElement);
  //creating div append to listItem
  let divElement = document.createElement("div");
  divElement.classList.add("label-container", "d-flex", "flex-row");
  listItem.appendChild(divElement);
  //creating label append to divElement

  labelElement.setAttribute("for", checkboxElement.id);
  labelElement.classList.add("checkbox-label");
  labelElement.textContent = task.name;
  divElement.appendChild(labelElement);
  //creating deleteContainer append to divElement
  let deleteContainer = document.createElement("div");
  deleteContainer.classList.add("delete-icon-container");
  divElement.appendChild(deleteContainer);
  // creating delete icon append to deleteContainer
  let deleteIcon = document.createElement("i");
  deleteIcon.classList.add("delete-icon", "fas", "fa-trash-alt");
  deleteIcon.onclick = function () {
    todoItemsContainer.removeChild(listItem);
    let index = tasksList.indexOf(task);
    tasksList.splice(index, 1);
    localStorage.setItem("storedTasks", JSON.stringify(tasksList));
  };
  deleteContainer.appendChild(deleteIcon);
}

let tasksList = [];
let count;
if (localStorage.getItem("storedTasks") === null) {
  tasksList = [];
  count = 0;
} else {
  tasksList = JSON.parse(localStorage.getItem("storedTasks"));
  count = tasksList.length;
}
//console.log(tasksList);
for (let task of tasksList) {
  addToMyTasks(task, tasksList);
}
addBtn = document.getElementById("addBtn");
document.getElementById("todoUserInput").placeholder =
  "What needs to be done??";
addBtn.onclick = function () {
  let taskCreated = document.getElementById("todoUserInput").value;
  if (taskCreated === "") {
    alert("Enter a Valid Input");
    return;
  }
  count++;
  let temp = {};
  temp.name = taskCreated;
  temp.uniqueNo = count;
  temp.isChecked = false;
  tasksList.push(temp);
  //console.log(tasksList);
  //console.log(JSON.stringify(tasksList));
  localStorage.setItem("storedTasks", JSON.stringify(tasksList));
  addToMyTasks(temp, tasksList);
  document.getElementById("todoUserInput").value = "";
};

console.log(document.getElementById("todoItemsContainer"));
