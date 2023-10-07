import { createAsyncThunk } from '@reduxjs/toolkit';
import { ServerErrors, Category, NewCategory, CategoryList, UploadFile } from './app.types';
import {addCategory, setErrors, deleteCategory, setCategories, changeCategory} from '../reduxToolkit/categorySlice';
import { getAuthHeader, getHeader } from 'src/util/function';

// eslint-disable-next-line import/named
import { Dispatch } from 'redux';

interface MyKnownError {
  errorMessage: string;
  // ...
}

export const fetchDeleteCategory = createAsyncThunk<void, string, { rejectValue: MyKnownError }>(
  'categorySlice/fetchDeleteCategory',
  async (params, { rejectWithValue, dispatch }) => {
    try {
      const requestOptions = {
        method: 'DELETE',
        headers: getHeader(),
      };
      fetch('http://19429ba06ff2.vps.myjino.ru/api/categories/' + params, requestOptions)
        .then(async (response) => {
          if (response.ok) {
            dispatch(deleteCategory(params));
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

export const fetchGetCategories = createAsyncThunk<void, void, { rejectValue: MyKnownError }>(
  'categorySlice/fetchGetCategories',
  async (params, { rejectWithValue, dispatch }) => {
    try {
      const requestOptions = {
        method: 'GET',
        headers: getHeader(),
        body: JSON.stringify(params),
      };
      fetch('http://19429ba06ff2.vps.myjino.ru/api/categories', requestOptions)
        .then(async (response) => {
          if (response.ok) {
            const categories: CategoryList = (await response.json()) as CategoryList;
            dispatch(setCategories(categories.data));
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

export const fetchAddCategoryWithImage = createAsyncThunk<void, NewCategory, { rejectValue: MyKnownError }>(
  'operationSlice/fetchAddOperation',
  async (params, { rejectWithValue, dispatch }) => {
    try {
      if (params.file) {
        fetchUpload(params.file, params.categoryName, dispatch);
      } else {
        fetchAddCategory(params.categoryName, null, dispatch);
      }
    } catch (error) {
      console.log(error.message);
      return error.message;
    }
  }
);

export const fetchChangeCategoryWithImage = createAsyncThunk<void, NewCategory, { rejectValue: MyKnownError }>(
  'operationSlice/fetchChangeCategoryWithImage',
  async (params, { rejectWithValue, dispatch }) => {
    try {
      if (params.file) {
        fetchChangeUpload(params, dispatch);
      } else {
        fetchChangeCategory(params, dispatch);
      }
    } catch (error) {
      console.log(error.message);
      return error.message;
    }
  }
);
const fetchUpload = (file: File, categoryName: string, dispatch: Dispatch) => {
  const fileBody = new FormData();
  fileBody.append('file', file);
  const requestOptions = {
    method: 'POST',
    headers: getAuthHeader(),
    body: fileBody,
  };
  fetch('http://19429ba06ff2.vps.myjino.ru/api/upload', requestOptions)
    .then(async (response) => {
      if (response.ok) {
        const uploadFile: UploadFile = (await response.json()) as UploadFile;
        fetchAddCategory(categoryName, uploadFile.url, dispatch);
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
};

const fetchChangeUpload = (newCategory: NewCategory, dispatch: Dispatch) => {
  const fileBody = new FormData();
  fileBody.append('file', newCategory.file);
  const requestOptions = {
    method: 'POST',
    headers: getAuthHeader(),
    body: fileBody,
  };
  fetch('http://19429ba06ff2.vps.myjino.ru/api/upload', requestOptions)
    .then(async (response) => {
      if (response.ok) {
        const uploadFile: UploadFile = (await response.json()) as UploadFile;
        newCategory.url = uploadFile.url;
        fetchChangeCategory(newCategory, dispatch);
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
};
const fetchChangeCategory = (newCategory: NewCategory, dispatch: Dispatch) => {
  const requestOptions = {
    method: 'PUT',
    headers: getHeader(),
    body: JSON.stringify({
      name: newCategory.categoryName,
      photo: newCategory.url,
    }),
  };
  fetch('http://19429ba06ff2.vps.myjino.ru/api/categories/' + newCategory.id, requestOptions)
    .then(async (response) => {
      if (response.ok) {
        const category: Category = (await response.json()) as Category;
        dispatch(changeCategory(category));
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
};
const fetchAddCategory = (categoryName: string, url: string, dispatch: Dispatch) => {
  const requestOptions = {
    method: 'POST',
    headers: getHeader(),
    body: JSON.stringify({
      name: categoryName,
      photo: url,
    }),
  };
  fetch('http://19429ba06ff2.vps.myjino.ru/api/categories', requestOptions)
    .then(async (response) => {
      if (response.ok) {
        const category: Category = (await response.json()) as Category;
        dispatch(addCategory(category));
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
};
// export const fetchUpdateOperation = createAsyncThunk<void, Operation, { rejectValue: MyKnownError }>(
//   'operationSlice/fetchUpdateOperation',
//   async (params, { rejectWithValue, dispatch }) => {
//     try {
//       const newOperation: NewOperation = {
//         name: params.name,
//         desc: params.desc,
//         amount: params.amount,
//         type: params.type,
//         categoryId: params.category.id,
//       };
//       const requestOptions = {
//         method: 'POST',
//         // headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(params),
//       };
//       fetch('http://19429ba06ff2.vps.myjino.ru/api/operations/' + params.id, requestOptions)
//         .then(async (response) => {
//           if (response.ok) {
//             const data = await response.json();
//             const operation: Operation = JSON.parse(data);
//             dispatch(updateOperation(operation));
//           }
//           // check for error response
//           if (!response.ok) {
//             const data = await response.json();
//             const error: ServerErrors = JSON.parse(data);
//             dispatch(setErrors(error.errors.map((e) => e.message)));
//           }
//         })
//         .catch((error) => {
//           dispatch(setErrors([error]));
//         });
//
//       return '';
//     } catch (error) {
//       console.log(error.message);
//       return error.message;
//     }
//   }
// );
