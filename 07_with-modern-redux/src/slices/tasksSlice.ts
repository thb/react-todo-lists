import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Task } from '../types';

interface TasksState {
  tasks: Task[];
}

const initialState: TasksState = {
  tasks: [
    { id: 1, text: 'Visit Kafka Museum', done: true },
    { id: 2, text: 'Watch a puppet show', done: false },
    { id: 3, text: 'Lennon Wall pic', done: false },
  ],
};

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addTask(state, action: PayloadAction<{ id: number; text: string }>) {
      state.tasks.push({ id: action.payload.id, text: action.payload.text, done: false });
    },
    changeTask(state, action: PayloadAction<Task>) {
      const taskIndex = state.tasks.findIndex((task) => task.id === action.payload.id);
      if (taskIndex !== -1) {
        state.tasks[taskIndex] = action.payload;
      }
    },
    deleteTask(state, action: PayloadAction<number>) {
      state.tasks = state.tasks.filter((task) => task.id !== action.payload);
    },
  },
});

export const { addTask, changeTask, deleteTask } = tasksSlice.actions;

export default tasksSlice.reducer;
