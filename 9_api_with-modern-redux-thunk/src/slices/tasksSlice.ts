import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { Task } from '../types';

const API_URL = 'http://localhost:3000/tasks';

// Fetch tasks thunk
export const fetchTasks = createAsyncThunk<Task[]>('tasks/fetchTasks', async () => {
  const response = await axios.get(API_URL);
  return response.data;
});

// Create task thunk
export const createTask = createAsyncThunk<Task, Omit<Task, 'id'>>('tasks/createTask', async (task) => {
  const response = await axios.post(API_URL, task);
  return response.data;
});

// Update task thunk
export const updateTask = createAsyncThunk<Task, Task>('tasks/updateTask', async (task) => {
  const response = await axios.put(`${API_URL}/${task.id}`, task);
  return response.data;
});

// Delete task thunk
export const deleteTask = createAsyncThunk<number, number>('tasks/deleteTask', async (id) => {
  await axios.delete(`${API_URL}/${id}`);
  return id;
});

// Slice definition
const tasksSlice = createSlice({
  name: 'tasks',
  initialState: {
    tasks: [] as Task[],
    loading: false,
    error: null as string | null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTasks.fulfilled, (state, action: PayloadAction<Task[]>) => {
        state.loading = false;
        state.tasks = action.payload;
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch tasks';
      })
      .addCase(createTask.fulfilled, (state, action: PayloadAction<Task>) => {
        state.tasks.push(action.payload);
      })
      .addCase(updateTask.fulfilled, (state, action: PayloadAction<Task>) => {
        const index = state.tasks.findIndex((task) => task.id === action.payload.id);
        if (index !== -1) {
          state.tasks[index] = action.payload;
        }
      })
      .addCase(deleteTask.fulfilled, (state, action: PayloadAction<number>) => {
        state.tasks = state.tasks.filter((task) => task.id !== action.payload);
      });
  },
});

export default tasksSlice.reducer;
