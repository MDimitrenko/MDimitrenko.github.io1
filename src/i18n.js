import translationEN from './locales/en/translation.json';
import translationRU from './locales/ru/translation.json';
import i18n from 'i18next';
// eslint-disable-next-line import/named
import { initReactI18next, reactI18nextModule } from 'react-i18next';

// the translations
const resources = {
  en: {
    translation: translationEN,
  },
  ru: {
    translation: translationRU,
  },
};

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    fallbackLng: 'ru', // use en if detected lng is not available

    interpolation: {
      escapeValue: false, // react already safes from xss
    },
  });

export default i18n;
