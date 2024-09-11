import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type FilterState = 'all' | 'active' | 'done';

const filterSlice = createSlice({
  name: 'filter',
  initialState: 'all',
  reducers: {
    setFilter(state, action: PayloadAction<FilterState>) {
      return action.payload;
    },
  },
});

export const { setFilter } = filterSlice.actions;

export default filterSlice.reducer;
