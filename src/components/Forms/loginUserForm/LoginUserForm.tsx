import React, { FC } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import './LoginUserForm.css';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from '@reduxjs/toolkit';
import { SignInBody } from '../../../reduxToolkit/app.types';
import { fetchSignin, fetchSignup } from '../../../reduxToolkit/authThunk';

interface LoginUserFormProps {
  registration: boolean;
}
// eslint-disable-next-line react/prop-types
export const LoginUserForm: FC<LoginUserFormProps> = ({ registration }) => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<FormValues>({
    mode: 'onBlur',
  });
  interface FormValues {
    email: string;
    password: string;
    confirmPassword: string;
  }
  type AppDispatch = ThunkDispatch<SignInBody, any, AnyAction>;

  const dispatch: AppDispatch = useDispatch();
  const clickSubmit: SubmitHandler<FormValues> = async (value) => {
    const { email, password } = value;
    if (registration) {
      dispatch(fetchSignup({ email: email, password: password, commandId: '9ba431c9-7758-4e8d-bf79-6d001569853b' }));
    } else {
      dispatch(fetchSignin({ email: email, password: password }));
    }
    navigate('/');

    reset();
  };

  const pass = watch('password');
  return (
    <>
      <form onSubmit={handleSubmit(clickSubmit)}>
        <div className="text-field">
          <label className="text-field__label">Email*</label>
          <input
            className="text-field__input"
            placeholder="Email"
            {...register('email', {
              required: 'Поле обязательно для заполнения',
              pattern: {
                value: /^\w+@\w+.\w+$/,
                message: 'Некорректный формат email',
              },
            })}
          />

          <label className="text-field__error-label">{errors.email?.message}</label>

          <label className="text-field__label">Пароль*</label>
          <input
            className="text-field__input"
            type="password"
            placeholder="Пароль"
            {...register('password', {
              required: 'Поле обязательно для заполнения',
              minLength: {
                value: 10,
                message: 'Пароль должен содержать не менее 10 символов',
              },
              pattern: {
                value: /^\w+$/,
                message: 'Пароль должен содержать латинские буквы, цифры и знаки _',
              },
            })}
          />

          <label className="text-field__error-label">{errors.password?.message}</label>
          {registration && (
            <>
              <label className="text-field__label">Подтверждение пароля*</label>
              <input
                className="text-field__input"
                type="password"
                placeholder="Подтверждение пароля"
                {...register('confirmPassword', {
                  required: 'Поле обязательно для заполнения',
                  validate: (value) => value === pass || 'Пароли не совпадают',
                })}
              />

              <label className="text-field__error-label">{errors.confirmPassword?.message}</label>
            </>
          )}

          <button type="submit" className="button-add">
            {registration ? 'Зарегистрироваться' : 'Войти'}
          </button>
        </div>
      </form>
    </>
  );
};
