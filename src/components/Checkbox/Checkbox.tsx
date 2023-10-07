import './Checkbox.css';
import React, { ChangeEvent, FC } from 'react';

interface CheckboxProps {
  id: string;
  name: string;
  label: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}
export const Checkbox: FC<CheckboxProps> = ({ id, name, label, onChange }) => {
  return (
    <>
      <input name={name} type="checkbox" className="checkbox-input" id={id} onChange={onChange} autoComplete="off" />
      {label && (
        <label className="checkbox-label" htmlFor={id}>
          {label}
        </label>
      )}
    </>
  );
};

export default Checkbox;
