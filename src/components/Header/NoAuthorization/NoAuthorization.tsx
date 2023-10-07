import React from 'react'
import verticalLine from './verticalLine.svg'
import { useNavigate } from "react-router-dom"
import s from "./NoAuthorization.module.sass"
import { NavLink, NavLinkProps } from 'react-router-dom';
import cn from 'clsx';
import { useTranslation } from 'react-i18next';

export const getClassName: NavLinkProps['className'] = ({ isActive }) => cn(s.link, isActive && s.active);

const NoAuthorization = () => {
  const { t } = useTranslation();
return (
    <div className={s.panel}>
      <NavLink className={getClassName} to="/signin">
        {t`Authorization`}
      </NavLink>
      <img className={s.panel__verticalLine} src={verticalLine} alt='verticalLine' />
      <NavLink className={getClassName} to="/signup">
        {t`Registration`}
      </NavLink>
    </div>
  )}

export default NoAuthorization