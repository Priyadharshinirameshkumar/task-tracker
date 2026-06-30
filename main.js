// Select HTML Elements


const taskForm = document.querySelector("#task-form");
const taskList = document.querySelector("#task-list");

const taskNameInput = document.querySelector("#task-name");
const priorityInput = document.querySelector("#priority");
const dueDateInput = document.querySelector("#due-date");

const clearAllButton = document.querySelector("#clear-all");

// ======================================
// Add Task
// ======================================

taskForm.addEventListener("submit", function (event) {

    event.preventDefault();

    const taskName = taskNameInput.value;
    const priority = priorityInput.value;
    const dueDate = dueDateInput.value;
    if (taskName.trim() === "") {
    alert("Please enter a task name.");
    return;
}
    const listItem = document.createElement("li");
    const today =
new Date().toISOString().split("T")[0];

if (dueDate <= today) {

    listItem.style.color = "red";

}

    listItem.textContent =
        `${taskName} | ${priority} | ${dueDate} `;
const doneButton =
    document.createElement("button");

doneButton.textContent = "Done";

doneButton.addEventListener("click", function () {

    listItem.classList.toggle("done");

});

listItem.appendChild(doneButton);

    taskList.appendChild(listItem);
taskForm.reset();
});

// ======================================
// Clear All
// ======================================

clearAllButton.addEventListener("click", function () {

    taskList.innerHTML = "";

});