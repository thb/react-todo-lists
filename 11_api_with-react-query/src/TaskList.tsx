import TaskItem from './TaskItem';
import { useTasks } from './queries';
import { Task } from './types';
import { useFilterStore } from './useFilterStore';

export default function TaskList() {
  const { filter } = useFilterStore(); // Get filter state and action from Zustand
  const { data: tasks = [], isLoading, error } = useTasks() // Use React Query to fetch tasks

  const filteredTasks = tasks.filter((task: Task) => {
    switch (filter) {
      case 'active':
        return !task.done;
      case 'done':
        return task.done;
      default:
        return true; // Show all tasks for 'all' filter
    }
  });


  if (isLoading) {
    return <p>Loading tasks...</p>;
  }

  if (error) {
    return <p>Error fetching tasks</p>;
  }

  return (
    <ul>
      {filteredTasks.map((task: Task) => (
        <TaskItem key={task.id} task={task} />
      ))}
    </ul>
  );
}
