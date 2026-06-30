import { TaskManager, groupBy } from "./tasks.js";

// ======================================
// Create Task Manager
// ======================================

const manager = new TaskManager();

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
const doneButton = document.querySelector("#done-btn");

const sortSelect = document.querySelector("#sort");

const taskCounter = document.querySelector("#task-counter");

const summaryBody = document.querySelector("#summary-body");

// ======================================
// Current Filter
// ======================================

let currentFilter = "all";

// ======================================
// Render Tasks
// ======================================

function renderTasks() {

    taskList.innerHTML = "";

    summaryBody.innerHTML = "";

    let tasks = manager.getFilteredAndSorted(
        currentFilter,
        sortSelect.value
    );

    tasks.forEach(function (task) {

        const listItem = document.createElement("li");

        const today = new Date().toISOString().split("T")[0];

        if (task.dueDate <= today && !task.done) {

            listItem.style.color = "red";

        }

        listItem.textContent =
            `${task.name} | ${task.priority} | ${task.dueDate} `;

        const doneBtn = document.createElement("button");

        doneBtn.textContent = task.done
            ? "Undo"
            : "Done";

        doneBtn.addEventListener("click", function () {

            manager.toggle(task.id);

            renderTasks();

        });

        listItem.appendChild(doneBtn);

        if (task.done) {

            listItem.classList.add("done");

        }

        taskList.appendChild(listItem);

    });

    taskCounter.textContent =
        `Showing ${tasks.length} of ${manager.getAll().length} tasks`;

    const grouped = groupBy(
        manager.getAll(),
        "priority"
    );

    Object.keys(grouped).forEach(function (priority) {

        grouped[priority].forEach(function (task) {

            const row = document.createElement("tr");

            row.innerHTML = `
                <td>${task.name}</td>
                <td>${task.priority}</td>
                <td>${task.dueDate}</td>
                <td>${task.done ? "Done" : "Pending"}</td>
            `;

            summaryBody.appendChild(row);

        });

    });

}

// ======================================
// Add Task
// ======================================

taskForm.addEventListener("submit", function (event) {

    event.preventDefault();

    const name = taskNameInput.value.trim();

    const priority = priorityInput.value;

    const dueDate = dueDateInput.value;

    if (name === "") {

        alert("Please enter a task name.");

        return;

    }

    manager.add({

        name,

        priority,

        dueDate

    });

    renderTasks();

    taskForm.reset();

});

// ======================================
// Clear All
// ======================================

clearAllButton.addEventListener("click", function () {

    if (confirm("Are you sure you want to clear all tasks?")) {

        manager.clear();

        renderTasks();

    }

});

// ======================================
// Filter Buttons
// ======================================

allButton.addEventListener("click", function () {

    currentFilter = "all";

    renderTasks();

});

pendingButton.addEventListener("click", function () {

    currentFilter = "pending";

    renderTasks();

});

doneButton.addEventListener("click", function () {

    currentFilter = "done";

    renderTasks();

});

// ======================================
// Sort Dropdown
// ======================================

sortSelect.addEventListener("change", function () {

    renderTasks();

});

// ======================================
// Initial Render
// ======================================

renderTasks();