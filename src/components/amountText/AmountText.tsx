import React, { FC } from 'react';

import './AmountText.css';
interface AmountTextProps {
  amount: number;
}
// eslint-disable-next-line react/prop-types
export const AmountText: FC<AmountTextProps> = ({ amount }) => {
  return (
    <div className="amount-text__div">
      <label className="amount-text">{amount} &#x20bd;</label>
    </div>
  );
};
