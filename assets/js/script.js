var tasks = [];

var taskIdCounter = 0;

var formEl = document.querySelector("#task-form");
// console.log(buttonEL);
var tasksToDoEl = document.querySelector("#tasks-to-do");
var pageContentEl = document.querySelector("#page-content");
var tasksInProgress = document.querySelector("#tasks-in-progress");
var tasksCompletedEl = document.querySelector("#tasks-completed");


var taskFormHandler =function(event) {   
    // console.log(event);

    event.preventDefault();

    var taskNameInput = document.querySelector("input[name='task-name']").value;
    var taskTypeInput = document.querySelector("select[name='task-type']").value;
    // console.log(taskTypeInput);
    // console.dir(taskNameInput);

    // check if input values are empty string
    if (!taskNameInput || !taskTypeInput) {
        alert("You need to fill out the task form!");
        return false;
    }

    formEl.reset();

    var isEdit = formEl.hasAttribute("data-task-id");
    // console.log(isEdit);

    // has data attribute, so get task id and  call function to complete edit process
    if (isEdit) {
        var taskId = formEl.getAttribute("data-task-id");
        completeEditTask(taskNameInput, taskTypeInput, taskId);
    } else {
        var taskDataObj = {
          name: taskNameInput,
          type: taskTypeInput,
          status: "to do"
        };
    
        createTaskEl(taskDataObj);
    }
      
    // send it as an argument to createtaskel
    // createTaskEl(taskDataObj);
};

var createTaskEl = function(taskDataObj) {
    // console.log(taskDataObj);
    // console.log(taskDataObj.status);
      // craeat list item
    var listItemEl = document.createElement("li");
    listItemEl.className = "task-item";

    // add task id as a custom attribute
    // if the attribute is data-task-id - new task!!!
    listItemEl.setAttribute("data-task-id", taskIdCounter);
  
      // create div to hold task info and add to list item
    var taskInfoEl = document.createElement("div");
      // give it a class name
    taskInfoEl.className = "task-info";
      // add html content to div
    taskInfoEl.innerHTML = "<h3 class='task-name'>" + taskDataObj.name + "</h3><span class='task-type'>" + taskDataObj.type + "</span>";
  
      // to get task name we stored in tasknameinput
      // listItemEl.textContent = taskNameInput;
    
    var taskActionsEl = createTaskActions(taskIdCounter);

    listItemEl.appendChild(taskInfoEl);

    // console.log(taskActionsEl);
    listItemEl.appendChild(taskActionsEl);
   
      // add entire list item to list
    tasksToDoEl.appendChild(listItemEl);
      // console.dir(listItemEl);

    taskDataObj.id = taskIdCounter;
    tasks.push(taskDataObj);

    saveTasks();

    //  increase task counter for next unique id
    taskIdCounter++; 
};

var createTaskActions = function(taskId) {
    // 
    var actionContainerEl = document.createElement("div");
    actionContainerEl.className = "task-actions";

    // create edit button
    var editButtonEl = document.createElement("button");
    editButtonEl.textContent = "Edit";
    editButtonEl.className = "btn edit-btn";
    editButtonEl.setAttribute("data-task-id", taskId);

    actionContainerEl.appendChild(editButtonEl);

    // create delete button
    var deleteButtonEl = document.createElement("button");
    deleteButtonEl.textContent = "Delete";
    deleteButtonEl.className = "btn delete-btn";
    deleteButtonEl.setAttribute("data-task-id", taskId);

    actionContainerEl.appendChild(deleteButtonEl);

    var statusSelectEl = document.createElement("select");
    statusSelectEl.className = "select-status";
    statusSelectEl.setAttribute("name", "status-change");
    statusSelectEl.setAttribute("data-task-id", taskId);

    actionContainerEl.appendChild(statusSelectEl);

    var statusChoices = ["To Do", "In Progress", "Completed"];

    for(var i=0; i < statusChoices.length; i ++) {
        // create option element
        var statusOptionEl = document.createElement("option");
        statusOptionEl.textContent = statusChoices[i];
        statusOptionEl.setAttribute("value", statusChoices[i]);

        // append to select
        statusSelectEl.appendChild(statusOptionEl);
    }

    return actionContainerEl;
};

