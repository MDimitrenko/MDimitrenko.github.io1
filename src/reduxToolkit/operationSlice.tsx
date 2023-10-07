import { createSlice } from '@reduxjs/toolkit';
import { Operation } from '../reduxToolkit/app.types';

export interface StateProps {
  operations: Operation[];
  errors: string[];
  uploadPage: number;
  allUploaded: boolean;
  openAddOperation: boolean;
  editOperation: Operation;
}
const initialState: StateProps = {
  operations: [],
  errors: [],
  uploadPage: 0,
  allUploaded: false,
  openAddOperation: false,
  editOperation: null,
};

const operationSlice = createSlice({
  name: 'operationSlice',
  initialState,
  reducers: {
    addOperations: (state = initialState, action) => {
      state.operations.push(...action.payload);
    },
    addOperation: (state = initialState, action) => {
      state.operations.push(action.payload);
      // подумать над сортировкой
    },
    updateOperation: (state = initialState, action) => {
      state.operations = state.operations.map((op) => (op.id === action.payload.id ? action.payload : op));
    },
    deleteOperation: (state = initialState, action) => {
      const index = state.operations.findIndex((op) => op.id === action.payload);
      state.operations.splice(index, 1);
    },
    setErrors: (state = initialState, action) => {
      state.errors = action.payload;
    },
    setUploadPage: (state = initialState, action) => {

      state.uploadPage = action.payload.uploadPage;
      state.allUploaded = action.payload.allUploaded;
    },
    setOpenAddOperation: (state = initialState, action) => {
      state.openAddOperation = action.payload;
      if (!action.payload) {
        state.editOperation = null;
      }
    },
    setEditOperation: (state = initialState, action) => {
      state.editOperation = action.payload;
      // подумать над сортировкой
    },
    clearOperations: (state = initialState) => {
      state.operations = [];
      state.allUploaded = false;
      state.uploadPage = 0
      // подумать над сортировкой
    },
  },
});

export const {
  addOperations,
  addOperation,
  updateOperation,
  deleteOperation,
  setErrors,
  setUploadPage,
  setOpenAddOperation,
  setEditOperation,
    clearOperations,
} = operationSlice.actions;
export default operationSlice.reducer;
