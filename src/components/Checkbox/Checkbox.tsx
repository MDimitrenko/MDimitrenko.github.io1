import './Checkbox.css';
import React, { ChangeEvent, FC } from 'react';
import { useTheme } from 'src/components/theme/Theme';

interface CheckboxProps {
  id: string;
  name: string;
  label: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}
export const Checkbox: FC<CheckboxProps> = ({ id, name, label, onChange }) => {
  const theme = useTheme();
  return (
    <>
      <input
        name={name}
        type="checkbox"
        className="checkbox-input"
        id={id}
        onChange={onChange}
        autoComplete="off"
        data-theme={theme.theme}
      />
      {label && (
        <label className="checkbox-label" htmlFor={id}>
          {label}
        </label>
      )}
    </>
  );
};

export default Checkbox;
