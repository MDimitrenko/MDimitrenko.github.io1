import React, { FC } from 'react';
import { Modal } from '../Modal/Modal';
import { AddCategoryForm } from '../../components/Forms/addCategoryForm/AddCategoryForm';

// eslint-disable-next-line react/prop-types
export const AddCategoryScreen: FC = () => {
  return (
    <>
      <Modal>
        <AddCategoryForm />
      </Modal>
    </>
  );
};
