import React, { FC } from 'react';
import { useTheme } from '../theme/Theme';

interface ImageProps {
  fileName: string;
  onClick?: () => void;
  size?: string;
}
// eslint-disable-next-line react/prop-types
export const Image: FC<ImageProps> = ({ fileName, onClick, size }) => {
  const theme = useTheme();
  return (
    <>
      <img src={require(`../../images/${fileName}-${theme.theme}.png`)} onClick={onClick} width={size} />
    </>
  );
};
