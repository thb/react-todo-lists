import { Task } from './types';

// Action creators for tasks
export function addTask(id: number, text: string, done: boolean = false) {
  return { type: 'ADDED', id, text, done };
}

export function changeTask(task: Task) {
  return { type: 'CHANGED', task };
}

export function deleteTask(id: number) {
  return { type: 'DELETED', id };
}

// Action creator for filter
export function setFilter(filter: 'all' | 'active' | 'done') {
  return { type: 'SET_FILTER', filter };
}
