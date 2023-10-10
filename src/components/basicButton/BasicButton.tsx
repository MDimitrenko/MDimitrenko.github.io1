import React, { FC } from 'react';
import style from './BasicButton.module.css';
import cn from 'clsx';
import { useTheme } from '../../components/theme/Theme';

export interface BasicButtonProps {
  type?: string;
  disabled?: boolean;
  text: string;
  className?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  isSubmit?: boolean;
}
// eslint-disable-next-line react/prop-types
export const BasicButton: FC<BasicButtonProps> = ({
  text,
  className = '',
  onClick,
  type = '',
  disabled = false,
  isSubmit = false,
}) => {
  const theme = useTheme();
  return (
    <div className={style.button__div}>
      <button
        type={isSubmit ? 'submit' : 'button'}
        className={cn(
          className,
          style.button,
          disabled && style.button__disabled,
          type === 'left' && style.in_basket__left_button,
          type === 'right' && style.in_basket__right_button
        )}
        onClick={onClick}
        data-theme={theme.theme}
      >
        {text}
      </button>
    </div>
  );
};
