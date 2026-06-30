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
// Task Manager Class
// ======================================

export class TaskManager {

    // Private task array
    private tasks: Task[] = [];

    constructor() {

        this.load();

    }

    // -------------------------------
    // Add Task
    // -------------------------------

    add(
        data: Omit<Task, "id" | "done">
    ): Task {

        const task: Task = {

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

    getAll(): Task[] {

        return this.tasks;

    }

    // -------------------------------
    // Toggle Done
    // -------------------------------

    toggle(id: number): void {

        const task = this.tasks.find(

            task => task.id === id

        );

        if (task) {

            task.done = !task.done;

            this.save();

        }

    }

    // -------------------------------
    // Filter Tasks
    // -------------------------------

    filter(
        status: "all" | "done" | "pending"
    ): Task[] {

        if (status === "done") {

            return this.tasks.filter(

                task => task.done

            );

        }

        if (status === "pending") {

            return this.tasks.filter(

                task => !task.done

            );

        }

        return this.tasks;

    }

    // -------------------------------
    // Sort Tasks
    // -------------------------------

    sortBy(
        field: keyof Pick<Task, "priority" | "dueDate">
    ): Task[] {

        const copy = [...this.tasks];

        if (field === "priority") {

            const order = {

                High: 3,

                Medium: 2,

                Low: 1

            };

            copy.sort(

                (a, b) =>

                order[b.priority] - order[a.priority]

            );

        }

        if (field === "dueDate") {

            copy.sort(

                (a, b) =>

                a.dueDate.localeCompare(b.dueDate)

            );

        }

        return copy;

    }

    // -------------------------------
    // Save
    // -------------------------------

    private save(): void {

        localStorage.setItem(

            "tasks",

            JSON.stringify(this.tasks)

        );

    }
    // -------------------------------
// Clear All Tasks
// -------------------------------

clear(): void {

    this.tasks = [];

    this.save();

}

// -------------------------------
// Get Tasks By Filter and Sort
// -------------------------------

getFilteredAndSorted(
    status: "all" | "done" | "pending",
    sortField: string
): Task[] {

    let result = this.filter(status);

    if (sortField === "priority") {

        const order = {

            High: 3,

            Medium: 2,

            Low: 1

        };

        result.sort(

            (a, b) => order[b.priority] - order[a.priority]

        );

    }

    if (sortField === "dueDate") {

        result.sort(

            (a, b) => a.dueDate.localeCompare(b.dueDate)

        );

    }

    return result;

}

    // -------------------------------
    // Load
    // -------------------------------

    load(): void {

        const stored =

            localStorage.getItem("tasks");

        if (stored) {

            this.tasks = JSON.parse(stored);

        }

    }

}

// ======================================
// Generic Group By
// ======================================

export function groupBy<T>(

    items: T[],

    key: keyof T

): Record<string, T[]> {

    const groups: Record<string, T[]> = {};

    items.forEach(item => {

        const groupKey =

            String(item[key]);

        if (!groups[groupKey]) {

            groups[groupKey] = [];

        }

        groups[groupKey].push(item);

    });

    return groups;

}