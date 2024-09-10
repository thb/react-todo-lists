import { useReducer } from "react";
import { filterReducer } from "./reducers/filterReducer";
import { FilterContext } from "./FilterContext";

// FilterProvider component to provide the context to children
export function FilterProvider({ children }: { children: React.ReactNode }) {
  const [filter, dispatchFilter] = useReducer(filterReducer, 'all');

  return (
    <FilterContext.Provider value={{ filter, dispatchFilter }}>
      {children}
    </FilterContext.Provider>
  );
}