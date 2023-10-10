import React, { FC } from 'react';
// eslint-disable-next-line import/named
import { Select, SelectProps } from 'antd';
import s from './CategorySelect.module.sass';
import { Category } from '../../reduxToolkit/app.types';

export type CategorySelectProps = SelectProps & {
  items: Category[];
  selectCategory?: Category;
  onChange: (value: any) => void;
};

export const CategorySelect: FC<CategorySelectProps> = ({ items, selectCategory, onChange }) => {
  return (
    <Select className={s.select} onChange={onChange} defaultValue={selectCategory ? selectCategory.id : null}>
      {items?.map((item) => (
        <Select.Option key={item.id} title={item.name} value={item.id}>
          <div className={s.item}>
            <img src={item.photo} width="30px" />
            <span>{item.name}</span>
          </div>
        </Select.Option>
      ))}
    </Select>

  );
};
