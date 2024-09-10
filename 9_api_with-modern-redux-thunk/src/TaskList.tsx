import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import TaskItem from './TaskItem';
import { fetchTasks } from './slices/tasksSlice';
import { RootState, AppDispatch } from './store'; // Import AppDispatch

export default function TaskList() {
  const dispatch: AppDispatch = useDispatch(); // Type the dispatch function as AppDispatch
  const tasks = useSelector((state: RootState) => state.tasks.tasks);
  const filter = useSelector((state: RootState) => state.filter);
  const loading = useSelector((state: RootState) => state.tasks.loading);
  const error = useSelector((state: RootState) => state.tasks.error);

  useEffect(() => {
    dispatch(fetchTasks()); // Dispatch the async thunk with typed dispatch
  }, [dispatch]);

  const filteredTasks = tasks.filter((task) => {
    switch (filter) {
      case 'active':
        return !task.done;
      case 'done':
        return task.done;
      default:
        return true;
    }
  });

  if (loading) {
    return <p>Loading tasks...</p>;
  }

  if (error) {
    return <p>Error fetching tasks: {error}</p>;
  }

  return (
    <ul>
      {filteredTasks.map((task) => (
        <TaskItem key={task.id} task={task} />
      ))}
    </ul>
  );
}
