import TaskList from '@/components/TaskList';
import AddTask from '@/components/AddTask';
import FilterBar from '@/components/FilterBar';

export default async function TaskPage({
  searchParams,
}: {
  searchParams?: {
    filter?: 'all' | 'active' | 'done';
  };
}) {

  const filter = searchParams?.filter || 'all';

  return (
    <>
      <h1 className="text-3xl font-bold text-center mb-6">Todo List</h1>
      <AddTask />
      <FilterBar currentFilter={filter} />
      <TaskList filter={filter} />
    </>
  );
}
