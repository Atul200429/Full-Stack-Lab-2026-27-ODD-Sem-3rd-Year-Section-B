require("dotenv").config();

const express = require("express");

const booksRouter = require("./routes/books");
const membersRouter = require("./routes/members");

const app = express();

const PORT = process.env.PORT || 4000;

// Body parsing middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Static files
app.use(express.static("public"));

// Request Logger
const logger = (req, res, next) => {
    console.log(
        `${req.method} ${req.url} - ${new Date().toLocaleString()}`
    );

    next();
};

app.use(logger);

// Fake Authentication
const fakeAuth = (req, res, next) => {
    const apiKey = req.headers["x-api-key"];

    if (apiKey !== "library123") {
        return res.status(401).json({
            error: "Unauthorized"
        });
    }

    next();
};

// Apply fake authentication to all /api routes
app.use("/api", fakeAuth);

// Library API routes
app.use("/api/books", booksRouter);
app.use("/api/members", membersRouter);

// 404 Handler
app.use((req, res) => {
    res.status(404).json({
        error: "Route not found"
    });
});

// Centralized Error Handler
app.use((err, req, res, next) => {
    console.error(err.stack);

    res.status(err.status || 500).json({
        error: err.message || "Internal Server Error"
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});