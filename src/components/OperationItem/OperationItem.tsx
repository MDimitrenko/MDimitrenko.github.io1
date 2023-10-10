import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Operation } from '../../reduxToolkit/app.types';
// eslint-disable-next-line import/named
import { ThunkDispatch } from 'redux-thunk';
// eslint-disable-next-line import/named
import { AnyAction } from '@reduxjs/toolkit';
import { fetchDeleteOperation } from '../../reduxToolkit/operationThunk';
import { setEditOperation, setOpenAddOperation } from '../../reduxToolkit/operationSlice';
import { RootState } from 'src/reduxToolkit/store';
import { Image } from 'src/components/Image/Image';
import { useTheme } from 'src/components/theme/Theme';
import style from './OperationItem.module.sass';

interface CartItemProps {
  operation: Operation;
}

const OperationItem: React.FC<CartItemProps> = ({ operation }) => {
  const isSingIn = useSelector<RootState, boolean>((state) => state.initSlice.isSignIn);

  type AppDispatch = ThunkDispatch<string, any, AnyAction>;
  const dispatch: AppDispatch = useDispatch();
  const onDelete = () => {
    dispatch(fetchDeleteOperation(operation.id));
  };
  const onEdit = () => {
    dispatch(setEditOperation(operation));
    dispatch(setOpenAddOperation(true));
  };
  const isoFormatDate = operation.date ? new Date(Date.parse(operation.date)) : null;

  const stringDate = isoFormatDate
    ? ('0' + (isoFormatDate.getDate() + 1)).slice(-2) +
      '-' +
      ('0' + (isoFormatDate.getMonth() + 1)).slice(-2) +
      '-' +
      isoFormatDate.getFullYear() +
      ' ' +
      ('0' + isoFormatDate.getHours()).slice(-2) +
      ':' +
      ('0' + isoFormatDate.getMinutes()).slice(-2)
    : null;
  const theme = useTheme();
  return (
    <div className={style.container}>
      <img
        className={style.itemImage}
        src={operation.category?.photo || require(`../../images/wallet-${theme.theme}.png`)}
        title={operation.category?.name}
      />
      <div className={style.content}>
        <div className={style.header}>
          {operation.type === 'Cost' ? '-' : '+'} {operation.amount} р, {operation.name}
        </div>
        <div className={style.footer}>
          <div>
            {stringDate}
            <div className={style.description}>{operation.desc}</div>
          </div>
          {isSingIn && (
            <div>
              <Image fileName="edit" onClick={onEdit} />
              <Image fileName="delete" onClick={onDelete} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OperationItem;
