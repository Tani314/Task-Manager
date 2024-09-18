"use client";

import { useState, useEffect } from "react";
import axios from "../utils/axios";
import { Task } from "../types/types";
import AddTask from "./add-task"; // Ensure this import path is correct
import UpdateTask from "../components/UpdateTask"; // Ensure this import path is correct
import TaskService from "../services/task-service";

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

  const handleDeleteTask = async (task: Task) => {
    try {
      await TaskService.deleteTask(task.ID);
      const response = await TaskService.getTasks();
      // Flatten tasks into a single array
      const updatedTasks = response.data;
      setTasks(updatedTasks);
    } catch (error) {
      console.error("Error deleting task:", error);
      setError("Failed to delete task");
      // Optionally, show an error message to the user
    }
  };

  const handleCloseModal = () => {
    setShowModal(null);
    setSelectedTask(null);
  };

  return (
    <div className="p-4 rounded shadow-md">
      <h1 className="text-3xl mb-4">
        My Tasks
        <button onClick={handleAddTask} className=" text-green-900 p-2 rounded px-4">
          +
        </button>
      </h1>

      <ul className="space-y-4">
        {tasks.map((task) => (
          <li
            key={task.ID}
            className="bg-gray-100 text-black p-4 rounded shadow-md"
          >
            <h2 className="text-xl font-semibold">{task.Title}</h2>
            <p>{task.Description}</p>
            <p className="text-black">
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
            <div className="flex space-x-4 mt-2">
              <button
                onClick={() => handleUpdateTask(task)}
                className="bg-yellow-500 text-white p-2 rounded px-4"
              >
                Edit
              </button>
              <button
                onClick={() => handleDeleteTask(task)}
                className="bg-red-500 text-white p-2 rounded"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
      {showModal === "add" && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <AddTask
            onClose={handleCloseModal}
            onTaskAdded={() => {
              handleCloseModal();
              axios.get("/tasks").then((response) => {
                setTasks(response.data);
              });
            }}
          />
        </div>
      )}
      {showModal === "update" && selectedTask && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <UpdateTask
            task={selectedTask}
            onClose={handleCloseModal}
            onTaskUpdated={() => {
              handleCloseModal();
              axios.get("/tasks").then((response) => {
                setTasks(response.data);
              });
            }}
          />
        </div>
      )}
    </div>
  );
};

export default TaskPage;
