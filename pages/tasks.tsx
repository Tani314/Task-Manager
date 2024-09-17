'use client';

import { useState, useEffect } from "react";
import axios from "../utils/axios";
import { Task } from "../types/types";
import AddTask from "./add-task"; // Ensure this import path is correct
import UpdateTask from "../components/UpdateTask"; // Ensure this import path is correct

const TaskPage = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [showModal, setShowModal] = useState<string | null>(null);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  useEffect(() => {
    axios
      .get("/tasks")
      .then((response) => {
        setTasks(response.data);
      })
      .catch((error) => {
        setError("Failed to fetch tasks");
      });
  }, []);

  const handleAddTask = () => {
    setShowModal("add");
  };

  const handleUpdateTask = (task: Task) => {
    setSelectedTask(task);
    setShowModal("update");
  };

  const handleCloseModal = () => {
    setShowModal(null);
    setSelectedTask(null);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Task Management</h1>
      <button
        onClick={handleAddTask}
        className="bg-blue-500 text-white p-2 rounded"
      >
        Add Task
      </button>
      <ul className="space-y-4">
        {tasks.map((task) => (
          <li key={task.ID} className="bg-white p-4 rounded shadow-md">
            <h2 className="text-xl font-semibold">{task.Title}</h2>
            <p>{task.Description}</p>
            <p>
              Status:{" "}
              <span
                className={`font-medium ${
                  task.Status === "completed"
                    ? "text-green-500"
                    : "text-red-500"
                }`}
              >
                {task.Status}
              </span>
            </p>
            <p>Due Date: {new Date(task.DueDate).toLocaleDateString()}</p>
            <button
              onClick={() => handleUpdateTask(task)}
              className="bg-yellow-500 text-white p-2 rounded"
            >
              Edit
            </button>
            <button className="bg-red-500 text-white p-2 rounded">
              Delete
            </button>
          </li>
        ))}
      </ul>
      {showModal === "add" && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <AddTask onClose={handleCloseModal} onTaskAdded={() => {
            handleCloseModal();
            // Refresh tasks after adding a new one
            axios.get("/tasks").then((response) => {
              setTasks(response.data);
            });
          }} />
        </div>
      )}
      {showModal === "update" && selectedTask && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <UpdateTask task={selectedTask} onClose={handleCloseModal} />
        </div>
      )}
    </div>
  );
};

export default TaskPage;
