// TaskList.tsx
import { useTasks } from './TaskContext';
import { useFilter } from './FilterContext';
import TaskItem from './TaskItem';

export default function TaskList() {
  const { tasks } = useTasks();
  const { filter } = useFilter();

  const filteredTasks = tasks.filter((task) => {
    if (filter === 'all') return true;
    if (filter === 'active') return !task.done;
    if (filter === 'done') return task.done;
    return true;
  });

  return (
    <ul>
      {filteredTasks.map((task) => (
        <TaskItem key={task.id} task={task} />
      ))}
    </ul>
  );
}
