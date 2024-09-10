interface FilterLinkProps {
  filter: 'all' | 'active' | 'done';
  currentFilter: string;
  onFilterChange: (filter: 'all' | 'active' | 'done') => void;
  children: React.ReactNode;
}

export default function FilterLink({ filter, currentFilter, onFilterChange, children }: FilterLinkProps) {
  // Render based on the current filter passed from parent
  if (filter === currentFilter) {
    return <span className="px-4 py-2 rounded bg-blue-500 text-white">{children}</span>;
  }

  return (
    <button
      onClick={() => onFilterChange(filter)}
      className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300"
    >
      {children}
    </button>
  );
}
