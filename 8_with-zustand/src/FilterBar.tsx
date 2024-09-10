import { FilterLink } from './FilterLink';

export default function FilterBar() {
  return (
    <div className="flex justify-center space-x-4 mb-4">
      <FilterLink filter="all">All</FilterLink>
      <FilterLink filter="active">Active</FilterLink>
      <FilterLink filter="done">Done</FilterLink>
    </div>
  );
}
