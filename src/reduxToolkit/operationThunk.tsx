import { createAsyncThunk } from '@reduxjs/toolkit';
import { ServerErrors, Filters, Operation, NewOperation, OperationList } from './app.types';
import {
  addOperation,
  addOperations,
  deleteOperation,
  setErrors,
  setUploadPage,
  updateOperation,
} from '../reduxToolkit/operationSlice';
import { getHeader } from 'src/util/function';

interface MyKnownError {
  errorMessage: string;
  // ...
}

export const fetchDeleteOperation = createAsyncThunk<void, string, { rejectValue: MyKnownError }>(
  'operationSlice/fetchDeleteOperation',
  async (params, { rejectWithValue, dispatch }) => {
    try {
      const requestOptions = {
        method: 'DELETE',
        headers: getHeader(),
      };
      fetch('http://19429ba06ff2.vps.myjino.ru/api/operations/' + params, requestOptions)
        .then(async (response) => {
          // check for error response
          if (response.ok) {
            dispatch(deleteOperation(params));
          }
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

export const fetchGetOperation = createAsyncThunk<void, Filters, { rejectValue: MyKnownError }>(
  'operationSlice/fetchGetOperation',
  async (params, { rejectWithValue, dispatch }) => {
    try {
      const requestOptions = {
        method: 'GET',
        headers: getHeader(),
      };
      console.log(JSON.stringify(params));

      fetch(
        'http://19429ba06ff2.vps.myjino.ru/api/operations?' +
          new URLSearchParams({
            pagination: JSON.stringify(params.pagination),
            sorting: JSON.stringify(params.sorting),
            type: JSON.stringify(params.type),
            date: JSON.stringify(params.date),
          }).toString(),
        requestOptions
      )
        .then(async (response) => {
          if (response.ok) {
            const operations = (await response.json()) as OperationList;

            dispatch(
              setUploadPage({
                uploadPage: params.pagination.pageNumber,
                allUploaded: operations.data.length < params.pagination.pageSize,
              })
            );
            dispatch(addOperations(operations.data));
          }
          // check for error response
          if (!response.ok) {
            const error: ServerErrors = (await response.json()) as ServerErrors;
            dispatch(setErrors(error.errors.map((e) => e.message)));
          }
        })
        .catch((error) => {
          console.log(error);
          dispatch(setErrors([error]));
        });

      return '';
    } catch (error) {
      console.log(error.message);
      return error.message;
    }
  }
);

export const fetchAddOperation = createAsyncThunk<void, NewOperation, { rejectValue: MyKnownError }>(
  'operationSlice/fetchAddOperation',
  async (params, { rejectWithValue, dispatch }) => {
    try {
      const requestOptions = {
        method: 'POST',
        headers: getHeader(),
        body: JSON.stringify(params),
      };
      fetch('http://19429ba06ff2.vps.myjino.ru/api/operations', requestOptions)
        .then(async (response) => {
          if (response.ok) {
            const operation: Operation = (await response.json()) as Operation;

            dispatch(addOperation(operation));
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

export const fetchUpdateOperation = createAsyncThunk<void, NewOperation, { rejectValue: MyKnownError }>(
  'operationSlice/fetchUpdateOperation',
  async (params, { rejectWithValue, dispatch }) => {
    try {
      const newOperation: NewOperation = {
        name: params.name,
        desc: params.desc,
        date: params.date,
        amount: params.amount,
        type: params.type,
        categoryId: params.categoryId,
      };
      const requestOptions = {
        method: 'PUT',
        headers: getHeader(),
        body: JSON.stringify(params),
      };
      fetch('http://19429ba06ff2.vps.myjino.ru/api/operations/' + params.id, requestOptions)
        .then(async (response) => {
          if (response.ok) {
            const operation: Operation = (await response.json()) as Operation;

            dispatch(updateOperation(operation));
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
