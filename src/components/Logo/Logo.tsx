import React from 'react';
import s from './Logo.module.sass';
import { useTranslation } from 'react-i18next';

const Logo = () => {
  const { t, i18n } = useTranslation();
  return (
    <div className={s.logo_wrapper}>
      <div className={s.logo}></div>
      <div className={s.logoTitle}>{t('titleApp')}</div>
    </div>
  );
};

export default Logo;
