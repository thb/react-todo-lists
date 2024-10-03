import TaskItem from '@/components/TaskItem';
import { useTasks } from '@/hooks/useTasks'; // React Query to fetch tasks
import { useFilterStore } from '@/stores/filterStore'; // Zustand store for filter

export default function TaskList() {
  const { filter } = useFilterStore(); // Get the filter from Zustand store

  const { data: tasks = [], isLoading, error } = useTasks(); // Fetch tasks using React Query

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
