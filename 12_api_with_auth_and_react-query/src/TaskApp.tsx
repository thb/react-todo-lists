import AddTask from './AddTask';
import TaskList from './TaskList';
import FilterBar from './FilterBar';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from './queryClient';
import Logout from './Logout';


export default function TaskApp() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="max-w-lg mx-auto relative">
        <h1 className="text-3xl font-bold text-center my-6">Todo List</h1>
        <FilterBar />
        <AddTask />
        <TaskList />
        <div className="absolute top-0 right-0 w-full h-16">
          <Logout />
        </div>
      </div>
    </QueryClientProvider>
  );
}
