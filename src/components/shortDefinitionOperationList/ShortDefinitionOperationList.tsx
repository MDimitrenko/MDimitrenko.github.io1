import React, { FC, useEffect } from 'react';
import s from './ShortDefinitionOperationList.module.sass';
import { Filters, Operation } from '../../reduxToolkit/app.types';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../reduxToolkit/store';
import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from '@reduxjs/toolkit';
import { fetchGetOperation } from '../../reduxToolkit/operationThunk';
import OperationItem from '../OperationItem/OperationItem';
import {fetchGetCategories} from "src/reduxToolkit/categoryThunk";

export const ShortDefinitionOperationList: FC = () => {
  type AppDispatch = ThunkDispatch<Operation, any, AnyAction>;
  const dispatch: AppDispatch = useDispatch();
  const operations = useSelector<RootState, Operation[]>((state) => state.operationSlice.operations);
  const pageNumber = useSelector<RootState, number>((state) => state.operationSlice.uploadPage);
  const allUploaded = useSelector<RootState, boolean>((state) => state.operationSlice.allUploaded);
  const filter = useSelector<RootState, Filters>((state) => state.filterSlice.filter);
  useEffect(() => {
    const options = {
      rootMargin: '0px',
      threshold: 0.25,
    };

    // создаем наблюдатель
    const observer = new IntersectionObserver((entries, observer) => {
      // для каждой записи-целевого элемента
      entries.forEach((entry) => {
        // если элемент является наблюдаемым
        if (!allUploaded && entry.isIntersecting) {
          const filters: Filters = {
            pagination: {
              pageSize: 20,
              pageNumber: pageNumber + 1,
            },
            sorting: {
              type: 'ASC',
              field: 'createdAt',
            },
          };
          filters.type = filter.type;
          filters.date = filter.date;
          console.log(
              pageNumber
          )

          dispatch(fetchGetOperation(filters));

          observer.unobserve(entry.target);
        }
      });
    }, options);

    if (operations.length > 0) {
      observer.observe(document.getElementById(operations[operations.length - 1].id));
    }
  }, [operations]);
  useEffect(() => {
    if (!allUploaded) {
      const filters: Filters = {
        pagination: {
          pageSize: 20,
          pageNumber: pageNumber + 1,
        },
        sorting: {
          type: 'ASC',
          field: 'createdAt',
        },
      };
      filters.type = filter.type;
      filters.date = filter.date;

      dispatch(fetchGetOperation(filters));
    }
  }, [filter]);

  const operationList = operations.map((item) => {
    // console.log(item);
    return (
      // eslint-disable-next-line react/jsx-key
      <div className={s.definition_product_list__div} key={item.id} id={item.id}>
        <OperationItem operation={item} />
      </div>
    );
  });
  return <div className={s.definition_product_list}>{operationList}</div>;
};
