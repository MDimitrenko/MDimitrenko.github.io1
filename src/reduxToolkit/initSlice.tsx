import { createSlice } from '@reduxjs/toolkit';
import { Profile } from '../reduxToolkit/app.types';

export interface StateProps {
  isSignIn: boolean;
  profile: Profile;
  errors: string[];
  editProfile: boolean;
  editPassword: boolean;
}
const initialState: StateProps = {
  isSignIn: false,
  profile: {
    name: null,
    email: null,
    id: null,
    signUpDate: null,
  },
  errors: [],
  editProfile: false,
  editPassword: false,
};

const initSlice = createSlice({
  name: 'initSlice',
  initialState,
  reducers: {
    setAuth: (state = initialState, action) => {
      localStorage.setItem('accessToken', action.payload);
      state.isSignIn = true;
      console.log(state.isSignIn);
    },
    clearToken: (state = initialState) => {
      localStorage.removeItem('accessToken');
      state.profile = null;
      state.isSignIn = false;
    },
    setProfile: (state = initialState, action) => {
      state.profile = action.payload;
    },
    changeProfile: (state = initialState, action) => {
      state.profile = action.payload;
    },
    setErrors: (state = initialState, action) => {
      state.errors = action.payload;
    },
    setEditPassword: (state = initialState, action) => {
      state.editPassword = action.payload;
    },
    setEditProfile: (state = initialState, action) => {
      state.editProfile = action.payload;
    },
  },
});

export const { clearToken, setProfile, changeProfile, setErrors, setAuth } = initSlice.actions;
export default initSlice.reducer;
