import { createStore, combineReducers } from 'redux';
import tasksReducer from './reducers/tasksReducer';
import filterReducer from './reducers/filterReducer';

// Combine reducers
const rootReducer = combineReducers({
  tasks: tasksReducer,
  filter: filterReducer,
});

// Define RootState type (this will be used in components to map state to props)
export type RootState = ReturnType<typeof rootReducer>;

// Create the store
export const store = createStore(rootReducer);
