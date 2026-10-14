# Lab Sheet 4 — Node.js

**Course:** Full Stack Web Development (BTCS303P)
**Department:** Computer Science & Engineering, COER University, Roorkee

This repository contains my solutions for **Lab Sheet 4**, a hands-on introduction to core Node.js: modules, the file system, `path`, `os`, events, a framework-free HTTP server, streams, npm, CLI arguments, and environment variables. Every task lives in its own folder and is runnable on its own.

---

## Prerequisites

- [Node.js](https://nodejs.org/) v18 or later (check with `node -v`)
- npm (comes with Node.js)

## Getting Started

```bash
git clone https://github.com/Atul200429/Full-Stack-Lab-2026-27-ODD-Sem-3rd-Year-Section-B.git
cd Full-Stack-Lab-2026-27-ODD-Sem-3rd-Year-Section-B/LAB-SHEET-4-NODEJS
```

Then `cd` into any task folder and run the file as shown below.

---

## Project Structure

```
lab-sheet-4-nodejs/
├── Task 1 Custom Modules/
│   ├── app1.js
│   ├── even-odd.js
│   └── sum.js
├── Task 2 File System - CRUD on a Text File/
│   └── file-ops.js
├── Task 3 Directory Operations/
│   └── dir-ops.js
├── Task 4 Path Module/
│   └── path-demo.js
├── Task 5 OS Module Report/
│   └── sys-report.js
├── Task 6 Events Module - Custom EventEmitter/
│   └── order-events.js
├── Task 7 HTTP Server with Manual Routing/
│   └── server.js
├── Task 8 Query String Parsing/
│   └── query-demo.js
├── Task 9 Reading a Large File with Streams/
│   └── stream-demo.js
├── Task 10 npm and an External Package/
│   ├── id-gen.js
│   ├── package.json
│   └── package-lock.json
├── Task 11 Command-Line Arguments/
│   └── calc-cli.js
└── Task 12 Environment Variables/
    └── env-demo.js
```

---

## Tasks

| # | Task | File(s) | Concepts Used |
|---|------|---------|---------------|
| 1 | Custom Modules | `sum.js`, `even-odd.js`, `app1.js` | `module.exports`, `require` |
| 2 | File System — CRUD on a Text File | `file-ops.js` | `fs.writeFile`, `fs.appendFile`, `fs.readFile`, `fs.rename` |
| 3 | Directory Operations | `dir-ops.js` | `fs.mkdir`, `fs.writeFile`, `fs.readdir`, `fs.unlink` |
| 4 | Path Module | `path-demo.js` | `path.dirname`, `path.basename`, `path.extname`, `path.resolve` |
| 5 | OS Module Report | `sys-report.js` | `os.platform`, `os.arch`, `os.totalmem`, `os.freemem`, `os.cpus`, `os.uptime` |
| 6 | Events Module — Custom EventEmitter | `order-events.js` | `EventEmitter`, `emit`, `on` |
| 7 | HTTP Server with Manual Routing | `server.js` | `http.createServer`, manual routing, JSON responses |
| 8 | Query String Parsing | `query-demo.js` | `url.parse(req.url, true).query` |
| 9 | Reading a Large File with Streams | `stream-demo.js` | `fs.createReadStream`, `data` / `end` events |
| 10 | npm and an External Package | `id-gen.js` | `npm init`, `npm install`, `nanoid@3` |
| 11 | Command-Line Arguments | `calc-cli.js` | `process.argv` |
| 12 | Environment Variables | `env-demo.js` | `process.env` |

---

## How to Run Each Task

### Task 1 — Custom Modules
Creates two modules (`sum.js`, `even-odd.js`) that each export a function, and imports both into `app1.js` with sample values.
```bash
cd "Task 1 Custom Modules"
node app1.js
```

### Task 2 — File System: CRUD on a Text File
Creates `student.txt`, writes name and roll number, appends a course name, reads and prints the content, then renames the file to `profile.txt`.
```bash
cd "Task 2 File System - CRUD on a Text File"
node file-ops.js
```

### Task 3 — Directory Operations
Creates an `uploads` folder, adds 3 empty files, lists them, and deletes one.
```bash
cd "Task 3 Directory Operations"
node dir-ops.js
```

### Task 4 — Path Module
Takes a hardcoded path and prints its directory name, base name, extension, and an absolute path resolved from a relative one.
```bash
cd "Task 4 Path Module"
node path-demo.js
```

### Task 5 — OS Module Report
Prints platform, architecture, total and free memory, CPU core count, and system uptime in minutes.
```bash
cd "Task 5 OS Module Report"
node sys-report.js
```

### Task 6 — Events Module: Custom EventEmitter
Defines an `orderPlaced` event that receives an order object (`id`, `item`, `amount`) and logs a formatted receipt. The event is emitted 3 times with different orders.
```bash
cd "Task 6 Events Module - Custom EventEmitter"
node order-events.js
```

### Task 7 — HTTP Server with Manual Routing
A plain Node.js server (no framework) with these routes:

| Method | Route | Response |
|--------|-------|----------|
| GET | `/` | Welcome message |
| GET | `/students` | JSON array of 3 students |
| GET | `/students/:id` | Matching student, or a 404 JSON error |
| any | anything else | 404 page |

```bash
cd "Task 7 HTTP Server with Manual Routing"
node server.js
```
Test in the browser or Postman, e.g. `http://localhost:3000/students/1` (use the port printed in the console).

### Task 8 — Query String Parsing
Adds a `/search` route that reads a query parameter and echoes it back.
```bash
cd "Task 8 Query String Parsing"
node query-demo.js
```
Try: `http://localhost:<port>/search?keyword=node`

### Task 9 — Reading a Large File with Streams
Generates a text file with 50+ lines using a loop, then reads it back with `fs.createReadStream` and logs the size of each chunk received.
```bash
cd "Task 9 Reading a Large File with Streams"
node stream-demo.js
```

### Task 10 — npm and an External Package
Uses `nanoid@3` to generate and print 5 unique IDs.
```bash
cd "Task 10 npm and an External Package"
npm install
node id-gen.js
```
> `node_modules/` is not committed to the repo; `npm install` restores it from `package.json`.

### Task 11 — Command-Line Arguments
A small CLI calculator that takes two numbers and an operator (`+`, `-`, `*`, `/`).
```bash
cd "Task 11 Command-Line Arguments"
node calc-cli.js 10 5 +
node calc-cli.js 10 5 -
node calc-cli.js 10 5 "*"
node calc-cli.js 10 5 /
```
> On some shells `*` must be quoted (`"*"`), otherwise the shell expands it into file names.

### Task 12 — Environment Variables
Reads `PORT` from `process.env` (defaults to `4000`) and starts an HTTP server on it.
```bash
cd "Task 12 Environment Variables"

# Default port (4000)
node env-demo.js

# Custom port — Linux / macOS
PORT=5000 node env-demo.js

# Custom port — Windows (CMD)
set PORT=5000 && node env-demo.js

# Custom port — Windows (PowerShell)
$env:PORT=5000; node env-demo.js
```

---

## Concepts Covered

- CommonJS modules (`require` / `module.exports`)
- Built-in modules: `fs`, `path`, `os`, `events`, `http`, `url`
- Asynchronous file and directory operations
- Event-driven programming with `EventEmitter`
- Building a REST-style server without a framework
- Streaming data instead of loading whole files into memory
- Using npm and third-party packages
- Command-line arguments and environment variables

---

## Author

**Atul Krishna**
B.Tech Computer Science & Engineering, COER University, Roorkee
GitHub: [@Atul200429](https://github.com/Atul200429)

---

**Submitted as part of the Full Stack Web Development lab coursework.**