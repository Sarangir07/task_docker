import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

// Base URL of our Express backend
const API_URL = "http://3.88.229.217:5000/api/tasks";

function App() {
  const [tasks, setTasks] = useState([]);   // list of tasks from the DB
  const [title, setTitle] = useState("");    // the input box text

  // Load all tasks when the app first renders
  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const res = await axios.get(API_URL);
      setTasks(res.data);
    } catch (err) {
      console.error("Error fetching tasks:", err);
    }
  };

  // Add a new task
  const addTask = async (e) => {
    e.preventDefault();                 // stop the form from reloading the page
    if (!title.trim()) return;          // ignore empty input
    try {
      const res = await axios.post(API_URL, { title });
      setTasks([res.data, ...tasks]);   // add new task to the top of the list
      setTitle("");                     // clear the input
    } catch (err) {
      console.error("Error adding task:", err);
    }
  };

  // Toggle a task's completed status
  const toggleTask = async (task) => {
    try {
      const res = await axios.put(`${API_URL}/${task._id}`, {
        completed: !task.completed,
      });
      setTasks(tasks.map((t) => (t._id === task._id ? res.data : t)));
    } catch (err) {
      console.error("Error updating task:", err);
    }
  };

  // Delete a task
  const deleteTask = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      setTasks(tasks.filter((t) => t._id !== id));
    } catch (err) {
      console.error("Error deleting task:", err);
    }
  };

  return (
    <div className="container">
      <h1>📝 Task Manager</h1>

      {/* Form to add a task */}
      <form className="task-form" onSubmit={addTask}>
        <input
          type="text"
          placeholder="What needs to be done?"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <button type="submit">Add</button>
      </form>

      {/* List of tasks */}
      {tasks.length === 0 ? (
        <p className="empty">No tasks yet. Add one above! 🎯</p>
      ) : (
        <ul className="task-list">
          {tasks.map((task) => (
            <li key={task._id} className={task.completed ? "completed" : ""}>
              <span onClick={() => toggleTask(task)}>
                <input
                  type="checkbox"
                  checked={task.completed}
                  readOnly
                />
                {task.title}
              </span>
              <button className="delete-btn" onClick={() => deleteTask(task._id)}>
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;
