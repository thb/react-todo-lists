import create from 'zustand';

interface FilterStore {
  filter: 'all' | 'active' | 'done';
  setFilter: (filter: 'all' | 'active' | 'done') => void;
}

// Zustand store for filter state
export const useFilterStore = create<FilterStore>((set) => ({
  filter: 'all', // Initial state
  setFilter: (filter) => set({ filter }), // Action to set the filter
}));
