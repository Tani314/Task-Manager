import axios from '../utils/axios';
import { Task } from '../types/types';

const API_URL = '/tasks';

const getTasks = () => {
  return axios.get<Task[]>(API_URL);
};

const formatDueDate = (date: string) => {
  // Ensure the due date is in ISO 8601 format
  return new Date(date).toISOString();
};

const createTask = (task: Omit<Task, 'ID' | 'CreatedAt' | 'UpdatedAt'>) => {
  const formattedTask = {
    ...task,
    DueDate: formatDueDate(task.DueDate),
  };
  return axios.post<Task>(API_URL, formattedTask)
    .catch(error => {
      console.error('Error creating task:', error);
      throw error;
    });
};

const updateTask = (id: number, task: Partial<Omit<Task, 'ID'>>) => {
  const formattedTask = {
    ...task,
    DueDate: task.DueDate ? formatDueDate(task.DueDate) : undefined,
  };
  return axios.put<Task>(`${API_URL}/${id}`, formattedTask)
    .catch(error => {
      console.error('Error updating task:', error);
      throw error;
    });
};

const deleteTask = (id: number) => {
  return axios.delete(`${API_URL}/${id}`)
    .catch(error => {
      console.error('Error deleting task:', error);
      throw error;
    });
};
export default {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
};
