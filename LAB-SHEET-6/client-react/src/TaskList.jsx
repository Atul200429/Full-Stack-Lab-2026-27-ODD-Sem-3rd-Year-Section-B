import { useEffect, useState } from "react";

const API_URL = import.meta.env.VITE_API_URL;

function TaskList() {
    const [tasks, setTasks] = useState([]);
    const [title, setTitle] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const API_KEY = "coer123";

    useEffect(() => {
        fetch(`${API_URL}/api/tasks`)
            .then(response => response.json())
            .then(data => {
                setTasks(data);
                setLoading(false);
            })
            .catch(() => {
                setError("Failed to fetch tasks");
                setLoading(false);
            });
    }, []);

    // Add new task
    const addTask = (e) => {
        e.preventDefault();

        const body = {
            title: title,
            completed: false
        };

        fetch(`${API_URL}/api/tasks`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "x-api-key": API_KEY
            },
            body: JSON.stringify(body)
        })
            .then(response => response.json())
            .then(newTask => {
                setTasks([...tasks, newTask]);
                setTitle("");
            })
            .catch(() => {
                setError("Failed to add task");
            });
    };

    // Delete task
    const deleteTask = (id) => {
    fetch(`${API_URL}/api/tasks/${id}`, {
        method: "DELETE",
        headers: {
            "x-api-key": API_KEY
        }
    })
        .then(async response => {
            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.error || "Failed to delete task");
            }
            return data;
        })
        .then(() => {
            setTasks(tasks.filter(task => task.id !== id));
        })
        .catch(error => {
            setError(`Error: ${error.message}`);
        });
    };

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>Error: {error}</p>;
    }

    return (
        <div>
            <h2>Task Manager</h2>

            <form onSubmit={addTask}>
                <input
                    type="text"
                    placeholder="Enter task"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />

                <button type="submit">Add Task</button>
            </form>

            <ul>
                {tasks.map(task => (
                    <li key={task.id}>
                        {task.title}

                        <button onClick={() => deleteTask(task.id)}>
                            Delete
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default TaskList;