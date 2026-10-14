const express = require("express");

const router = express.Router();

let tasks = [
    {
        id: 1,
        title: "Complete Express Lab",
        completed: false
    },
    {
        id: 2,
        title: "Practice REST API",
        completed: true
    },
    {
        id: 3,
        title: "Prepare for Viva",
        completed: false
    }
];

// 1. GET all tasks
router.get("/", (req, res) => {
    res.json(tasks);
});

// 2. GET one task
router.get("/:id", (req, res, next) => {
    const id = parseInt(req.params.id);

    const task = tasks.find(task => task.id === id);

    if (!task) {
        const error = new Error("Task not found");
        error.status = 404;

        return next(error);
    }

    res.json(task);
});

// 3. POST a new task
router.post("/", (req, res) => {
    const newTask = {
        id: tasks.length + 1,
        title: req.body.title,
        completed: req.body.completed || false
    };

    tasks.push(newTask);

    res.status(201).json(newTask);
});

// 4. PUT / update a task
router.put("/:id", (req, res) => {
    const id = parseInt(req.params.id);

    const task = tasks.find(task => task.id === id);

    if (!task) {
        return res.status(404).json({
            error: "Task not found"
        });
    }

    task.title = req.body.title ?? task.title;
    task.completed = req.body.completed ?? task.completed;

    res.json(task);
});

// 5. DELETE a task
router.delete("/:id", (req, res) => {
    const id = parseInt(req.params.id);

    const taskIndex = tasks.findIndex(task => task.id === id);

    if (taskIndex === -1) {
        return res.status(404).json({
            error: "Task not found"
        });
    }

    const deletedTask = tasks.splice(taskIndex, 1);

    res.json({
        message: "Task deleted successfully",
        task: deletedTask[0]
    });
});

module.exports = router;