import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import ar from './locales/locales.ar.json'
import en from './locales/locales.en.json'
i18n.use(initReactI18next).init({
    resources: {
        en: { translation: en },
        ar: { translation: ar },
    },
    lng: 'en', // default language
    fallbackLng: 'en', 
    interpolation: { escapeValue: false },
});

export default i18n;