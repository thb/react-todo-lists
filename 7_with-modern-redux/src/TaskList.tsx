import { useSelector } from 'react-redux';
import TaskItem from './TaskItem';
import { selectFilteredTasks } from './selectors';

export default function TaskList() {
  // Get filtered tasks using the selector
  const tasks = useSelector(selectFilteredTasks);

  return (
    <ul>
      {tasks.map((task) => (
        <TaskItem key={task.id} task={task} />
      ))}
    </ul>
  );
}
