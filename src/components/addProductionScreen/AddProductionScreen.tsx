import React, { FC, useState } from 'react';
import { AddOperationForm } from '../Forms/addOperationForm/AddOperationForm';
import { Modal } from '../Modal/Modal';

export type AddProductionScreenProps = {
  onClickEvent: React.MouseEventHandler<HTMLButtonElement>;
};
// eslint-disable-next-line react/prop-types
export const AddProductionScreen: FC = () => {
  return (
    <>
      <Modal>
        <AddOperationForm />
      </Modal>
    </>
  );
};
