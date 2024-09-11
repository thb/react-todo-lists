import { RootState } from './store';
import { Task } from './types';

// Select all tasks
export const selectTasks = (state: RootState): Task[] => state.tasks.tasks;

// Select current filter
export const selectFilter = (state: RootState): string => state.filter;

// Select filtered tasks
export const selectFilteredTasks = (state: RootState): Task[] => {
  const tasks = selectTasks(state);
  const filter = selectFilter(state);

  switch (filter) {
    case 'active':
      return tasks.filter((task) => !task.done);
    case 'done':
      return tasks.filter((task) => task.done);
    default:
      return tasks;
  }
};
