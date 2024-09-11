import { Task, TaskAction } from '../types';

// Define initial state for tasks
const initialState: Task[] = [];

// Task reducer with action types
export default function tasksReducer(state = initialState, action: TaskAction): Task[] {
  switch (action.type) {
    case 'ADDED':
      return [
        ...state,
        { id: action.id, text: action.text, done: false },
      ];
    case 'CHANGED':
      return state.map((task) =>
        task.id === action.task.id ? action.task : task
      );
    case 'DELETED':
      return state.filter((task) => task.id !== action.id);
    default:
      return state;
  }
}
