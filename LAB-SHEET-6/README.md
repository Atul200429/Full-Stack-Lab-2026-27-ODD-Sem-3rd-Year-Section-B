# Lab Sheet 6 — APIs: Task Manager Mini App

**Course:** Full Stack Web Development (BTCS303P)
**Department:** Computer Science & Engineering, COER University, Roorkee

This lab builds a complete **Node.js + Express REST API** (no database) and consumes it from two clients: a **plain JavaScript client** and a **React client**. Together they form a small "Task Manager" app that covers the full backend-to-frontend pipeline: CRUD routes, middleware, CORS, API-key auth, error handling, environment config, and loading/error states on the client.

---

## Tech Stack

| Layer | Tools |
|-------|-------|
| Server | Node.js, Express.js, cors, dotenv, nodemon |
| Plain JS client | HTML, CSS, JavaScript, `fetch()` |
| React client | React, Vite, axios |
| API testing | Postman / Thunder Client |

---

## Project Structure

```
LAB-SHEET-6/
├── server/                     Express REST API
│   ├── public/
│   │   └── cors-test.html      page used to test the CORS behaviour
│   ├── .env                    (not committed)
│   ├── .gitignore
│   ├── package.json
│   ├── package-lock.json
│   └── server.js
├── client/                     Plain JavaScript client
│   ├── index.html
│   └── script.js
├── client-react/               React client (Vite)
│   ├── public/
│   ├── src/
│   │   ├── App.jsx
│   │   ├── App.css
│   │   ├── TaskList.jsx
│   │   ├── index.css
│   │   └── main.jsx
│   ├── .env                    (not committed)
│   ├── .gitignore
│   ├── eslint.config.js
│   ├── index.html
│   ├── package.json
│   ├── package-lock.json
│   ├── vite.config.js
│   └── README.md
└── README.md
```

---

## Prerequisites

