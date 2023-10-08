import React, { ChangeEvent, FC, HTMLInputTypeAttribute } from 'react';
import style from './VerificationInput.module.sass';

interface VerificationInputProps {
  title: string;
  inputValue?: string;
  placeholder?: string;
  errorMessage?: string;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  type?: HTMLInputTypeAttribute;
}

export const VerificationInput: FC<VerificationInputProps> = ({
  title,
  inputValue,
  placeholder,
  errorMessage,
  onChange,
  disabled = false,
  type = 'text',
}) => {
  console.log(inputValue);
  return (
    <>
      <label className={style.title_label}>{title}</label>
      <input
        defaultValue={inputValue || ''}
        className={style.input}
        name="name"
        type={type}
        placeholder={placeholder || ''}
        onChange={onChange}
        disabled={disabled}
      />
      <label className={style.error_label}>{errorMessage || ''}</label>
    </>
  );
};
