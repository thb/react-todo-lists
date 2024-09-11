import React from 'react';
import { connect } from 'react-redux';
import { setFilter } from './actions';
import { RootState } from './store';

interface FilterLinkProps {
  filter: 'all' | 'active' | 'done';
  currentFilter: string;
  setFilter: (filter: 'all' | 'active' | 'done') => void;
  children: React.ReactNode;
}

function FilterLink({ filter, currentFilter, setFilter, children }: FilterLinkProps) {
  // If the current filter matches the filter for this link, display it as active
  if (filter === currentFilter) {
    return <span className="px-4 py-2 rounded bg-blue-500 text-white">{children}</span>;
  }

  return (
    <button
      onClick={() => setFilter(filter)}
      className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300"
    >
      {children}
    </button>
  );
}

// Map state from Redux to the currentFilter prop
const mapStateToProps = (state: RootState) => ({
  currentFilter: state.filter,
});

// Map dispatch to props
const mapDispatchToProps = {
  setFilter,
};

// Connect to Redux
export default connect(mapStateToProps, mapDispatchToProps)(FilterLink);
