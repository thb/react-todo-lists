import TaskItem from './TaskItem';
import { useTasks } from './queries'; // React Query to fetch tasks
import { useFilterStore } from './useFilterStore'; // Zustand store for filter
import { useAuthStore } from './useAuthStore'; // Zustand store for authentication
import Login from './Login';

export default function TaskList() {
  const { filter } = useFilterStore(); // Get the filter from Zustand store
  const { accessToken } = useAuthStore(); // Get accessToken from auth store

  const { data: tasks = [], isLoading, error } = useTasks(); // Fetch tasks using React Query

  if (!accessToken) {
    return (
      <>
        <p>Please log in to view your tasks.</p>
        <Login />
      </>
    )
  }

  const filteredTasks = tasks.filter((task) => {
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
    return <p>Error fetching tasks: {error.message}</p>;
  }

  return (
    <ul>
      {filteredTasks.map((task) => (
        <TaskItem key={task.id} task={task} />
      ))}
    </ul>
  );
}
