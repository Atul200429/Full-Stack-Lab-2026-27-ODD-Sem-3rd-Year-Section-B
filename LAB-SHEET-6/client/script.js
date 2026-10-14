const taskList = document.getElementById("taskList");

// Show loading message
taskList.innerHTML = "<li>Loading...</li>";

fetch("http://localhost:5000/api/tasks")
    .then(response => {
        if (!response.ok) {
            throw new Error("Failed to fetch tasks");
        }
        return response.json();
    })
    .then(tasks => {
        taskList.innerHTML = "";

        tasks.forEach(task => {
            const li = document.createElement("li");
            li.textContent = task.title;
            taskList.appendChild(li);
        });
    })
    .catch(error => {
        taskList.innerHTML = "<li>Error: Unable to load tasks.</li>";
        console.error(error);
    });