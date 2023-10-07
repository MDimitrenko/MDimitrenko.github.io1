import React, { FC } from 'react';
import { Page } from 'src/components/Page';
import { useTranslation } from 'react-i18next';
import s from './Home.sass';

export const Home: FC = () => {
  const { t } = useTranslation();
  return (
    <Page title={t`HomeScreenTitle`} className={s.root}>
      <div>{t('description')}</div>
    </Page>
  );
};

export default Home;
