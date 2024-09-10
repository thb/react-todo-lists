// FilterLink.tsx
import { useFilter } from './FilterContext';

interface FilterLinkProps {
  filter: 'all' | 'active' | 'done';
  children: React.ReactNode;
}

export function FilterLink({ filter, children }: FilterLinkProps) {
  const { filter: currentFilter, dispatchFilter } = useFilter();

  function handleClick() {
    dispatchFilter({ type: 'setFilter', filter });
  }

  if (filter === currentFilter) {
    return <span className="px-4 py-2 rounded bg-blue-500 text-white">{children}</span>;
  }

  return (
    <button
      onClick={handleClick}
      className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300"
    >
      {children}
    </button>
  );
}
