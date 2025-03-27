import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from 'i18next-browser-languagedetector';
import HttpApi from 'i18next-http-backend';
import { DateTime } from "luxon";
import axios from "axios";
import env from "react-dotenv";

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .use(LanguageDetector)
  .use(HttpApi)
  .init({
    supportedLngs: ['en-US', 'en', 'zh-Hans-CN', 'zh-Hant-CN', 'km-KH', 'ar-SA'],
    ns: ['index','navigation'],
    fallbackLng: "en-US",
    defaultNS: "index",
    debug: env.NODE_ENV === 'development',
    detection: {
      order: ['path', 'cookie', 'localStorage', 'sessionStorage', 'navigator', 'querystring', 'htmlTag', 'subdomain'],
      caches: ['cookie'],
    },
    backend: {
      loadPath: `${env.CDN_URL}/locales/{{lng}}/{{ns}}.json`,
      request: function (options, url, payload, callback) {
        axios.get(url).then((res) => {
            callback(null, { status: 200, data: res.data });
        }).catch((err) => callback(err, { status: 500, data: err}));
      },
      allowMultiLoading: false,
      requestOptions: { // used for fetch, can also be a function (payload) => ({ method: 'GET' })
        mode: 'cors',
        credentials: 'same-origin',
        cache: 'default'
      }
    },
    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
      format: (value, format, lng: any) => {
        if (value instanceof Date) {
          return DateTime
            .fromJSDate(value)
            .setLocale(lng)
            .toLocaleString(DateTime.DATETIME_FULL);
        }
        return value;
      },
    }
  }).then(() => {
    console.warn(i18n.languages);
    i18n.languages.forEach((lang) =>
      console.warn(i18n.getDataByLanguage(lang))
    );
    if (
      i18n.languages.every((lang) => i18n.getDataByLanguage(lang) === undefined)
    ) {
      throw new Error(`Failed to load localization`);
    }
  });

  export default i18n;