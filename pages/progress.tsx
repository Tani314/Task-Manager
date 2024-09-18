"use client";

import { useState, useEffect } from "react";
import TaskService from "../services/task-service";
import { Task } from "../types/types";

const Progress = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [progress, setProgress] = useState<{ [key: number]: number }>({}); // Track progress for each task

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await TaskService.getTasks();
        setTasks(response.data);
        // Initialize progress state based on tasks
        const initialProgress = response.data.reduce((acc, task) => {
          acc[task.ID] = task.Status === "completed" ? 100 : 0; // Initialize with 0 or 100 based on status
          return acc;
        }, {} as { [key: number]: number });
        setProgress(initialProgress);
      } catch (error) {
        console.error("Failed to fetch tasks", error);
      }
    };

    fetchTasks();
  }, []);

  const handleProgressChange = (id: number, value: number) => {
    setProgress((prevProgress) => ({
      ...prevProgress,
      [id]: value,
    }));
  };

  const handleSaveProgress = async () => {
    try {
      await Promise.all(
        tasks.map((task) => {
          const updatedStatus =
            progress[task.ID] === 100 ? "completed" : task.Status;
          return TaskService.updateTask(task.ID, { Status: updatedStatus });
        })
      );
      alert("Progress updated successfully!");
    } catch (error) {
      console.error("Error updating progress:", error);
    }
  };

  return (
    <div className="container p-4 rounded shadow-md">
      <h1 className="text-3xl mb-4">Task Progress</h1>
      <div className="space-y-4">
        {tasks.map((task) => (
          <div key={task.ID} className="bg-white text-black  p-4 rounded shadow-md">
            <h2 className="text-xl font-semibold">{task.Title}</h2>
            <p>{task.Description}</p>
            <div className="flex items-center space-x-4">
              <label className="text-gray-800">Progress:</label>
              <input
                type="number"
                min="0"
                max="100"
                value={progress[task.ID] || 0}
                onChange={(e) =>
                  handleProgressChange(task.ID, Number(e.target.value))
                }
                className="border p-2 rounded w-20"
              />
              <div className="w-full bg-gray-200 rounded-full h-4 relative">
                <div
                  className="bg-green-600 h-full rounded-full"
                  style={{ width: `${progress[task.ID] || 0}%` }}
                />
                <span className="absolute inset-0 flex items-center justify-center text-xs text-white">
                  {progress[task.ID] || 0}%
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
      <button
        onClick={handleSaveProgress}
        className="bg-blue-500 text-white p-2 rounded mt-4"
      >
        Save Progress
      </button>
    </div>
  );
};

export default Progress;
