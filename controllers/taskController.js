const { readTasks, writeTasks } = require("../utils/fileHandler");

// CREATE task
const addTask = (req, res) => {
    const { title } = req.body;

    if (!title) {
        return res.status(400).json({ error: "Task title is required" });
    }

    const allowedPriorities = ["low", "medium", "high"];

    if (req.body.priority && !allowedPriorities.includes(req.body.priority)) {
        return res.status(400).json({
            error: "Priority must be low, medium, or high",
        });
    }

    const tasks = readTasks();

    const newTask = {
        id: Date.now(),
        title,
        status: "pending",
        priority: req.body.priority || "medium", // NEW
        deleted: false,
        createdAt: new Date().toISOString(),
    };


    tasks.push(newTask);
    writeTasks(tasks);

    res.status(201).json(newTask);
};

// READ tasks
const getTasks = (req, res) => {
    const { deleted, sort } = req.query;

    let tasks = readTasks();

    // Filter deleted
    if (deleted === "true") {
        tasks = tasks.filter(task => task.deleted);
    } else {
        tasks = tasks.filter(task => !task.deleted);
    }

    // SORTING
    if (sort === "priority") {
        const priorityOrder = { high: 1, medium: 2, low: 3 };
        tasks.sort(
            (a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]
        );
    }

    if (sort === "createdAt") {
        tasks.sort(
            (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
    }

    res.json(tasks);
};


// UPDATE task
const updateTask = (req, res) => {
    const { id } = req.params;
    const { status } = req.body;

    const tasks = readTasks();
    const task = tasks.find(t => t.id == id && !t.deleted);

    if (!task) {
        return res.status(404).json({ error: "Task not found" });
    }

    task.status = status;
    writeTasks(tasks);

    res.json(task);
};

// DELETE task (soft delete)
const deleteTask = (req, res) => {
    const { id } = req.params;

    const tasks = readTasks();
    const task = tasks.find(t => t.id == id);

    if (!task) {
        return res.status(404).json({ error: "Task not found" });
    }

    task.deleted = true;
    writeTasks(tasks);

    res.json({ message: "Task deleted successfully" });
};

module.exports = {
    addTask,
    getTasks,
    updateTask,
    deleteTask,
};