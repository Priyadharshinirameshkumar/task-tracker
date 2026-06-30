// ======================================
// Task Interface
// ======================================

export interface Task {

    id: number;

    name: string;

    priority: "Low" | "Medium" | "High";

    dueDate: string;

    done: boolean;

}

// ======================================
// Tasks Array
// ======================================

export let tasks: Task[] = [];

// ======================================
// Add Task
// ======================================

export function addTask(

    name: string,

    priority: "Low" | "Medium" | "High",

    dueDate: string

): Task {

    const task: Task = {

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

export function toggleDone(

    id: number

): void {

    const task = tasks.find(

        task => task.id === id

    );

    if (task) {

        task.done = !task.done;

    }

}