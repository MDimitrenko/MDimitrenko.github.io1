import React from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { Operation } from '../../reduxToolkit/app.types';
// eslint-disable-next-line import/named
import { ThunkDispatch } from 'redux-thunk';
// eslint-disable-next-line import/named
import { AnyAction } from '@reduxjs/toolkit';
import { fetchDeleteOperation } from '../../reduxToolkit/operationThunk';
import { setEditOperation, setOpenAddOperation } from '../../reduxToolkit/operationSlice';

const ItemContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 8px;
  margin-bottom: 8px;
  font-family: system, -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Segoe WP', Roboto, Ubuntu, Oxygen, Cantarell,
    'Fira Sans', 'Helvetica Neue', Helvetica, 'Lucida Grande', 'Droid Sans', Tahoma, 'Microsoft Sans Serif', sans-serif;
`;

const ItemImage = styled.img`
  width: 80px;
  height: 80px;
  border-radius: 8px;
  margin-right: 16px;
  object-fit: cover;
`;

const ItemContent = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
`;

const ItemHeader = styled.div`
  font-weight: bold;
  margin-bottom: 8px;
`;

const ItemDescription = styled.div`
  color: #888;
  margin-bottom: 8px;
`;

const ItemFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
`;

const ItemPrice = styled.span`
  font-weight: bold;
  margin-left: auto;
`;

const DeleteButton = styled.button`
  background-color: transparent;
  border: none;
  color: red;
  cursor: pointer;
  margin-top: 8px;
`;

interface CartItemProps {
  operation: Operation;
}

const CartItem: React.FC<CartItemProps> = ({ operation }) => {
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
  // console.log(operation);
  // console.log(isoFormatDate);

  const stringDate = isoFormatDate
    ? ('0' + (isoFormatDate.getDate()+1)).slice(-2) +
      '-' +
      ('0' + (isoFormatDate.getMonth()+1)).slice(-2) +
      '-' +
      isoFormatDate.getFullYear() +
      ' ' +
      ('0' + isoFormatDate.getHours()).slice(-2) +
      ':' +
      ('0' + isoFormatDate.getMinutes()).slice(-2)
    : null
  // console.log(stringDate)
  return (
    <ItemContainer>
      <ItemImage
        src={operation.category.photo || require(`../../images/icons8-wallet.png`)}
        title={operation.category.name}
      />
      <ItemContent>
        <ItemHeader>
          {operation.type === 'Cost' ? '-' : '+'} {operation.amount} р, {operation.name}
        </ItemHeader>
        {/*<ItemHeader>{stringDate}</ItemHeader>*/}
        <ItemFooter>
          <div>
            {stringDate}
            <ItemDescription>{operation.desc}</ItemDescription>
            {/*<ItemPrice>${price}</ItemPrice>*/}
          </div>
          <div>
            <img src={require(`../../images/free-icon-edit.png`)} onClick={onEdit} />
            <img src={require(`../../images/free-icon-dustbin.png`)} onClick={onDelete} />
          </div>
        </ItemFooter>
      </ItemContent>
    </ItemContainer>
  );
};

export default CartItem;
