import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const filterSlice = createSlice({
  name: 'filter',
  initialState: 'all' as 'all' | 'active' | 'done',
  reducers: {
    setFilter(state, action: PayloadAction<'all' | 'active' | 'done'>) {
      return action.payload;
    },
  },
});

export const { setFilter } = filterSlice.actions;

export default filterSlice.reducer;
