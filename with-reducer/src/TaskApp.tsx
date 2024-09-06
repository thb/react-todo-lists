import tasksReducer from './tasksReducer';

import { useReducer } from 'react';
import AddTask from './AddTask';
import TaskList from './TaskList';
import { Action, Task } from './types';


let initialTasks: Task[] = [];
let actions: Action[] = [
  { type: 'added', id: 1, text: 'Visit Kafka Museum' },
  { type: 'added', id: 2, text: 'Watch a puppet show' },
  { type: 'deleted', id: 1 },
  { type: 'added', id: 3, text: 'Lennon Wall pic' },
];

let finalTasks = actions.reduce(tasksReducer, initialTasks);

let nextId = 4;

export default function TaskApp() {
  const [tasks, dispatch] = useReducer(tasksReducer, finalTasks);

  function handleAddTask(text: string) {
    dispatch({
      type: 'added',
      id: nextId++,
      text: text,
    });
  }

  function handleChangeTask(task: Task) {
    dispatch({
      type: 'changed',
      task: task,
    });
  }

  function handleDeleteTask(taskId: number) {
    dispatch({
      type: 'deleted',
      id: taskId,
    });
  }

  return (
    <div className="max-w-lg mx-auto">
      <h1 className="text-3xl font-bold text-center my-6">Todo List</h1>
      <AddTask onAddTask={handleAddTask} />
      <TaskList
        tasks={tasks}
        onChangeTask={handleChangeTask}
        onDeleteTask={handleDeleteTask}
      />
    </div>
  );
}
