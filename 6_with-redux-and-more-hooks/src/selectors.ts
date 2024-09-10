import { RootState } from './store';
import { Task } from './types';

// Select all tasks
export const selectTasks = (state: RootState): Task[] => state.tasks;

// Select current filter
export const selectFilter = (state: RootState): string => state.filter;
