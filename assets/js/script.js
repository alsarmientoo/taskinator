var formEL = document.querySelector("#task-form");
// console.log(buttonEL);
var tasksToDoEl = document.querySelector("#tasks-to-do");


var createTaskHandler =function(event) {   
    // console.log(event);

    event.preventDefault();

    var listItemEl = document.createElement("li");
    listItemEl.className = "task-item";
    listItemEl.textContent = "This is a new task.";
    tasksToDoEl.appendChild(listItemEl);
};

// on a button click, create a task
formEL.addEventListener("submit", createTaskHandler);