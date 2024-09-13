export interface Task {
  id: number;
  text: string;
  done: boolean;
}

// Action types for tasks
export type TaskAction =
  | { type: 'ADDED'; id: number; text: string }
  | { type: 'CHANGED'; task: Task }
  | { type: 'DELETED'; id: number };

// Action types for filter
export type FilterAction = { type: 'SET_FILTER'; filter: 'all' | 'active' | 'done' };
