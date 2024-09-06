import { Action, Task } from "./types";

function tasksReducer(tasks: Task[], action: Action) {
  switch (action.type) {
    case 'added':
      return [...tasks, { id: action.id, text: action.text, done: false }];
    case 'changed':
      return tasks.map((task) =>
        task.id === action.task?.id ? { ...task, ...action.task } : task
      );
    case 'deleted':
      return tasks.filter((task) => task.id !== action.id);
    default:
      return tasks;
  }
}

export default tasksReducer;