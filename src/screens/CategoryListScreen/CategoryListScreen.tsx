import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import { Page } from '../../components/Page';
import s from './CategoryListScreen.sass';
import { useTranslation } from 'react-i18next';
import cn from 'clsx';
import { createPortal } from 'react-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../reduxToolkit/store';
import { setOpenAddCategory } from '../../reduxToolkit/categorySlice';
import { CategoryList } from '../../components/CategoryList/CategoryList';
import { AddCategoryScreen } from '../../components/AddCategoryScreen/AddCategoryScreen';
export const CategoryListScreen: FC = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const openMessage = useSelector<RootState, boolean>((state) => state.categorySlice.openAddCategory);
  const onClick = () => {
    dispatch(setOpenAddCategory(true));
  };
  return (
    <Page title={t`CategoryScreenTitle`} className={s.root}>
      <div style={{ display: 'block', marginRight: '50px' }}>
          {/*<div className={s.plus}>fff</div>*/}
        {/*<button type="button" className={s.productImage__img} onClick={onClick}>*/}
          <img src={require(`../../images/icons8-plus-48.png`)} onClick={onClick}/>
        {/*</button>*/}
      </div>
      <div>
        <CategoryList />
      </div>
      {openMessage && createPortal(<AddCategoryScreen />, document.body)}
    </Page>
  );
};

export default CategoryListScreen;
