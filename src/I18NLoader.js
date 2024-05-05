import i18n from "i18next";
import HttpApi from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from "react-i18next";

/**
 * 
 * @param {*} path       "/locales/{{lng}}/{{ns}}.json"
 * @param {*} languages  ["tr", "en"]
 * @param {*} namespaces ["translation", "countries", "currencies"]
 * @param {*} onComplete 
 */
export default function I18NLoader(path, languages, namespaces, onComplete) {

  i18n
    .use(HttpApi)
    .use(LanguageDetector)
    .use(initReactI18next) // passes i18n down to react-i18next
    .init(
      {
        backend       : {
          loadPath    : path,
          crossDomain : true,
        },
        preload       : ['en'],
        fallbackLng   : ['en'],
        lng           : 'en-US',
        load          : 'languageOnly',
        whitelist     : languages,
        // have a common namespace used around the full app
        ns            : namespaces,
        defaultNS     : namespaces,
        initImmediate : false,
        dynamicLoad   : true,
        debug         : false,
     },
     onComplete
    );
    
}