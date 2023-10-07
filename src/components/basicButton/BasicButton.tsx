import React, { FC } from 'react';
import style from './BasicButton.module.css';
import cn from 'clsx';
import { useDispatch } from 'react-redux';
import { useTheme } from '../../components/theme/Theme';

interface BasicButtonProps {
  type?: string;
  disabled?: boolean;
  text: string;
  className?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}
// eslint-disable-next-line react/prop-types
export const BasicButton: FC<BasicButtonProps> = ({
  text,
  className = '',

  onClick,
  type = '',
  disabled = false,
}) => {
  const dispatch = useDispatch();

  const theme = useTheme();
  console.log(type === 'right');
  return (
    <div className={style.button__div}>
      <button
        className={cn(
          style.button,
          disabled && style.button__disabled,
          type === 'left' && style.inBasket__leftButton,
          type === 'right' && style.inBasket__rightButton
        )}
        onClick={onClick}
        data-theme={theme.theme}
      >
        {text}
      </button>
    </div>
  );
};
