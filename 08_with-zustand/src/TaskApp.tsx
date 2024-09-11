import AddTask from './AddTask';
import TaskList from './TaskList';
import FilterBar from './FilterBar';

export default function TaskApp() {
  return (
    <div className="max-w-lg mx-auto">
      <h1 className="text-3xl font-bold text-center my-6">Todo List</h1>
      <FilterBar />
      <AddTask />
      <TaskList />
    </div>
  );
}
