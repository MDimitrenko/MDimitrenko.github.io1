import { createSlice } from '@reduxjs/toolkit';
import { Category } from '../reduxToolkit/app.types';

export interface StateProps {
  categories: Category[];
  errors: string[];
  openAddCategory: boolean;
  allUploaded: boolean;
  editCategory: Category;
}
const initialState: StateProps = {
  categories: [],
  errors: [],
  openAddCategory: false,
  allUploaded: false,
  editCategory: null,
};

const operationSlice = createSlice({
  name: 'operationSlice',
  initialState,
  reducers: {
    setCategories: (state = initialState, action) => {
      state.categories = action.payload;
      state.allUploaded = true;
    },
    setErrors: (state = initialState, action) => {
      state.errors = action.payload;
    },
    deleteCategory: (state = initialState, action) => {
      const index = state.categories.findIndex((op) => op.id === action.payload);
      state.categories.splice(index, 1);
    },
    setOpenAddCategory: (state = initialState, action) => {
      state.openAddCategory = action.payload;
      if (!action.payload) {
        state.editCategory = null;
      }
    },
    setEditCategory: (state = initialState, action) => {
      state.editCategory = action.payload;
      // подумать над сортировкой
    },
    addCategory: (state = initialState, action) => {
      state.categories.push(action.payload);
      // подумать над сортировкой
    },
    changeCategory: (state = initialState, action) => {
      const index = state.categories.findIndex((op) => op.id === action.payload.id);
      state.categories[index] = action.payload;
    },
  },
});

export const {
  setCategories,
  setErrors,
  deleteCategory,
  setOpenAddCategory,
  addCategory,
  setEditCategory,
  changeCategory,
} = operationSlice.actions;
export default operationSlice.reducer;
