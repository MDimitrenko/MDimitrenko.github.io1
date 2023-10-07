import React, { FC } from 'react';
import './BasketText.css';
// eslint-disable-next-line react/prop-types

interface BasketTextProps {
  text: string;
}

export const BasketText: FC<BasketTextProps> = ({ text }) => {
  return (
    <div className="basket-button__div">
      <label className="basket-text">{text}</label>
    </div>
  );
};
