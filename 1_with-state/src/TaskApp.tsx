/* src/TaskApp.tsx */

import { useState } from 'react';
import AddTask from './AddTask';
import TaskList from './TaskList';
import { Task } from './types';
import FilterBar from './FilterBar';

export default function TaskApp() {
  const [tasks, setTasks] = useState(initialTasks);
  const [filter, setFilter] = useState<'all' | 'active' | 'done'>('all');

  function handleAddTask(text: string) {
    setTasks([
      ...tasks,
      {
        id: nextId++,
        text: text,
        done: false,
      },
    ]);
  }

  function handleChangeTask(task: Task) {
    setTasks(
      tasks.map((t) => {
        if (t.id === task.id) {
          return task;
        } else {
          return t;
        }
      })
    );
  }

  function handleDeleteTask(taskId: number) {
    setTasks(tasks.filter((t) => t.id !== taskId));
  }

  function handleFilterChange(newFilter: 'all' | 'active' | 'done') {
    setFilter(newFilter);
  }

  const filteredTasks = tasks.filter((task) => {
    if (filter === 'all') {
      return true;
    } else if (filter === 'active') {
      return !task.done;
    } else if (filter === 'done') {
      return task.done;
    }
    return true;
  });

  return (
    <div className="max-w-lg mx-auto">
      <h1 className="text-3xl font-bold text-center my-6">Todo List</h1>
      <FilterBar onFilterChange={handleFilterChange} filter={filter} />
      <AddTask onAddTask={handleAddTask} />
      <TaskList
        tasks={filteredTasks}
        onChangeTask={handleChangeTask}
        onDeleteTask={handleDeleteTask}
      />
    </div>
  );
}

let nextId = 3;
const initialTasks = [
  { id: 0, text: 'Visit Kafka Museum', done: true },
  { id: 1, text: 'Watch a puppet show', done: false },
  { id: 2, text: 'Lennon Wall pic', done: false },
];
