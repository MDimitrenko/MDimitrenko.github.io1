import React, { FC } from 'react';
import './DescriptionText.css';
// eslint-disable-next-line react/prop-types
interface DescriptionTextProps {
  text: string;
  size?: string;
  bold?: string;
}

export const DescriptionText: FC<DescriptionTextProps> = ({ text, size = '', bold = 'false' }) => {
  const className =
    'description-text ' +
    (size ? 'description-text__text___' + size : '') +
    (bold === 'true' ? ' description-text__text___bold' : '');

  return (
    <div>
      <label className={className}>{text}</label>
    </div>
  );
};
