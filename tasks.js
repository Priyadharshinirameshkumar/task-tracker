// ======================================
// Task Interface
// ======================================
// ======================================
// Task Manager Class
// ======================================
export class TaskManager {
    constructor() {
        // Private task array
        this.tasks = [];
        this.load();
    }
    // -------------------------------
    // Add Task
    // -------------------------------
    add(data) {
        const task = {
            id: Date.now(),
            done: false,
            ...data
        };
        this.tasks.push(task);
        this.save();
        return task;
    }
    // -------------------------------
    // Get All Tasks
    // -------------------------------
    getAll() {
        return this.tasks;
    }
    // -------------------------------
    // Toggle Done
    // -------------------------------
    toggle(id) {
        const task = this.tasks.find(task => task.id === id);
        if (task) {
            task.done = !task.done;
            this.save();
        }
    }
    // -------------------------------
    // Filter Tasks
    // -------------------------------
    filter(status) {
        if (status === "done") {
            return this.tasks.filter(task => task.done);
        }
        if (status === "pending") {
            return this.tasks.filter(task => !task.done);
        }
        return this.tasks;
    }
    // -------------------------------
    // Sort Tasks
    // -------------------------------
    sortBy(field) {
        const copy = [...this.tasks];
        if (field === "priority") {
            const order = {
                High: 3,
                Medium: 2,
                Low: 1
            };
            copy.sort((a, b) => order[b.priority] - order[a.priority]);
        }
        if (field === "dueDate") {
            copy.sort((a, b) => a.dueDate.localeCompare(b.dueDate));
        }
        return copy;
    }
    // -------------------------------
    // Save
    // -------------------------------
    save() {
        localStorage.setItem("tasks", JSON.stringify(this.tasks));
    }
    // -------------------------------
    // Clear All Tasks
    // -------------------------------
    clear() {
        this.tasks = [];
        this.save();
    }
    // -------------------------------
    // Get Tasks By Filter and Sort
    // -------------------------------
    getFilteredAndSorted(status, sortField) {
        let result = this.filter(status);
        if (sortField === "priority") {
            const order = {
                High: 3,
                Medium: 2,
                Low: 1
            };
            result.sort((a, b) => order[b.priority] - order[a.priority]);
        }
        if (sortField === "dueDate") {
            result.sort((a, b) => a.dueDate.localeCompare(b.dueDate));
        }
        return result;
    }
    // -------------------------------
    // Load
    // -------------------------------
    load() {
        const stored = localStorage.getItem("tasks");
        if (stored) {
            this.tasks = JSON.parse(stored);
        }
    }
}
// ======================================
// Generic Group By
// ======================================
export function groupBy(items, key) {
    const groups = {};
    items.forEach(item => {
        const groupKey = String(item[key]);
        if (!groups[groupKey]) {
            groups[groupKey] = [];
        }
        groups[groupKey].push(item);
    });
    return groups;
}
//# sourceMappingURL=tasks.js.map