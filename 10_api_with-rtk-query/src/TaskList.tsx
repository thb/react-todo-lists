import { useSelector } from 'react-redux';
import TaskItem from './TaskItem';
import { useFetchTasksQuery } from './slices/tasksApi'; // Import the RTK Query hook
import { RootState } from './store';

export default function TaskList() {
  const { data: tasks = [], error, isLoading } = useFetchTasksQuery(); // Use the query hook to fetch tasks

  const filter = useSelector((state: RootState) => state.filter); // Get the current filter from Redux

  // Apply filtering based on the selected filter
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
    return <p>Error fetching tasks</p>;
  }

  return (
    <ul>
      {filteredTasks.map((task) => (
        <TaskItem key={task.id} task={task} />
      ))}
    </ul>
  );
}