var completeEditTask = function(taskName, taskType, taskId) {
    // console.log(taskName, taskType, taskId);
    // find the matching task list item
    var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");

    // set new values
    taskSelected.querySelector("h3.task-name").textContent = taskName;
    taskSelected.querySelector("span.task-type").textContent = taskType;

    // loop through tasks array and task object with new content
    for (var i = 0; i < tasks.length; i++) {
        if (tasks[i].id === parseInt(taskId)) {
            tasks[i].name = taskName;
            tasks[i].type = taskType;
        }
    };

    saveTasks();

    alert("Task Updated!");

    formEl.removeAttribute("data-task-id");
    document.querySelector("#save-task").textContent = "Add Task";
};

var taskButtonHandler = function(event) {
    // console.log(event.target);
    var targetEl = event.target;

    // if edit button was clicked
    if (targetEl.matches(".edit-btn")) {
        var taskId = targetEl.getAttribute("data-task-id");
        editTask(taskId);
    }
    // delete button was clicked
    else if (targetEl.matches(".delete-btn")) {
        // console.log("you clicked a delete button!");
        // get the element's task id
        var taskId = targetEl.getAttribute("data-task-id");
        deleteTask(taskId);
    }
};

var taskStatusChangeHandler = function(event) {
    // console.log(event.target);
    // console.log(event.target.getAttribute("data-task-id"));

    // get the task item's id 
    var taskId = event.target.getAttribute("data-task-id");

    // get the currently selected option's value and convert to lower case
    var statusValue = event.target.value.toLowerCase();

    // find the parent task item element based on the id
    var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");


    if (statusValue === "to do") {
        tasksToDoEl.appendChild(taskSelected);
    }
    else if (statusValue === "in progress") {
        tasksInProgress.appendChild(taskSelected);
    }
    else if (statusValue === "completed") {
        tasksCompletedEl.appendChild(taskSelected);
    }

    // update tasks in tasks array
    for (var i=0; i < tasks.length; i++) {
        if (tasks[i].id === parseInt(taskId)) {
            tasks[i].status = statusValue;
        }
        // console.log(tasks);
    };
    saveTasks();
};

var deleteTask = function(taskId) {
    var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");
    taskSelected.remove();

    var updatedTaskArr = [];

    // loop through current tasks
    for (var i = 0; i < tasks.length; i++) {
        // if tasks[i].id doesn't match the value of taskId, let's keep that task and push it into the new array
        if (tasks[i].id !==parseInt(taskId)) {
            updatedTaskArr.push(tasks[i]);
        }
    }

    // reassign tasks array to be the same as updatedtaskArray
    tasks = updatedTaskArr;
    saveTasks();
};

var editTask = function(taskId) {
    console.log("editing task #" + taskId);

    // get task list item element
    var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");

    // get content from task name and type
    var taskName = taskSelected.querySelector("h3.task-name").textContent;
    // console.log(taskName);
    document.querySelector("input[name='task-name']").value = taskName;

    var taskType = taskSelected.querySelector("span.task-type").textContent;
    // console.log(taskType);
    document.querySelector("select[name='task-type']").value = taskType;
    // if in edit mode, change button to save task

    formEl.setAttribute("data-task-id", taskId);
    document.querySelector("#save-task").textContent = "Save task";
};

var saveTasks = function() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
};

var loadTasks = function() {
    var savedTasks = localStorage.getItem("tasks");

    if (!tasks) {
        return false;
    }

    tasks = JSON.parse(savedTasks);

    for (var i = 0; i < saveTasks.length; i++) {
        // pass each task object into  the createtaskel() function
        createTaskEl(savedTasks[i]);
    }
};

// on a button click, create a task
formEl.addEventListener("submit", taskFormHandler);

pageContentEl.addEventListener("click", taskButtonHandler);

pageContentEl.addEventListener("change", taskStatusChangeHandler);