var buttonEL = document.querySelector("#save-task");
// console.log(buttonEL);
var tasksToDoEl = document.querySelector("#tasks-to-do");


var createTaskHandler =function() {   
    var listItemEl = document.createElement("li");
    listItemEl.className = "task-item";
    listItemEl.textContent = "This is a new task.";
    tasksToDoEl.appendChild(listItemEl);
};

// on a button click, create a task
buttonEL.addEventListener("click", createTaskHandler);