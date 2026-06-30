// ======================================
// Select HTML Elements
// ======================================

const taskForm = document.querySelector("#task-form");
const taskList = document.querySelector("#task-list");

const taskNameInput = document.querySelector("#task-name");
const priorityInput = document.querySelector("#priority");
const dueDateInput = document.querySelector("#due-date");

const clearAllButton = document.querySelector("#clear-all");

const allButton = document.querySelector("#all-btn");
const pendingButton = document.querySelector("#pending-btn");
const doneFilterButton = document.querySelector("#done-btn");

const sortSelect = document.querySelector("#sort");

const taskCounter = document.querySelector("#task-counter");

// ======================================
// Store Tasks
// ======================================

let tasks = [];

let currentFilter = "all";

// ======================================
// Save Tasks
// ======================================

function saveTasks() {

    localStorage.setItem(
        "tasks",
        JSON.stringify(tasks)
    );

}

// ======================================
// Render Tasks
// ======================================

function renderTasks() {

    taskList.innerHTML = "";

    let filteredTasks = tasks;
if (sortSelect.value === "dueDate") {

    filteredTasks.sort(function(a,b){

        return new Date(a.dueDate)
            - new Date(b.dueDate);

    });

}
if (sortSelect.value === "priority") {

    const order = {

        High:3,

        Medium:2,

        Low:1

    };

    filteredTasks.sort(function(a,b){

        return order[b.priority]
            - order[a.priority];

    });

}
    if (currentFilter === "pending") {

        filteredTasks = tasks.filter(function (task) {

            return !task.done;

        });

    }

    if (currentFilter === "done") {

        filteredTasks = tasks.filter(function (task) {

            return task.done;

        });

    }

    filteredTasks.forEach(function (task) {

        const listItem = document.createElement("li");

        const today =
            new Date().toISOString().split("T")[0];

        if (task.dueDate <= today && !task.done) {

            listItem.style.color = "red";

        }

        listItem.textContent =
            `${task.name} | ${task.priority} | ${task.dueDate} `;

        const doneButton =
            document.createElement("button");

        doneButton.textContent = "Done";

        doneButton.addEventListener("click", function () {

        task.done = !task.done;

saveTasks();

renderTasks();

        });

        if (task.done) {

            listItem.classList.add("done");

        }

        listItem.appendChild(doneButton);

        taskList.appendChild(listItem);

    });

    taskCounter.textContent =
        `Showing ${filteredTasks.length} of ${tasks.length} tasks`;

}
// ======================================
// Load Tasks
// ======================================

function loadTasks() {

    const storedTasks =
        localStorage.getItem("tasks");

    if (storedTasks) {

        tasks = JSON.parse(storedTasks);

    }

    renderTasks();

}
// ======================================
// Add Task
// ======================================

taskForm.addEventListener("submit", function (event) {

    event.preventDefault();

    const task = {

        id: Date.now(),

        name: taskNameInput.value,

        priority: priorityInput.value,

        dueDate: dueDateInput.value,

        done: false

    };

  tasks.push(task);

saveTasks();

renderTasks();

taskForm.reset();

});

// ======================================
// Clear All
// ======================================

clearAllButton.addEventListener("click", function () {
tasks = [];

saveTasks();

renderTasks();

});

// ======================================
// Filters
// ======================================

allButton.addEventListener("click", function () {

    currentFilter = "all";

    renderTasks();

});

pendingButton.addEventListener("click", function () {

    currentFilter = "pending";

    renderTasks();

});

doneFilterButton.addEventListener("click", function () {

    currentFilter = "done";

    renderTasks();

});
loadTasks();
sortSelect.addEventListener("change", function(){

    renderTasks();

});