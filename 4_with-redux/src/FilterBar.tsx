import { connect } from 'react-redux';
import { setFilter } from './actions';
import { FilterLink } from './FilterLink';
import { RootState } from './store';

function FilterBar({ currentFilter, setFilter }: { currentFilter: string; setFilter: (filter: 'all' | 'active' | 'done') => void }) {
  return (
    <div className="flex justify-center space-x-4 mb-4">
      <FilterLink filter="all" currentFilter={currentFilter} onFilterChange={setFilter}>
        All
      </FilterLink>
      <FilterLink filter="active" currentFilter={currentFilter} onFilterChange={setFilter}>
        Active
      </FilterLink>
      <FilterLink filter="done" currentFilter={currentFilter} onFilterChange={setFilter}>
        Done
      </FilterLink>
    </div>
  );
}

// Map Redux state to component props
const mapStateToProps = (state: RootState) => ({
  currentFilter: state.filter,
});

// Connect to Redux
export default connect(mapStateToProps, { setFilter })(FilterBar);
