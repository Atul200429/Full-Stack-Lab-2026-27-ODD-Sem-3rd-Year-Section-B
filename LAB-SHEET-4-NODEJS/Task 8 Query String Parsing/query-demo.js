const http = require("http");
const url = require("url");

const server = http.createServer((req, res) => {

    // /search route
    if (req.method === "GET" && req.url.startsWith("/search")) {

        const parsedUrl = url.parse(req.url, true);
        const keyword = parsedUrl.query.keyword;

        res.writeHead(200, {
            "Content-Type": "text/plain"
        });

        res.end("Search keyword: " + keyword);
    }

    // Any other route
    else {
        res.writeHead(404, {
            "Content-Type": "text/plain"
        });

        res.end("404 - Page Not Found");
    }
});

server.listen(3000, () => {
    console.log("Server running at http://localhost:3000");
});