import { useSelector, useDispatch } from 'react-redux';
import { setFilter } from './slices/filterSlice';
import { selectFilter } from './selectors';
import FilterLink from './FilterLink';

export default function FilterBar() {
  const dispatch = useDispatch();

  // Only one subscription to Redux store to get the current filter
  const currentFilter = useSelector(selectFilter);

  return (
    <div className="flex justify-center space-x-4 mb-4">
      <FilterLink filter="all" currentFilter={currentFilter} onFilterChange={(filter) => dispatch(setFilter(filter))}>
        All
      </FilterLink>
      <FilterLink filter="active" currentFilter={currentFilter} onFilterChange={(filter) => dispatch(setFilter(filter))}>
        Active
      </FilterLink>
      <FilterLink filter="done" currentFilter={currentFilter} onFilterChange={(filter) => dispatch(setFilter(filter))}>
        Done
      </FilterLink>
    </div>
  );
}
