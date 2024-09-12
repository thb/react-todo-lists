'use server';

import { Task } from "@/types";
import { revalidatePath } from "next/cache";
import { apiClient, GET, POST, PUT, DELETE } from "./apiClient";

export async function fetchTasks(filter: 'all' | 'active' | 'done'): Promise<Task[]> {
  // Fetch tasks from Rails API
  return apiClient('/tasks', GET);
}

export async function createTask(text: string) {
  // Create a new task using the Rails API
  apiClient('/tasks', POST, { text, done: false });
  revalidatePath('/tasks');
}

export async function updateTask(id: number, task: Partial<Task>) {
  // Update task status using the Rails API
  return apiClient(`/tasks/${task.id}`, PUT, task);
}

export async function deleteTask(id: number) {
  // Delete the task using the Rails API
  return apiClient(`/tasks/${id}`, DELETE);
}
