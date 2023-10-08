import React, { FC } from 'react';
import { Page } from 'src/components/Page';
import { useTranslation } from 'react-i18next';
import s from './Profile.sass';
import СhangePasswordForm from 'src/components/Forms/ChangePasswordForm/СhangePasswordForm';
import СhangeProfileForm from 'src/components/Forms/ChangeProfileForm/ChangeProfileForm';
import { useSelector } from 'react-redux';
import { RootState } from 'src/reduxToolkit/store';

export const Profile: FC = () => {
  const { t } = useTranslation();

  return (
    <Page title={t`ProfileScreenTitle`} className={s.root}>
      <СhangeProfileForm />
      <СhangePasswordForm />
    </Page>
  );
};

export default Profile;
