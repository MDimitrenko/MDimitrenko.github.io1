import React, { FC, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import './AddCategoryForm.css';

import { useTranslation } from 'react-i18next';
import { Category, NewCategory, Operation } from '../../../reduxToolkit/app.types';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../reduxToolkit/store';
import { Modal } from '../../../components/Modal/Modal';
import { setOpenAddCategory } from '../../../reduxToolkit/categorySlice';
import { fetchAddCategoryWithImage, fetchChangeCategoryWithImage } from '../../../reduxToolkit/categoryThunk';
// eslint-disable-next-line import/named
import { ThunkDispatch } from 'redux-thunk';
// eslint-disable-next-line import/named
import { AnyAction } from '@reduxjs/toolkit';
// interface AddCategoryFormProps {
//   category?: Category;
// }
// eslint-disable-next-line react/prop-types
export const AddCategoryForm: FC = () => {
  type AppDispatch = ThunkDispatch<Operation, any, AnyAction>;
  const category = useSelector<RootState, Category>((state) => state.categorySlice.editCategory);

  const dispatch: AppDispatch = useDispatch();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    mode: 'onBlur',
    defaultValues: {
      name: category ? category.name : undefined,

      // createdAt: createdAt,
      // updatedAt: updatedAt,
    },
  });

  interface FormValues {
    name: string;
  }
  const addCategory: SubmitHandler<FormValues> = (value): void => {
    if (category) {
      const newCategory: NewCategory = {
        id: category.id,
        categoryName: value.name,
        file: file,
        url: url,
      };
      dispatch(fetchChangeCategoryWithImage(newCategory));
    } else {
      const newCategory: NewCategory = {
        categoryName: value.name,
        file: file,
        url: url,
      };
      dispatch(fetchAddCategoryWithImage(newCategory));
    }
    dispatch(setOpenAddCategory(false));
    // reset();
  };
  const { t } = useTranslation();

  const handleCloseModal = () => {
    dispatch(setOpenAddCategory(false));
  };
  const [selectFile, setSelectFile] = useState(category !== null && category.photo !== null);
  const [file, setFile] = useState(undefined);
  const [url, setUrl] = useState(category !== null ? category.photo : undefined);
  const onChangeFile = (e: React.ChangeEvent<HTMLInputElement>) => {

    setSelectFile(true);
    setFile(e.target.files[0]);
  };

  const onClickDeleteFile = (): void => {
    setFile(undefined);
    setSelectFile(false);
    setUrl(undefined);
  };
  return (
    <Modal>
      <form onSubmit={handleSubmit(addCategory)}>
        <div className="text-field">
          <label className="text-field__label">{t('AddCategoryForm.name')}</label>
          <input
            className="text-field__input"
            type="text"
            placeholder={t('AddCategoryForm.name')}
            {...register('name', { required: t('AddCategoryForm.error') })}
          />
          <label className="text-field__error-label">{errors.name?.message}</label>

          <div className="block">
            {!selectFile && (
              <>
                <label className="text-field__label">{t('AddCategoryForm.addImages')}</label>

                <label className="input-file">
                  <input type="file" accept="image/png, image/jpeg" id="categoryPhoto" onChange={onChangeFile} />
                  <span>{t('AddCategoryForm.selectFile')}</span>
                </label>
              </>
            )}
            {selectFile && (
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                {/*<label className="text-field__file-name">{file ? file.name : url} </label>*/}
                {url && <img src={url} width="70px"></img>}
                {file && <img src={URL.createObjectURL(file)} width="70px" />}
                <input type="button" value="Х" className="button-delete" onClick={() => onClickDeleteFile()} />
              </div>
            )}
          </div>
          <button type="submit" className="button-add-operation">
            {!category && t('AddCategoryForm.add')}
            {category && t('AddCategoryForm.change')}
          </button>
          <button className="button-add-operation" onClick={handleCloseModal}>
            Отмена
          </button>
        </div>
      </form>
    </Modal>
  );
};