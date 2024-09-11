import axios from 'axios';
import { Task } from './types';

const API_URL = 'http://localhost:3000/tasks';

export const fetchTasks = async (): Promise<Task[]> => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const createTask = async (newTask: Omit<Task, 'id'>): Promise<Task> => {
  const response = await axios.post(API_URL, newTask);
  return response.data;
};

export const updateTask = async (updatedTask: Task): Promise<Task> => {
  const response = await axios.put(`${API_URL}/${updatedTask.id}`, updatedTask);
  return response.data;
};

export const deleteTask = async (id: number): Promise<void> => {
  await axios.delete(`${API_URL}/${id}`);
};
