import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setFilter } from './slices/filterSlice'; // Import the setFilter action
import { RootState } from './store'; // Import RootState type

interface FilterLinkProps {
  filter: 'all' | 'active' | 'done';
  children: React.ReactNode;
}

export function FilterLink({ filter, children }: FilterLinkProps) {
  const dispatch = useDispatch();
  const currentFilter = useSelector((state: RootState) => state.filter); // Get the current filter from Redux

  const isActive = currentFilter === filter; // Check if the link is active

  const handleClick = () => {
    dispatch(setFilter(filter)); // Set the selected filter
  };

  return (
    <button
      onClick={handleClick}
      className={`px-4 py-2 rounded ${isActive ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
    >
      {children}
    </button>
  );
}
