"use client";

import { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { Task } from "../types/types";
import TaskService from "../services/task-service"; // Your existing task service
import AddTask from "../pages/add-task";

const CalendarComponent = () => {
  const [date, setDate] = useState<Date>(new Date());
  const [tasks, setTasks] = useState<Record<string, Task[]>>({});
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [currentTask, setCurrentTask] = useState<Task | null>(null);

  useEffect(() => {
    TaskService.getTasks().then((response) => {
      // Assuming `response.data` is an array of tasks
      const tasksByDate = response.data.reduce<Record<string, Task[]>>(
        (acc, task) => {
          const taskDate = new Date(task.DueDate).toISOString().split("T")[0];
          if (!acc[taskDate]) acc[taskDate] = [];
          acc[taskDate].push(task);
          return acc;
        },
        {}
      );
      setTasks(tasksByDate);
    });
  }, []);

  const handleDateClick = (date: Date) => {
    setSelectedDate(date);
    const selectedDateString = date.toISOString().split("T")[0];
    setCurrentTask(tasks[selectedDateString] || []);
  };

  const handleAddTaskClick = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleTaskUpdated = () => {
    TaskService.getTasks().then((response) => {
      const tasksByDate = response.data.reduce<Record<string, Task[]>>(
        (acc, task) => {
          const taskDate = new Date(task.DueDate).toISOString().split("T")[0];
          if (!acc[taskDate]) acc[taskDate] = [];
          acc[taskDate].push(task);
          return acc;
        },
        {}
      );
      setTasks(tasksByDate);
      handleCloseModal();
    });
  };

  return (
    <div className="p-4 rounded shadow-md">
   <h1 className="text-3xl mb-4">Calendar</h1>
    <div className="space-y-4 text-gray-600">
      <Calendar
        onChange={(newDate) => setDate(newDate as Date)}
        value={date}
        tileClassName={({ date }) => {
          const dateString = date.toISOString().split("T")[0];
          return tasks[dateString] ? "has-tasks" : "";
        }}
        onClickDay={handleDateClick}
      />
      {selectedDate && (
        <div className="mt-4">
          <h2 className="text-xl font-semibold">
            Tasks for {selectedDate.toLocaleDateString()}:
          </h2>
          {currentTask && currentTask.length > 0 ? (
            <ul className="space-y-2 mt-2">
              {currentTask.map((task) => (
                <li key={task.ID} className="bg-gray-100 p-2 rounded">
                  <h3 className="text-lg font-bold">{task.Title}</h3>
                  <p>{task.Description}</p>
                  <p>Status: {task.Status}</p>
                </li>
              ))}
            </ul>
          ) : (
            <p>No tasks for this day.</p>
          )}
          <button
            className="bg-blue-500 text-white p-2 rounded mt-4"
            onClick={handleAddTaskClick}
          >
            Add Task
          </button>
        </div>
      )}
      {showModal && (
        <AddTask
          date={selectedDate}
          task={currentTask}
          onClose={handleCloseModal}
          onTaskAdded={handleTaskUpdated}
        />
      )}
    </div>
  </div>
  );
};

export default CalendarComponent;
