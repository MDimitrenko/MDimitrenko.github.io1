import React from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { Category, Operation } from '../../reduxToolkit/app.types';
// eslint-disable-next-line import/named
import { ThunkDispatch } from 'redux-thunk';
// eslint-disable-next-line import/named
import { AnyAction } from '@reduxjs/toolkit';
import { fetchDeleteOperation } from '../../reduxToolkit/operationThunk';
import { fetchDeleteCategory } from 'src/reduxToolkit/categoryThunk';
import { setEditCategory, setOpenAddCategory } from 'src/reduxToolkit/categorySlice';
import { Image } from 'src/components/Image/Image';

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

interface CategoryItemProps {
  category: Category;
}

const CategoryItem: React.FC<CategoryItemProps> = ({ category }) => {
  type AppDispatch = ThunkDispatch<string, any, AnyAction>;
  const dispatch: AppDispatch = useDispatch();
  const onDelete = () => {
    dispatch(fetchDeleteCategory(category.id));
  };
  const onEdit = () => {
    dispatch(setEditCategory(category));
    dispatch(setOpenAddCategory(true));
  };
  return (
    <ItemContainer>
      <ItemContent>
        <ItemHeader>{category.name}</ItemHeader>
        <ItemFooter>
          <img src={category.photo} width="80px" />
          <div>
            <Image fileName="edit" onClick={onEdit} />
            <Image fileName="delete" onClick={onDelete} />
          </div>
        </ItemFooter>
      </ItemContent>
    </ItemContainer>
  );
};

export default CategoryItem;
