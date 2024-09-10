import tasksReducer from './tasksReducer';

import { useReducer } from 'react';
import AddTask from './AddTask';
import TaskList from './TaskList';
import { Action, Task } from './types';
import { filterReducer } from './filterReducer';
import FilterBar from './FilterBar';

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
  const [tasks, dispatchTask] = useReducer(tasksReducer, finalTasks);
  const [filter, dispatchFilter] = useReducer(filterReducer, 'all');

  function handleAddTask(text: string) {
    dispatchTask({
      type: 'added',
      id: nextId++,
      text: text,
    });
  }

  function handleChangeTask(task: Task) {
    dispatchTask({
      type: 'changed',
      task: task,
    });
  }

  function handleDeleteTask(taskId: number) {
    dispatchTask({
      type: 'deleted',
      id: taskId,
    });
  }

  function handleFilterChange(filter: 'all' | 'active' | 'done') {
    dispatchFilter({
      type: 'setFilter',
      filter: filter,
    });
  }

  const filteredTasks = tasks.filter((t) => {
    if (filter === 'all') {
      return true;
    } else if (filter === 'active') {
      return !t.done;
    } else if (filter === 'done') {
      return t.done;
    }
  });

  return (
    <div className="max-w-lg mx-auto">
      <h1 className="text-3xl font-bold text-center my-6">Todo List</h1>
      <FilterBar filter={filter} onFilterChange={handleFilterChange} />
      <AddTask onAddTask={handleAddTask} />
      <TaskList
        tasks={filteredTasks}
        onChangeTask={handleChangeTask}
        onDeleteTask={handleDeleteTask}
      />
    </div>
  );
}
