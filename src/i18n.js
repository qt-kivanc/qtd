import i18n from "i18next";

import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from "react-i18next";

const fallbackLng = ['tr'];
const availableLanguages = ['tr', 'en'];

export const SetI18N = () => {

  i18n

    .use(LanguageDetector)
    .use(initReactI18next) // passes i18n down to react-i18next
    .init({
      backend: {
        loadPath: '/locales/{{lng}}/{{ns}}.json',
        crossDomain: true,
      },
      preload: ['en', 'tr'],
      fallbackLng,
      lng: fallbackLng,
      load: 'languageOnly',
      whitelist: availableLanguages,
      // have a common namespace used around the full app
      ns: ['translation'],
      defaultNS: ['translation'],
      initImmediate: false,
      debug: true,
    });

}

export default i18n;