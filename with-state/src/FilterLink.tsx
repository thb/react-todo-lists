interface FilterLinkProps {
  filter: 'all' | 'active' | 'done';
  currentFilter: 'all' | 'active' | 'done';
  onFilterChange: (filter: 'all' | 'active' | 'done') => void;
  children: React.ReactNode;
}

export default function FilterLink({ filter, currentFilter, onFilterChange, children }: FilterLinkProps) {
  if (filter === currentFilter) {
    // If the filter is active, just display the text (no button)
    return <span className="px-4 py-2 rounded bg-blue-500 text-white">{children}</span>;
  }

  // If the filter is not active, make it a clickable button
  return (
    <button
      onClick={() => onFilterChange(filter)}
      className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300"
    >
      {children}
    </button>
  );
}