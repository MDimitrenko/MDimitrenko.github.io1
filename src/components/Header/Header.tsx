import React, { useRef, useLayoutEffect } from 'react';
import s from './Header.module.sass';
import Logo from '../Logo/Logo';
import { LanguageButton } from '../languageButton/LanguageButton';
import { ThemeSwitcher } from '../ThemeSwitcher';
import { useTranslation } from 'react-i18next';
import TopMenu from './TopMenu/TopMenu';
import { Link } from 'react-router-dom';
import YesAuthorization from './YesAuthorization/YesAuthorization';
import NoAuthorization from './NoAuthorization/NoAuthorization';
import { useSelector } from 'react-redux';
import { RootState } from 'src/reduxToolkit/store';

type HeaderProps = {
  children?: React.ReactNode;
};

const Header = ({ children }: HeaderProps) => {
  const { t } = useTranslation();

  const isSingIn = useSelector<RootState, boolean>((state) => state.initSlice.isSignIn);
  const Account = isSingIn ? YesAuthorization : NoAuthorization;

  return (
    <div className={s.header} >
      <Logo />
      <TopMenu />
      <Account />
      <ThemeSwitcher />
      <LanguageButton />

      {children}
    </div>
  );
};

export default Header;
