// ======================================
// Task Interface
// ======================================
// ======================================
// Tasks Array
// ======================================
export let tasks = [];
// ======================================
// Add Task
// ======================================
export function addTask(name, priority, dueDate) {
    const task = {
        id: Date.now(),
        name,
        priority,
        dueDate,
        done: false
    };
    tasks.push(task);
    return task;
}
// ======================================
// Toggle Done
// ======================================
export function toggleDone(id) {
    const task = tasks.find(task => task.id === id);
    if (task) {
        task.done = !task.done;
    }
}
//# sourceMappingURL=tasks.js.map