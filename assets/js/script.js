var formEL = document.querySelector("#task-form");
// console.log(buttonEL);
var tasksToDoEl = document.querySelector("#tasks-to-do");


var taskFormHandler =function(event) {   
    // console.log(event);

    event.preventDefault();

    var taskNameInput = document.querySelector("input[name='task-name']").value;
    var taskTypeInput = document.querySelector("select[name='task-type']").value;
    // console.log(taskTypeInput);
    // console.dir(taskNameInput);

    // package up data as an object
    var taskDataObj = {
        name: taskNameInput,
        type: taskTypeInput
    };

    // send it as an argument to createtaskel
    createTaskEl(taskDataObj);
};

var createTaskEl = function(taskDataObj) {
      // craeat list item
    var listItemEl = document.createElement("li");
    listItemEl.className = "task-item";
  
      // create div to hold task info and add to list item
    var taskInfoEl = document.createElement("div");
      // give it a class name
    taskInfoEl.className = "task-info";
      // add html content to div
    taskInfoEl.innerHTML = "<h3 class='task-name'>" + taskDataObj.name + "</h3><span class='task-type'>" + taskDataObj.type + "</span>";
    listItemEl.appendChild(taskInfoEl);
  
      // to get task name we stored in tasknameinput
      // listItemEl.textContent = taskNameInput;
  
      // add entire list item to list
    tasksToDoEl.appendChild(listItemEl);
      // console.dir(listItemEl);
}

// on a button click, create a task
formEL.addEventListener("submit", taskFormHandler);