import React, { FC, useEffect } from 'react';
import s from './CategoryList.module.sass';
import { Category, Operation } from '../../reduxToolkit/app.types';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../reduxToolkit/store';
// eslint-disable-next-line import/named
import { ThunkDispatch } from 'redux-thunk';
// eslint-disable-next-line import/named
import { AnyAction } from '@reduxjs/toolkit';
import { fetchGetCategories } from '../../reduxToolkit/categoryThunk';
import CategoryItem from '../CategoryItem/CategoryItem';

export const CategoryList: FC = () => {
  type AppDispatch = ThunkDispatch<Operation, any, AnyAction>;
  const dispatch: AppDispatch = useDispatch();
  const categories = useSelector<RootState, Category[]>((state) => state.categorySlice.categories);
  const allUploaded = useSelector<RootState, boolean>((state) => state.categorySlice.allUploaded);

  useEffect(() => {
    if (!allUploaded) {
      dispatch(fetchGetCategories());
    }
  }, []);
  const categoryList = categories.map((item) => {
    // console.log(item);
    return (
      // eslint-disable-next-line react/jsx-key
      <div className={s.definition_product_list__div} key={item.id} id={item.id}>
        <CategoryItem category={item} />
      </div>
    );
  });
  return <div className={s.definition_product_list}>{categoryList}</div>;
};
