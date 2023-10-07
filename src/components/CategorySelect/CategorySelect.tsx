import React, { FC, useState } from 'react';
// eslint-disable-next-line import/named
import { Select, SelectProps } from 'antd';
import cn from 'clsx';
import s from './CategorySelect.sass';
import { Category } from '../../reduxToolkit/app.types';

export type CategorySelectProps = SelectProps & {
  items: Category[];
  selectCategory?: Category;
  onChange: (value: any) => void;
};

export const CategorySelect: FC<CategorySelectProps> = ({ items, selectCategory, onChange }) => {
  return (
    <Select className="select" onChange={onChange} defaultValue={selectCategory ? selectCategory.id : null}>
      {items?.map((item) => (
        <Select.Option key={item.id} title={item.name} value={item.id}>
          <div className={s.item}>
            <img src={item.photo} width="30px" />
            <span>{item.name}</span>
          </div>
        </Select.Option>
      ))}
    </Select>
    // <Select
    //   onBlur={onBlur}
    //   disabled={disabled}
    //   className={cn(s.root, className)}
    //   filterOption={filterOption}
    //   value={value}
    //   placeholder={placeholder}
    //   onChange={onChange}
    //   onSearch={onSearch}
    // >
    //   {items?.map((item) => (
    //     <Select.Option key={item.id} title={item.name}>
    //       <div className={s.item}>
    //         <img src={item.photo} width="40px" />
    //         <span>{item.name}</span>
    //       </div>
    //     </Select.Option>
    //   ))}
    // </Select>
  );
};
