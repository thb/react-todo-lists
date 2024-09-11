import { useMemo } from 'react';
import TaskItem from './TaskItem';
import { useTaskStore } from './useTaskStore';

export default function TaskList() {
  const tasks = useTaskStore((state) => state.tasks);
  const filter = useTaskStore((state) => state.filter);

  const filteredTasks = useMemo(() => {
    switch (filter) {
      case 'active':
        return tasks.filter((task) => !task.done);
      case 'done':
        return tasks.filter((task) => task.done);
      default:
        return tasks;
    }
  }, [tasks, filter]);

  return (
    <ul>
      {filteredTasks.map((task) => (
        <TaskItem key={task.id} task={task} />
      ))}
    </ul>
  );
}
