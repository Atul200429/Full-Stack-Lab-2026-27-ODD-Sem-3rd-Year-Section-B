const http = require("http");

const PORT = process.env.PORT || 4000;

const server = http.createServer((req, res) => {
    res.writeHead(200, {
        "Content-Type": "text/plain"
    });

    res.end(`Server is running on port ${PORT}`);
});

server.listen(PORT, () => {
    console.log(`Server started at http://localhost:${PORT}`);
});