import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import { Page } from '../../components/Page';
import s from './OperationListScreen.module.sass';
import { useTranslation } from 'react-i18next';
import { ShortDefinitionOperationList } from '../../components/shortDefinitionOperationList/ShortDefinitionOperationList';
import cn from 'clsx';
import { createPortal } from 'react-dom';
import { AddProductionScreen } from '../../components/addProductionScreen/AddProductionScreen';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../reduxToolkit/store';
import { setOpenAddOperation } from '../../reduxToolkit/operationSlice';
import { Modal } from '../../components/Modal/Modal';
import { FilterForm } from 'src/components/Forms/FilterForm/FilterForm';
export const OperationListScreen: FC = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const openMessage = useSelector<RootState, boolean>((state) => state.operationSlice.openAddOperation);
  const isSingIn = useSelector<RootState, boolean>((state) => state.initSlice.isSignIn);

  const onClick = () => {
    dispatch(setOpenAddOperation(true));
  };
  return (
    <Page title={t`StoreScreenTitle`} className={s.root}>
      <div className={s.form_box}>
        <FilterForm />
        <div style={{ flexGrow: 1 }}>
          <div style={{ display: 'block', marginRight: '50px' }}>
            {isSingIn && <img src={require(`../../images/icons8-plus-48.png`)} onClick={onClick} />}

            {/*<button type="button" className={s.productImage__img} onClick={onClick}>*/}
            {/*  <img src={require(`../../images/icons8-plus-48.png`)} />*/}
            {/*</button>*/}
          </div>
          <div>
            <ShortDefinitionOperationList />
          </div>
        </div>
      </div>
      {openMessage && createPortal(<AddProductionScreen />, document.body)}
    </Page>
  );
};

export default OperationListScreen;
