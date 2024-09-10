import React, { createContext, useContext } from 'react';

// Filter context type
interface FilterContextType {
  filter: 'all' | 'active' | 'done';
  dispatchFilter: React.Dispatch<{ type: 'setFilter'; filter: 'all' | 'active' | 'done' }>;
}

// Create the context
export const FilterContext = createContext<FilterContextType | undefined>(undefined);

// Custom hook to use the FilterContext
export function useFilter() {
  const context = useContext(FilterContext);
  if (!context) {
    throw new Error('useFilter must be used within a FilterProvider');
  }
  return context;
}