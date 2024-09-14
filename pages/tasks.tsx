import { useEffect, useState } from "react";
import axios from "../utils/axios";

interface Task {
  ID: number;
  Title: string;
  Description: string;
  Status: string;
  DueDate: string;
  Completed: boolean;
}

const TaskPage = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    axios
      .get('/tasks')
      .then(response => {
        console.log("Fetched tasks:", response.data); // Debugging line
        setTasks(response.data);
    })
    .catch(error => {
        console.error("Error fetching tasks:", error);
        setError("Failed to fetch tasks");
    });
  }, []);

  return (
    <div>
      <h1>Task Management</h1>
      {error && <p>{error}</p>}
      <ul>
        {tasks.length > 0 ? (
            tasks.map((task) => (
          <li key={task.ID}>
            <h2>{task.Title}</h2>
            <p>{task.Description}</p>
            <p>Status: {task.Status}</p>
            <p>Due Date: {new Date(task.DueDate).toDateString()}</p>
          </li>
        ))
        ) : (
            <p>No tasks available</p>
        )}
      </ul>
    </div>
  );
};

export default TaskPage;
