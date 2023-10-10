import React, { useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import s from './ChangePasswordForm.module.sass';
import { useTranslation } from 'react-i18next';
import { VerificationInput } from 'src/components/VerificationInput/VerificationInput';
import { WideButton } from 'src/components/WideButton/WideButton';
import { ChangePasswordBody, Operation } from 'src/reduxToolkit/app.types';
import { fetchChangePasswordProfile } from 'src/reduxToolkit/authThunk';
import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';

interface СhangePasswordFormProps {
  oldPassword: string;
  password: string;
  repeatPassword: string;
}

const СhangePasswordForm = () => {
  type AppDispatch = ThunkDispatch<Operation, any, AnyAction>;
  const dispatch: AppDispatch = useDispatch();
  const { t } = useTranslation();
  const er = t`is_required`;
  const {
    control,
    watch,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<СhangePasswordFormProps>({ mode: 'onBlur' });

  const [editPassword, setEditPassword] = useState(false);
  const onСhangePassword: SubmitHandler<СhangePasswordFormProps> = (value): void => {
    if (!editPassword) {
      setEditPassword(!editPassword);
    }
    console.log(value);
    if (editPassword) {
      const updatePasswordBody: ChangePasswordBody = {
        password: value.oldPassword,
        newPassword: value.password,
      };
      dispatch(fetchChangePasswordProfile(updatePasswordBody));
    }
    reset();
  };
  const pass = watch('password');
  return (
    <form className={s.form} onSubmit={handleSubmit(onСhangePassword)}>
      {editPassword && (
        <div>
          <div className={s.title}>{t`ProfileScreen.updatePassword.title`}</div>
          <Controller
            control={control}
            name="oldPassword"
            rules={{ required: er }}
            render={({ field }) => (
              <VerificationInput
                onChange={(date) => {
                  console.log(date.target.value);
                  field.onChange(date.target.value);
                }}
                type="password"
                title={t`ChangePasswordForm.password.title`}
                placeholder={t`ChangePasswordForm.password.placeholder`}
                errorMessage={errors.oldPassword?.message}
              />
            )}
          />
          <Controller
            control={control}
            name="password"
            rules={{
              required: er,
              minLength: {
                value: 8,
                message: 'Пароль должен содержать не менее 8 символов',
              },
              pattern: {
                value: /^\w+$/,
                message: 'Пароль должен содержать латинские буквы, цифры и знаки _',
              },
            }}
            render={({ field }) => (
              <VerificationInput
                onChange={(date) => {
                  console.log(date.target.value);
                  field.onChange(date.target.value);
                }}
                type="password"
                title={t`ChangePasswordForm.newPassword.title`}
                placeholder={t`ChangePasswordForm.newPassword.placeholder`}
                errorMessage={errors.password?.message}
              />
            )}
          />
          <Controller
            control={control}
            name="repeatPassword"
            rules={{ required: er, validate: (value) => value === pass || 'Пароли не совпадают' }}
            render={({ field }) => (
              <VerificationInput
                onChange={(date) => {
                  console.log(date.target.value);
                  field.onChange(date.target.value);
                }}
                type="password"
                title={t`ChangePasswordForm.repeatPassword.title`}
                placeholder={t`ChangePasswordForm.repeatPassword.placeholder`}
                errorMessage={errors.repeatPassword?.message}
              />
            )}
          />
        </div>
      )}
      <WideButton isSubmit={true} text={editPassword ? t`ProfileScreen.updatePassword.save` : t`ProfileScreen.updatePassword.edit`} />
    </form>
  );
};
export default СhangePasswordForm;
