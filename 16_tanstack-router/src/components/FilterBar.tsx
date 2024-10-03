import { useFilterStore } from '@/stores/filterStore'; // Access filter state from Zustand

export default function FilterBar() {
  const { filter, setFilter } = useFilterStore(); // Get filter state and action from Zustand

  return (
    <div className="flex justify-center space-x-4 mb-4">
      <button
        onClick={() => setFilter('all')}
        className={`px-4 py-2 rounded ${filter === 'all' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
      >
        All
      </button>
      <button
        onClick={() => setFilter('active')}
        className={`px-4 py-2 rounded ${filter === 'active' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
      >
        Active
      </button>
      <button
        onClick={() => setFilter('done')}
        className={`px-4 py-2 rounded ${filter === 'done' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
      >
        Done
      </button>
    </div>
  );
}
