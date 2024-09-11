import { FilterAction } from '../types';

// Define initial state for filter
const initialState: 'all' | 'active' | 'done' = 'all';

// Filter reducer with action types
export default function filterReducer(state = initialState, action: FilterAction): string {
  switch (action.type) {
    case 'SET_FILTER':
      return action.filter;
    default:
      return state;
  }
}
