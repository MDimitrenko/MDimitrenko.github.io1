import React, { FC } from 'react';
import { Modal } from '../Modal/Modal';
import { AddCategoryForm } from '../../components/Forms/addCategoryForm/AddCategoryForm';

export type AddProductionScreenProps = {
  onClickEvent: React.MouseEventHandler<HTMLButtonElement>;
};
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
