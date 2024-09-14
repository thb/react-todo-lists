'use server';

import { Task } from "@/types";
import { revalidatePath } from "next/cache";
import { apiClient } from "./apiClient";
import { unstable_noStore as noStore } from 'next/cache';

const GET = 'GET';
const POST = 'POST';
const PUT = 'PUT';
const DELETE = 'DELETE';

export async function fetchTasks(filter: 'all' | 'active' | 'done'): Promise<Task[]> {
  // Add noStore() here to prevent the response from being cached.
  // This is equivalent to in fetch(..., {cache: 'no-store'}).
  noStore();
  const json = await apiClient('/tasks', GET);
  return json
}

export async function createTask(text: string) {
  apiClient('/tasks', POST, { text, done: false });
  revalidatePath('/tasks');
}

export async function updateTask(id: number, task: Partial<Task>) {
  apiClient(`/tasks/${id}`, PUT, task);
  revalidatePath('/tasks');
}

export async function deleteTask(id: number) {
  apiClient(`/tasks/${id}`, DELETE);
  revalidatePath('/tasks');
}
