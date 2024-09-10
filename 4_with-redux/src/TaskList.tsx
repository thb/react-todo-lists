import { connect } from 'react-redux';
import { RootState } from './store';
import TaskItem from './TaskItem';
import { Task } from './types';

interface TaskListProps {
  tasks: Task[];
  filter: string;
}

function TaskList({ tasks, filter }: TaskListProps) {
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

// Map state to props
const mapStateToProps = (state: RootState) => ({
  tasks: state.tasks,
  filter: state.filter,
});

export default connect(mapStateToProps)(TaskList);
