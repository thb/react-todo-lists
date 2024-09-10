import FilterLink from "./FilterLink";

type FilterBarProps = {
  onFilterChange: (filter: 'all' | 'active' | 'done') => void
  filter: 'all' | 'active' | 'done'
}

export default function FilterBar({ onFilterChange, filter }: FilterBarProps) {

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