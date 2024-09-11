import React, { createContext, useContext } from 'react';
import { Task, Action } from './types';

// Task context type
interface TaskContextType {
  tasks: Task[];
  dispatch: React.Dispatch<Action>;
}

// Create the context
export const TaskContext = createContext<TaskContextType | undefined>(undefined);

// Custom hook to use the TaskContext
export function useTasks() {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error('useTasks must be used within a TaskProvider');
  }
  return context;
}
