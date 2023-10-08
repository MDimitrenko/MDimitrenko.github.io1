import React, { FC } from 'react';
import { Page } from 'src/components/Page';
import { useTranslation } from 'react-i18next';
import s from './RegistrationScreen.sass';
import { LoginUserForm } from 'src/components/Forms/LoginUserForm/LoginUserForm';

export const RegistrationScreen: FC = () => {
  const { t } = useTranslation();
  return (
    <Page title={t`Registration`} className={s.root}>
      <LoginUserForm registration={true} />
    </Page>
  );
};

export default RegistrationScreen;