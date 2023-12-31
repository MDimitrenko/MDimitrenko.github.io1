import { configureStore } from '@reduxjs/toolkit';
import initSlice from './initSlice';
import thunkMiddleware from 'redux-thunk';
import operationSlice from './operationSlice';
import categorySlice from './categorySlice';
import filterSlice from './filterSlice';
import messageSlise from './messageSlice';

export const store = configureStore({
  reducer: {
    initSlice,
    operationSlice,
    categorySlice,
    filterSlice,
    messageSlise,
  },
  middleware: [thunkMiddleware],
});

export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
