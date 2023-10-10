import React, { FC } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import style from './FilterForm.module.sass';
import { useDispatch } from 'react-redux';
// eslint-disable-next-line import/named
import { ThunkDispatch } from 'redux-thunk';
// eslint-disable-next-line import/named
import { AnyAction } from '@reduxjs/toolkit';
import { Filters } from '../../../reduxToolkit/app.types';
import { DatePickerBox } from '../../DatePickerBox/DatePickerBox';
import { Select } from 'antd';
import Checkbox from '../../Checkbox/Checkbox';
import { setFilter } from 'src/reduxToolkit/filterSlice';
import { clearOperations, setUploadPage } from 'src/reduxToolkit/operationSlice';
import { BasicButton } from 'src/components/basicButton/BasicButton';
import { useTranslation } from 'react-i18next';

// eslint-disable-next-line react/prop-types
export const FilterForm: FC = () => {
  const defaultDate: Date = new Date();
  const {
    register,
    handleSubmit,
    reset,
    control,
    watch,
    formState: { errors },
  } = useForm<FormValues>({
    mode: 'onBlur',
    defaultValues: {
      startDate: defaultDate,
      endDate: defaultDate,
      checkStartDate: false,
      checkEndDate: false,
      operationType: 'Все операции',
    },
  });
  interface FormValues {
    operationType?: string;
    startDate?: Date;
    endDate?: Date;
    checkStartDate: boolean;
    checkEndDate: boolean;
  }

  const dispatch = useDispatch();
  const clickSubmit: SubmitHandler<FormValues> = async (value) => {
    console.log(value);
    const filter: Filters = {
      pagination: {
        pageSize: 20,
        pageNumber: 1,
      },
      sorting: {
        type: 'ASC',
        field: 'createdAt',
      },
      type: value.operationType === 'Приход' ? 'Profit' : value.operationType === 'Расход' ? 'Cost' : null,
      date: {
        gte: value.checkStartDate ? value.startDate.toISOString() : null,
        lte: value.checkEndDate ? value.endDate.toISOString() : null,
      },
    };
    dispatch(clearOperations());
    dispatch(setFilter(filter));
  };

  const selectedStartDate = watch('checkStartDate');
  const selectedEndDate = watch('checkEndDate');
  const { t } = useTranslation();
  return (
    <div style={{ width: '350px' }}>
      <form onSubmit={handleSubmit(clickSubmit)}>
        <div className={style.filter_form}>
          <label className={style.filter_form__text_field__label}>{t`Filter.operationType`}</label>
          <Controller
            control={control}
            name="operationType"
            render={({ field }) => (
              <Select
                onChange={(date) => field.onChange(date)}
                defaultValue="Все операции"
                className={style.filter_form__select}
              >
                <Select.Option key={1} value="Все операции">
                  Все операции
                </Select.Option>
                <Select.Option key={2} value="Приход">
                  Приход
                </Select.Option>
                <Select.Option key={3} value="Расход">
                  Расход
                </Select.Option>
              </Select>
            )}
          />
          <div>
            <Controller
              control={control}
              name="checkStartDate"
              render={({ field }) => (
                <Checkbox id="1" name="startDate" label={t`Filter.dateFrom`} onChange={(event) => field.onChange(event)} />
              )}
            />
          </div>
          <Controller
            control={control}
            name="startDate"
            render={({ field }) => (
              <DatePickerBox
                name="startDate"
                onChange={(date) => field.onChange(date)}
                defaultDate={new Date()}
                disabled={!selectedStartDate}
              />
            )}
          />
          <Controller
            control={control}
            name="checkEndDate"
            render={({ field }) => (
              <Checkbox id="2" name="endDate" label={t`Filter.dateTo`} onChange={(event) => field.onChange(event)} />
            )}
          />
          {/*<label className="text-field__error-label">{errors.email?.message}</label>*/}
          <Controller
            control={control}
            name="endDate"
            render={({ field }) => (
              <DatePickerBox
                name="endDate"
                onChange={(date) => field.onChange(date)}
                defaultDate={new Date()}
                disabled={!selectedEndDate}
              />
            )}
          />

          <BasicButton isSubmit={true} text={t`Filter.applyFilter`} className={style.button_width} />
        </div>
      </form>
    </div>
  );
};
