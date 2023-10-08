import { createAsyncThunk } from '@reduxjs/toolkit';
import {
    SignUpBody,
    AuthResult,
    ServerErrors,
    SignInBody,
    Profile,
    UpdateProfileBody,
    ChangePasswordBody, ChangePasswordResult
} from './app.types';
import { setAuth, setErrors, setProfile } from '../reduxToolkit/initSlice';
import { getHeader } from 'src/util/function';

interface MyKnownError {
  errorMessage: string;
  // ...
}

export const fetchSignup = createAsyncThunk<void, SignUpBody, { rejectValue: MyKnownError }>(
  'initSlice/fetchSignup',
  async (params, { rejectWithValue, dispatch }) => {
    try {
      const response = await fetch('http://19429ba06ff2.vps.myjino.ru/api/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(params),
      });
      if (!response.ok) {
        const error: ServerErrors = (await response.json()) as ServerErrors;
        dispatch(setErrors(error.errors.map((e) => e.message)));
      }
      if (response.ok) {
        const data = await response.json();
        const authResult: AuthResult = JSON.parse(data);
        setAuth(data.token);
      }
      return '';
      // 👇️ const result: GetUsersResponse
    } catch (error) {
      console.log(error.message);
      return error.message;
    }
  }
);

export const fetchGetProfile = createAsyncThunk<void, void, { rejectValue: MyKnownError }>(
  'initSlice/fetchGetProfile',
  async (params, { rejectWithValue, dispatch }) => {
    try {
      const requestOptions = {
        method: 'GET',
        headers: getHeader(),
      };
      fetch('http://19429ba06ff2.vps.myjino.ru/api/profile', requestOptions)
        .then(async (response) => {
          if (response.ok) {
            const data = (await response.json()) as Profile;
            dispatch(setProfile(data));
          }
          // check for error response
          if (!response.ok) {
            const error: ServerErrors = (await response.json()) as ServerErrors;
            dispatch(setErrors(error.errors.map((e) => e.message)));
          }
        })
        .catch((error) => {
          dispatch(setErrors([error]));
        });

      return '';
    } catch (error) {
      console.log(error.message);
      return error.message;
    }
  }
);

export const fetchSignin = createAsyncThunk<void, SignInBody, { rejectValue: MyKnownError }>(
  'initSlice/fetchSignup',
  async (params, { rejectWithValue, dispatch }) => {
    try {
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(params),
      };
      fetch('http://19429ba06ff2.vps.myjino.ru/api/signin', requestOptions)
        .then(async (response) => {
          if (response.ok) {
            const data = (await response.json()) as AuthResult;
            dispatch(setAuth(data.token));
          }
          // check for error response
          if (!response.ok) {
            const error: ServerErrors = (await response.json()) as ServerErrors;
            dispatch(setErrors(error.errors.map((e) => e.message)));
          }
        })
        .catch((error) => {
          dispatch(setErrors([error]));
        });

      return '';
    } catch (error) {
      console.log(error.message);
      return error.message;
    }
  }
);

export const fetchChangeProfile = createAsyncThunk<void, UpdateProfileBody, { rejectValue: MyKnownError }>(
  'initSlice/fetchChangeProfile',
  async (params, { rejectWithValue, dispatch }) => {
    try {
      const requestOptions = {
        method: 'POST',
        headers: getHeader(),
        body: JSON.stringify(params),
      };
      fetch('http://19429ba06ff2.vps.myjino.ru/api/profile', requestOptions)
        .then(async (response) => {
          if (response.ok) {
            const data = (await response.json()) as Profile;
            dispatch(setProfile(data));
          }
          // check for error response
          if (!response.ok) {
            const error: ServerErrors = (await response.json()) as ServerErrors;
            dispatch(setErrors(error.errors.map((e) => e.message)));
          }
        })
        .catch((error) => {
          dispatch(setErrors([error]));
        });

      return '';
    } catch (error) {
      console.log(error.message);
      return error.message;
    }
  }
);

export const fetchChangePasswordProfile = createAsyncThunk<void, ChangePasswordBody, { rejectValue: MyKnownError }>(
  'initSlice/fetchChangePasswordProfile',
  async (params, { rejectWithValue, dispatch }) => {
    try {
      const requestOptions = {
        method: 'POST',
        headers: getHeader(),
        body: JSON.stringify(params),
      };
      fetch('http://19429ba06ff2.vps.myjino.ru/api/profile/change-password', requestOptions)
        .then(async (response) => {
          if (response.ok) {
            const data = (await response.json()) as ChangePasswordResult;
              console.log(data)
            //dispatch(setProfile(data));
          }
          // check for error response
          if (!response.ok) {
            const error: ServerErrors = (await response.json()) as ServerErrors;
            dispatch(setErrors(error.errors.map((e) => e.message)));
          }
        })
        .catch((error) => {
          dispatch(setErrors([error]));
        });

      return '';
    } catch (error) {
      console.log(error.message);
      return error.message;
    }
  }
);
