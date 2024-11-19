import TaskItem from './TaskItem';
import { fetchTasks } from '@/actions/tasksActions';
import { getSession } from '@/lib/session';

export default async function TaskList({ filter }: { filter: 'all' | 'active' | 'done' }) {
  const tasks = await fetchTasks(filter); // Pass filter to fetch tasks accordingly

  if (!tasks || tasks.length === 0) {
    return <p>No tasks found.</p>;
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

  return (
    <>
      <h4>User info</h4>
      <ul>
        {filteredTasks.map((task) => (
          <TaskItem key={task.id} task={task} />
        ))}
      </ul>
    </>
  );
}
