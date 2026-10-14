const http = require("http");

const students = [
    {
        id: 1,
        name: "Atul Krishna",
        course: "B.Tech CSE"
    },
    {
        id: 2,
        name: "Rahul Sharma",
        course: "B.Tech CSE"
    },
    {
        id: 3,
        name: "Priya Singh",
        course: "B.Tech CSE"
    }
];

const server = http.createServer((req, res) => {

    // GET /
    if (req.method === "GET" && req.url === "/") {
        res.writeHead(200, {
            "Content-Type": "text/html"
        });

        res.end("<h1>Welcome to Student Server</h1>");
    }

    // GET /students
    else if (req.method === "GET" && req.url === "/students") {
        res.writeHead(200, {
            "Content-Type": "application/json"
        });

        res.end(JSON.stringify(students));
    }

    // GET /students/:id
    else if (
        req.method === "GET" &&
        req.url.startsWith("/students/")
    ) {
        const id = parseInt(req.url.split("/")[2]);

        const student = students.find(
            student => student.id === id
        );

        if (student) {
            res.writeHead(200, {
                "Content-Type": "application/json"
            });

            res.end(JSON.stringify(student));
        } else {
            res.writeHead(404, {
                "Content-Type": "application/json"
            });

            res.end(JSON.stringify({
                error: "Student not found"
            }));
        }
    }

    // Any other route
    else {
        res.writeHead(404, {
            "Content-Type": "text/html"
        });

        res.end("<h1>404 - Page Not Found</h1>");
    }
});

server.listen(3000, () => {
    console.log("Server running at http://localhost:3000");
});