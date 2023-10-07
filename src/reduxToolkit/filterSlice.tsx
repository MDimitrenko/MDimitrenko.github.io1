import { createSlice } from '@reduxjs/toolkit';
import { Filters } from '../reduxToolkit/app.types';

export interface StateProps {
  filter: Filters;
}
const initialState: StateProps = {
  filter: {
    pagination: {
      pageSize: 20,
      pageNumber: 1,
    },
    sorting: {
      type: 'ASC',
      field: 'createdAt',
    },
    type: null,
    date: {
      gte: null,
      lte: null,
    },
  },
};

const filterSlice = createSlice({
  name: 'filterSlice',
  initialState,
  reducers: {
    setFilter: (state = initialState, action) => {
      state.filter = action.payload;
      console.log(action.payload);
    },
    clearFilter: (state = initialState) => {
      state.filter = {
        pagination: {
          pageSize: 20,
          pageNumber: 1,
        },
        sorting: {
          type: 'ASC',
          field: 'createdAt',
        },
      };
    },
  },
});

export const { clearFilter, setFilter } = filterSlice.actions;
export default filterSlice.reducer;
