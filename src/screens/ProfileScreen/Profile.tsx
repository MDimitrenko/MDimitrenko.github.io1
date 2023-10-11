import React, { FC } from 'react';
import { Page } from '../../components/Page';
import { useTranslation } from 'react-i18next';
import s from './Profile.sass';
import СhangePasswordForm from '../../components/Forms/ChangePasswordForm/СhangePasswordForm';
import СhangeProfileForm from '../../components/Forms/ChangeProfileForm/ChangeProfileForm';


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
