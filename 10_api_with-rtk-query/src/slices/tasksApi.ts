import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Task } from '../types';

// Define the base URL for the API
const API_URL = 'http://localhost:3000';

// Define the API slice
export const tasksApi = createApi({
  reducerPath: 'tasksApi', // Unique key to store the API cache in the Redux store
  baseQuery: fetchBaseQuery({ baseUrl: API_URL }),
  tagTypes: ['Task'], // Used for cache invalidation
  endpoints: (builder) => ({
    // Fetch all tasks
    fetchTasks: builder.query<Task[], void>({
      query: () => '/tasks',
      providesTags: ['Task'], // Provides cache tag for invalidation
    }),
    // Create a new task
    createTask: builder.mutation<Task, Omit<Task, 'id'>>({
      query: (newTask) => ({
        url: '/tasks',
        method: 'POST',
        body: newTask,
      }),
      invalidatesTags: ['Task'], // Invalidate the 'Task' cache on success
    }),
    // Update an existing task
    updateTask: builder.mutation<Task, Task>({
      query: (updatedTask) => ({
        url: `/tasks/${updatedTask.id}`,
        method: 'PUT',
        body: updatedTask,
      }),
      invalidatesTags: ['Task'], // Invalidate the 'Task' cache on success
    }),
    // Delete a task
    deleteTask: builder.mutation<number, number>({
      query: (id) => ({
        url: `/tasks/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Task'], // Invalidate the 'Task' cache on success
    }),
  }),
});

// Export the auto-generated hooks for the endpoints
export const {
  useFetchTasksQuery,
  useCreateTaskMutation,
  useUpdateTaskMutation,
  useDeleteTaskMutation,
} = tasksApi;
