'use client';

import { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import TaskModal from './TaskModal'; // Component for adding/updating/deleting tasks
import { Task } from '../types/types';
import TaskService from '../services/task-service'; // Your existing task service

const CalendarComponent = () => {
  const [date, setDate] = useState<Date>(new Date());
  const [tasks, setTasks] = useState<Record<string, Task[]>>({});
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [currentTask, setCurrentTask] = useState<Task | null>(null);

  useEffect(() => {
    TaskService.getTasks().then((response) => {
      // Assuming `response.data` is an array of tasks
      const tasksByDate = response.data.reduce<Record<string, Task[]>>((acc, task) => {
        const taskDate = new Date(task.DueDate).toISOString().split('T')[0];
        if (!acc[taskDate]) acc[taskDate] = [];
        acc[taskDate].push(task);
        return acc;
      }, {});
      setTasks(tasksByDate);
    });
  }, []);

  const handleDateClick = (date: Date) => {
    setSelectedDate(date);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setCurrentTask(null);
  };

  const handleTaskUpdated = () => {
    TaskService.getTasks().then((response) => {
      const tasksByDate = response.data.reduce<Record<string, Task[]>>((acc, task) => {
        const taskDate = new Date(task.DueDate).toISOString().split('T')[0];
        if (!acc[taskDate]) acc[taskDate] = [];
        acc[taskDate].push(task);
        return acc;
      }, {});
      setTasks(tasksByDate);
    });
  };

  return (
    <div>
      <Calendar
        onChange={(newDate) => setDate(newDate as Date)}
        value={date}
        tileClassName={({ date }) => {
          const dateString = date.toISOString().split('T')[0];
          return tasks[dateString] ? 'has-tasks' : '';
        }}
        onClickDay={handleDateClick}
      />
      {showModal && (
        <TaskModal
          date={selectedDate}
          task={currentTask}
          onClose={handleCloseModal}
          onTaskUpdated={handleTaskUpdated}
        />
      )}
    </div>
  );
};

export default CalendarComponent;
