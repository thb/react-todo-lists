import TaskItem from './TaskItem';
import { fetchTasks } from '@/actions/tasksActions';

export default async function TaskList({ filter }: { filter: 'all' | 'active' | 'done' }) {
  const tasks = await fetchTasks(filter); // Pass filter to fetch tasks accordingly

  if (!tasks || tasks.length === 0) {
    return <p>No tasks found.</p>;
  }

  return (
    <ul>
      {tasks.map((task) => (
        <TaskItem key={task.id} task={task} />
      ))}
    </ul>
  );
}
