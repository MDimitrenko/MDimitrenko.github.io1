import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  SignUpBody,
  AuthResult,
  ServerErrors,
  SignInBody,
  Profile,
  UpdateProfileBody,
  ChangePasswordBody,
  ChangePasswordResult,
} from './app.types';
import { setAuth, setProfile } from '../reduxToolkit/initSlice';
import { setMessageErrors } from '../reduxToolkit/messageSlice';
import { getHeader } from '../util/function';
import { clearOperations } from '../reduxToolkit/operationSlice';
import { clearCategories } from '../reduxToolkit/categorySlice';
import { clearFilter } from '../reduxToolkit/filterSlice';

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
        dispatch(
          setMessageErrors({
            caption: 'Ошибка регистрации',
            errors: error,
            messageType: 'Error',
          })
        );
      }
      if (response.ok) {
        const data = await response.json();
        const authResult: AuthResult = JSON.parse(data);
        dispatch(setAuth(data.token));
        dispatch(clearOperations());
        dispatch(clearCategories());
        dispatch(clearFilter());
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
            dispatch(
              setMessageErrors({
                caption: 'Ошибка получения данных профиля',
                errors: error,
                messageType: 'Error',
              })
            );
          }
        })
        .catch((error) => {
          dispatch(
            setMessageErrors({
              caption: 'Ошибка получения данных профиля',
              text: error.message,
              messageType: 'Error',
            })
          );
        });
    } catch (error) {
      dispatch(
        setMessageErrors({
          caption: 'Ошибка получения данных профиля',
          text: error.message,
          messageType: 'Error',
        })
      );
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
            dispatch(clearOperations());
            dispatch(clearCategories());
            dispatch(clearFilter());
          }
          // check for error response
          if (!response.ok) {
            const error: ServerErrors = (await response.json()) as ServerErrors;
            dispatch(
              setMessageErrors({
                caption: 'Ошибка входа',
                errors: error,
                messageType: 'Error',
              })
            );
          }
        })
        .catch((error) => {
          dispatch(
            setMessageErrors({
              caption: 'Ошибка входа',
              text: error.message,
              messageType: 'Error',
            })
          );
        });

      // return '';
    } catch (error) {
      dispatch(
        setMessageErrors({
          caption: 'Ошибка входа',
          text: error.message,
          messageType: 'Error',
        })
      );
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
            dispatch(
              setMessageErrors({
                text: 'Профиль успешно обновлен',
                messageType: 'Info',
              })
            );
          }
          // check for error response
          if (!response.ok) {
            const error: ServerErrors = (await response.json()) as ServerErrors;

            dispatch(
              setMessageErrors({
                caption: 'Ошибка обновления профиля',
                errors: error,
                messageType: 'Error',
              })
            );
          }
        })
        .catch((error) => {
          console.log('gcfghf');
          dispatch(
            setMessageErrors({
              caption: 'Ошибка обновления профиля',
              text: error.message,
              messageType: 'Error',
            })
          );
        });
    } catch (error) {
      dispatch(
        setMessageErrors({
          caption: 'Ошибка обновления профиля',
          text: error.message,
          messageType: 'Error',
        })
      );
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
            console.log(data);
            dispatch(
              setMessageErrors({
                text: 'Пароль успешно обновлен',
                messageType: 'Info',
              })
            );
            //dispatch(setProfile(data));
          }
          // check for error response
          if (!response.ok) {
            const error: ServerErrors = (await response.json()) as ServerErrors;
            dispatch(
              setMessageErrors({
                caption: 'Ошибка изменения пароля',
                errors: error,
                messageType: 'Error',
              })
            );
          }
        })
        .catch((error) => {
          dispatch(
            setMessageErrors({
              caption: 'Ошибка изменения пароля',
              text: error.message,
              messageType: 'Error',
            })
          );
        });

      return '';
    } catch (error) {
      console.log(error.message);
      return error.message;
    }
  }
);