- [Node.js](https://nodejs.org/) v18 or later (check with `node -v`)
- npm (comes with Node.js)
- A modern browser
- Postman or Thunder Client (for testing the API)

---

## Getting Started

```bash
git clone https://github.com/Atul200429/Full-Stack-Lab-2026-27-ODD-Sem-3rd-Year-Section-B.git
cd Full-Stack-Lab-2026-27-ODD-Sem-3rd-Year-Section-B/LAB-SHEET-6
```

### 1. Start the API server

```bash
cd server
npm install
```

Create a `.env` file inside `server/` (it is git-ignored, so it is not in the repo):

```
PORT=5000
API_KEY=your-secret-key
```

Run the server:

```bash
# auto-restart with nodemon
npm run dev

# or normal run
node server.js
```

The API runs at `http://localhost:5000`.

### 2. Run the plain JavaScript client

With the server running, open `client/index.html` in the browser (or use the VS Code Live Server extension). It loads the task list from `GET /api/tasks`.

### 3. Run the React client

Open a second terminal:

```bash
cd client-react
npm install
```

Create a `.env` file inside `client-react/` (also git-ignored):

```
VITE_API_URL=http://localhost:5000/api
VITE_API_KEY=your-secret-key
```

Start the dev server:

```bash
npm run dev
```

Vite prints the local URL (usually `http://localhost:5173`).

> Use the same API key in both `.env` files. Restart the Vite dev server after changing `.env`, because Vite only reads it at startup.

---

## API Reference

Base URL: `http://localhost:5000/api`

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/api/tasks` | none | List all tasks |
| GET | `/api/tasks/:id` | none | Get one task (404 if the id does not exist) |
| POST | `/api/tasks` | `x-api-key` | Create a task |
| PUT | `/api/tasks/:id` | `x-api-key` | Update a task |
| DELETE | `/api/tasks/:id` | `x-api-key` | Delete a task |

A task looks like this:

```json
{ "id": 1, "title": "Learn Express", "completed": false }
```

**Authentication:** the `POST`, `PUT` and `DELETE` routes need the header `x-api-key` with the key stored in the server's `.env`. Without it the server answers `401`. `GET` routes work without the key.

**Middleware:**
- A custom logger prints the method, URL and timestamp of every request (applied globally).
- An auth-check middleware validates `x-api-key` (applied only to POST, PUT and DELETE).
- CORS is enabled so the browser clients can call the API.

**Error handling:**
- Unknown ids return a `404` JSON error, for example `{ "error": "Task not found" }`.
- A 404 handler at the end catches unmatched URLs.
- A centralized error handler (4 parameters) returns a consistent JSON error shape for anything that is thrown.

### Example requests

```bash
# Read (no key needed)
curl http://localhost:5000/api/tasks

# Create (key required)
curl -X POST http://localhost:5000/api/tasks \
  -H "Content-Type: application/json" \
  -H "x-api-key: your-secret-key" \
  -d '{"title":"Write README"}'

# Create without the key -> 401
curl -X POST http://localhost:5000/api/tasks \
  -H "Content-Type: application/json" \
  -d '{"title":"No key"}'
```

PowerShell:

```powershell
Invoke-RestMethod -Uri "http://localhost:5000/api/tasks" -Method POST `
  -Headers @{"x-api-key"="your-secret-key"} `
  -ContentType "application/json" `
  -Body '{"title":"Write README"}' | ConvertTo-Json
```

---

## What Each Question Covers

| Q | Topic | What was built |
|---|-------|----------------|
| Q1 | Server setup and REST API | Express server with `cors` and `dotenv`, `PORT` from `.env` (fallback 5000), nodemon `dev` script, in-memory tasks array, five CRUD routes, logger and API-key middleware |
| Q2 | Securing, testing and error handling | CORS enabled and tested, Postman collection "API Lab" for all 5 endpoints, 404 handler, centralized error handler |
| Q3 | Plain JavaScript client | `index.html` and `script.js` using `fetch()` to list tasks, with "Loading..." and error messages |
| Q4 | React client | Vite app with `TaskList` (loading, error and data states), `axios` version of the fetch call, create-task form and delete button that update the UI instantly |
| Q5 | Full-stack error handling and config | Readable 404 and 401 messages in the UI, all config in `.env` files (`PORT`, API key, `VITE_API_URL`), final combined Task Manager Mini App |

---

## Things Learned

**CORS:** when CORS is disabled on the server, the browser blocks the client's request and shows an error like: *"Access to fetch at 'http://localhost:5000/api/tasks' from origin '...' has been blocked by CORS policy: No 'Access-Control-Allow-Origin' header is present on the requested resource."* Enabling the `cors` middleware on the server fixes it. `server/public/cors-test.html` was used to check this.

**fetch vs axios (React client):**
- `fetch()` does not throw on `404` or `401`, so the response status has to be checked manually, and `response.json()` has to be called to parse the body.
- `axios` parses JSON automatically and rejects the promise for non-2xx responses, which makes error handling shorter and cleaner.

**Handling failures on the client:** the UI shows a loading state, a readable error message for network failures, `401` and `404` responses (for example deleting a task with a fake id like `9999`), and never a crash or blank screen.

**Config:** nothing is hardcoded. The server reads `PORT` and the API key from `.env`, and the React app reads the API's base URL from `VITE_API_URL`.

---

## Concepts Covered

- Building a REST API with Express (CRUD, route params, status codes)
- Custom middleware: logger and API-key authentication
- Enabling and debugging CORS
- Centralized error handling and 404 handling
- Testing APIs with Postman / Thunder Client
- Consuming an API with plain `fetch()`
- React data fetching with `useEffect` and `useState` (loading / error / data)
- Using axios, and the differences from fetch
- Create and delete flows with instant UI updates
- Environment variables on both server (`dotenv`) and client (Vite)

---

## Author

**Atul Krishna**
B.Tech Computer Science & Engineering, COER University, Roorkee
GitHub: [@Atul200429](https://github.com/Atul200429)

---

**Submitted as part of the Full Stack Web Development lab coursework.**
