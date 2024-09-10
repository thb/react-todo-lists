import { useMemo, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import TaskItem from './TaskItem';
import { selectTasks, selectFilter } from './selectors';
import { addTask } from './actions'; // Assuming `addTask` will add fetched tasks to the store
import { Task } from './types';

// Hypothetical async function to simulate fetching tasks from an API
const fetchTasks = async (): Promise<Task[]> => {
  return [
    { id: 1, text: 'Visit Kafka Museum', done: true },
    { id: 2, text: 'Watch a puppet show', done: false },
    { id: 3, text: 'Lennon Wall pic', done: false },
    { id: 4, text: 'Visit Prague Castle', done: false },
    { id: 5, text: 'Take a boat tour', done: false },
  ];
};

export default function TaskList() {
  const dispatch = useDispatch();

  // Get tasks and filter from the Redux store using useSelector
  const tasks = useSelector(selectTasks);
  const filter = useSelector(selectFilter);

  // Fetch tasks only if the task list is empty (prevents redundant fetching)
  const [fetched, setFetched] = useState(false);

  useEffect(() => {
    if (!fetched) {
      async function loadTasks() {
        const tasksFromAPI = await fetchTasks();
        tasksFromAPI.forEach((task) => dispatch(addTask(task.id, task.text, task.done)));
        setFetched(true); // Set the flag to true to avoid fetching again
      }

      loadTasks();
    }
  }, [dispatch, fetched]);

  // Memoize the filtered task list to prevent unnecessary recalculations
  const filteredTasks = useMemo(() => {
    switch (filter) {
      case 'active':
        return tasks.filter((task) => !task.done);
      case 'done':
        return tasks.filter((task) => task.done);
      default:
        return tasks;
    }
  }, [tasks, filter]); // Only recalculate if tasks or filter change

  return (
    <ul>
      {filteredTasks.map((task) => (
        <TaskItem key={task.id} task={task} />
      ))}
    </ul>
  );
}
