import React, { FC } from 'react';
import { Page } from '../../components/Page';
import { useTranslation } from 'react-i18next';
import s from './AuthorizationScreen.sass';
import { LoginUserForm } from '../../components/Forms/LoginUserForm/LoginUserForm';

export const AuthorizationScreen: FC = () => {
  const { t } = useTranslation();
  return (
    <Page title={t`Authorization`} className={s.root}>
      <LoginUserForm registration={false} />
    </Page>
  );
};

export default AuthorizationScreen;