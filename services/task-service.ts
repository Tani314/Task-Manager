import axios from '../utils/axios';
import { Task } from '../types/types';

const API_URL = '/tasks';

const getTasks = () => {
  return axios.get<Task[]>(API_URL);
};

const createTask = (task: Omit<Task, 'ID' | 'CreatedAt' | 'UpdatedAt'>) => {
  return axios.post<Task>(API_URL, task);
};

const updateTask = (id: number, task: Partial<Omit<Task, 'ID'>>) => {
  return axios.put<Task>(`${API_URL}/${id}`, task);
};

const deleteTask = (id: number) => {
  return axios.delete(`${API_URL}/${id}`);
};

export default {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
};
