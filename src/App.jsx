import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./App.css";
import { fetchTasks, addTask, deleteTask, toggleDarkMode } from "./tasksSlice";

const App = () => {
  const dispatch = useDispatch();
  const { tasks, loading, error, darkMode } = useSelector(
    (state) => state.tasks
  );
  const [newTaskText, setNewTaskText] = useState("");

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  const handleAddTask = (task) => {
    dispatch(addTask(task));
    setNewTaskText(""); // Clear the input after adding a new task
  };

  const handleDeleteTask = (taskId) => {
    dispatch(deleteTask(taskId));
  };

  const handleToggleDarkMode = () => {
    dispatch(toggleDarkMode());
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div className={`app ${darkMode ? "dark" : "light"}`}>
      <header>
        <h1>ToDo App</h1>
        <button onClick={handleToggleDarkMode}>
          {darkMode ? "Light Mode" : "Dark Mode"}
        </button>
      </header>
      <main>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const newTask = {
              id: Date.now(),
              title: newTaskText, // Use the newTaskText state as the task title
            };
            handleAddTask(newTask);
          }}
        >
          <input
            type="text"
            name="task"
            placeholder="Add a new task"
            value={newTaskText} // Bind the input value to the newTaskText state
            onChange={(e) => setNewTaskText(e.target.value)} // Update the newTaskText state on input change
          />
          <button type="submit">Add Task</button>
        </form>

        {tasks.length === 0 ? (
          <p>No tasks found.</p>
        ) : (
          <ul>
            {tasks.map((task) => (
              <li key={task.id}>
                {task.title}{" "}
                <button onClick={() => handleDeleteTask(task.id)}>
                  Delete
                </button>
              </li>
            ))}
          </ul>
        )}
      </main>
    </div>
  );
};

export default App;
