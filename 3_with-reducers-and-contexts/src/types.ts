export interface Task {
  id: number;
  text: string;
  done: boolean;
}

export type Action =
  | { type: 'added'; id: number; text: string }
  | { type: 'changed'; task: Task }
  | { type: 'deleted'; id: number };

export type FilterAction = { type: 'setFilter'; filter: 'all' | 'active' | 'done' };
