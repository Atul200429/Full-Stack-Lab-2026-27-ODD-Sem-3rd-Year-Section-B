const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const logger = (req, res, next) => {
    console.log(
        `[${new Date().toISOString()}] ${req.method} ${req.originalUrl}`
    );
    next();
};

app.use(logger);

const authCheck = (req, res, next) => {
    const apiKey = req.headers["x-api-key"];

    if (!apiKey || apiKey !== process.env.API_KEY) {
        return res.status(401).json({
            error: "Unauthorized: Invalid or missing API key"
        });
    }

    next();
};

app.get("/", (req, res) => {
    res.json({
        message: "Task Manager API is running"
    });
});

let tasks = [
    {
        id: 1,
        title: "Learn Node.js",
        completed: false
    },
    {
        id: 2,
        title: "Learn Express.js",
        completed: false
    },
    {
        id: 3,
        title: "Build REST API",
        completed: true
    },
    {
        id: 4,
        title: "Test API using Postman",
        completed: false
    },
    {
        id: 5,
        title: "Create React Frontend",
        completed: false
    }
];

app.get("/api/tasks", (req, res) => {
    res.json(tasks);
});

app.get("/api/tasks/:id", (req, res) => {
    const id = parseInt(req.params.id);

    const task = tasks.find(task => task.id === id);

    if (!task) {
        return res.status(404).json({
            error: "Task not found"
        });
    }

    res.json(task);
});

app.post("/api/tasks", authCheck, (req, res) => {
    const { title, completed } = req.body;

    const newTask = {
        id: tasks.length > 0 ? Math.max(...tasks.map(task => task.id)) + 1 : 1,
        title: title,
        completed: completed ?? false
    };

    tasks.push(newTask);

    res.status(201).json(newTask);
});

app.put("/api/tasks/:id", authCheck, (req, res) => {
    const id = parseInt(req.params.id);

    const task = tasks.find(task => task.id === id);

    if (!task) {
        return res.status(404).json({
            error: "Task not found"
        });
    }

    const { title, completed } = req.body;

    task.title = title ?? task.title;
    task.completed = completed ?? task.completed;

    res.json(task);
});

app.delete("/api/tasks/:id", authCheck, (req, res) => {
    const id = parseInt(req.params.id);

    const index = tasks.findIndex(task => task.id === id);

    if (index === -1) {
        return res.status(404).json({
            error: "Task not found"
        });
    }

    const deletedTask = tasks.splice(index, 1)[0];

    res.json({
        message: "Task deleted successfully",
        task: deletedTask
    });
});

// Test route for centralized error handler
app.get("/api/error", (req, res, next) => {
    next(new Error("Test error for centralized error handler"));
});

// 404 handler
app.use((req, res, next) => {
    res.status(404).json({
        error: "Route not found",
        path: req.originalUrl
    });
});

// Centralized error-handling middleware
app.use((err, req, res, next) => {
    console.error(err);

    res.status(500).json({
        error: "Internal Server Error",
        message: err.message
    });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});