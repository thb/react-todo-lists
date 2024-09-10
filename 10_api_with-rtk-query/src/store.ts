import { configureStore } from '@reduxjs/toolkit';
import { tasksApi } from './slices/tasksApi'; // Import the RTK Query API
import filterReducer from './slices/filterSlice'; // Example for a filter reducer

export const store = configureStore({
  reducer: {
    [tasksApi.reducerPath]: tasksApi.reducer, // Add the API reducer
    filter: filterReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(tasksApi.middleware), // Add the API middleware
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
