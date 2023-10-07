import React, { FC } from 'react';
import './ProductImage.css';
// eslint-disable-next-line react/prop-types
interface ProductImageProps {
  image: string;
  divClassName?: string;
}
export const ProductImage: FC<ProductImageProps> = ({ image, divClassName }) => {
  return (
    <div className={divClassName}>
      <img src={require(`../../images/${image}`)} className="product-image__img" />
    </div>
  );
};
