import { Task } from '@/types/task';
import apiClient from './apiClient';

export const fetchTasks = async (): Promise<Task[]> => {
  const response = await apiClient.get('/tasks');
  return response.data;
};

export const createTask = async (newTask: Omit<Task, 'id'>): Promise<Task> => {
  const response = await apiClient.post('/tasks', newTask);
  return response.data;
};

export const updateTask = async (updatedTask: Task): Promise<Task> => {
  const response = await apiClient.put(`/tasks/${updatedTask.id}`, updatedTask);
  return response.data;
};

export const deleteTask = async (id: number): Promise<void> => {
  await apiClient.delete(`/tasks/${id}`);
};
