import { FilterLink } from "./FilterLink";

export default function FilterBar({ filter, onFilterChange }: { filter: 'all' | 'active' | 'done'; onFilterChange: (filter: 'all' | 'active' | 'done') => void }) {
  return (
    <div className="flex justify-center space-x-4 mb-4">
      <FilterLink filter="all" currentFilter={filter} onFilterChange={onFilterChange}>
        All
      </FilterLink>
      <FilterLink filter="active" currentFilter={filter} onFilterChange={onFilterChange}>
        Active
      </FilterLink>
      <FilterLink filter="done" currentFilter={filter} onFilterChange={onFilterChange}>
        Done
      </FilterLink>
    </div>
  );
}