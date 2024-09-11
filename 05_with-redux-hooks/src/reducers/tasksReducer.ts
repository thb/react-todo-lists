import { Task, TaskAction } from '../types';

// Define initial state for tasks
const initialState: Task[] = [
  { id: 1, text: 'Visit Kafka Museum', done: true },
  { id: 2, text: 'Watch a puppet show', done: false },
  { id: 3, text: 'Lennon Wall pic', done: false },
];

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
