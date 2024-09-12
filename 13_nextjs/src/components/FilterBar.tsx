import Link from 'next/link';

export default function FilterBar({ currentFilter }: { currentFilter: string }) {
  return (
    <div className="flex justify-center space-x-4 mb-4">
      <Link
        href="/tasks?filter=all"
        className={`px-4 py-2 rounded ${currentFilter === 'all' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
      >
        All
      </Link>
      <Link
        href="/tasks?filter=active"
        className={`px-4 py-2 rounded ${currentFilter === 'active' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
      >
        Active
      </Link>
      <Link
        href="/tasks?filter=done"
        className={`px-4 py-2 rounded ${currentFilter === 'done' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
      >
        Done
      </Link>
    </div>
  );
}
