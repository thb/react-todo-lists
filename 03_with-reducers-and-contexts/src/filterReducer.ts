import { FilterAction } from "./types";

export function filterReducer(state: 'all' | 'active' | 'done', action: FilterAction) {
  switch (action.type) {
    case 'setFilter': {
      return action.filter;
    }
    default: {
      throw new Error(`Unknown action: ${action.type}`);
    }
  }
}
