import { createSlice } from '@reduxjs/toolkit';
import { Message } from '../reduxToolkit/app.types';

export interface StateProps {
  message: Message;
  showMessage: boolean;
}
const initialState: StateProps = {
  message: null,
  showMessage: false,
};

const messageSlice = createSlice({
  name: 'messageSlice',
  initialState,
  reducers: {
    setMessageErrors: (state = initialState, action) => {
      console.log(action.payload);
      state.message = action.payload;
      state.showMessage = true;
    },
    clearMessageErrors: (state = initialState) => {
      state.message = null;
      state.showMessage = false;
    },
  },
});

export const { setMessageErrors, clearMessageErrors } = messageSlice.actions;
export default messageSlice.reducer;
