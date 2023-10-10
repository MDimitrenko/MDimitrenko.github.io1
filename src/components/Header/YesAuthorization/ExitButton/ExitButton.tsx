import React from 'react';
// eslint-disable-next-line import/named
import { useNavigate, NavLink, NavLinkProps } from 'react-router-dom';
import s from './ExitButton.module.sass';
// import { signOut } from '../../../../reduxToolkit/profile';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import cn from 'clsx';
import { clearToken } from '../../../../reduxToolkit/initSlice';
import {clearOperations} from "src/reduxToolkit/operationSlice";
import {clearCategories} from "src/reduxToolkit/categorySlice";

export const getClassName: NavLinkProps['className'] = ({ isActive }) => cn(s.link, isActive && s.active);

const ExitButton = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  function handleClick() {
    navigate('/signOut');
    dispatch(clearToken());
    dispatch(clearOperations());
    dispatch(clearCategories());
  }

  const { t } = useTranslation();
  return (
    <NavLink className={getClassName} onClick={handleClick} to="/signin">
      {t`Exit`}
    </NavLink>
  );
};

export default ExitButton;
