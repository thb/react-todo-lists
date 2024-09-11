import React from 'react';
import { useTaskStore } from './useTaskStore';

interface FilterLinkProps {
  filter: 'all' | 'active' | 'done';
  children: React.ReactNode;
}

export function FilterLink({ filter, children }: FilterLinkProps) {
  const currentFilter = useTaskStore((state) => state.filter);
  const setFilter = useTaskStore((state) => state.setFilter);

  const isActive = filter === currentFilter;

  // Set the active filter when clicked
  function handleClick() {
    setFilter(filter);
  }

  return (
    <button
      onClick={handleClick}
      className={`px-4 py-2 rounded ${isActive ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
    >
      {children}
    </button>
  );
}
