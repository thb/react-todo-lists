import create from 'zustand';
import { Task } from './types';

interface TaskStore {
  tasks: Task[];
  filter: 'all' | 'active' | 'done';
  addTask: (task: Task) => void;
  addTasks: (tasks: Task[]) => void;
  changeTask: (task: Task) => void;
  deleteTask: (id: number) => void;
  setFilter: (filter: 'all' | 'active' | 'done') => void;
}

export const useTaskStore = create<TaskStore>((set) => ({
  tasks: [
    { id: 1, text: 'Visit Kafka Museum', done: true },
    { id: 2, text: 'Watch a puppet show', done: false },
    { id: 3, text: 'Lennon Wall pic', done: false },
  ],
  filter: 'all',

  addTask: (task) => set((state) => ({ tasks: [...state.tasks, task] })),

  addTasks: (tasks) => set((state) => ({ tasks: [...state.tasks, ...tasks] })),

  changeTask: (updatedTask) => set((state) => ({
    tasks: state.tasks.map((task) =>
      task.id === updatedTask.id ? updatedTask : task
    ),
  })),

  deleteTask: (id) => set((state) => ({
    tasks: state.tasks.filter((task) => task.id !== id),
  })),

  setFilter: (filter) => set({ filter }),
}));
