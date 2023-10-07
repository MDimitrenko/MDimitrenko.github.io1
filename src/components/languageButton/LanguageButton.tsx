import React, { FC } from 'react';
// eslint-disable-next-line import/no-unresolved
import '../../i18n';
import { useTranslation } from 'react-i18next';
import s from './LanguageButton.module.sass';
import {useTheme} from "src/components/theme/Theme";
import {BasicButton} from "src/components/basicButton/BasicButton";

// eslint-disable-next-line react/prop-types
export const LanguageButton: FC = () => {
  const { t, i18n } = useTranslation();
  const theme = useTheme();
  const lngStyle = (buttonLng: string): string => (buttonLng === i18n.language ? 'button__disabled' : '');
  const ruStyle = 'in-basket__left-button ' + lngStyle('ru');
  const enStyle = 'in-basket__right-button ' + lngStyle('en');

  return (
    <div className={s.language_button} data-theme={theme}>
      <BasicButton text={t('language.ru')} onClick={() => i18n.changeLanguage('ru')}
      disabled={'ru' === i18n.language} type='left'/>
      <BasicButton text={t('language.en')} onClick={() => i18n.changeLanguage('en')}
                   disabled={'en' === i18n.language} type='right'/>
    </div>
  );
};
