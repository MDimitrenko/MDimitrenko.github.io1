import React, { FC } from 'react';
import { BasicButton, BasicButtonProps } from '../basicButton/BasicButton';
import style from './WideButton.module.sass';

// eslint-disable-next-line react/prop-types
export const WideButton: FC<BasicButtonProps> = ({ ...props }) => {
  return <BasicButton className={style.button_width} {...props} />;
};
