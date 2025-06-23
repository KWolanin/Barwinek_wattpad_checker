'use client'
import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'

import translationPL from '@/public/locales/pl/translation.json'
import translationEN from '@/public/locales/en/translation.json'

if (!i18n.isInitialized) {
  i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
      fallbackLng: 'pl',
      supportedLngs: ['pl', 'en'],
      debug: false,
      detection: {
        order: ['localStorage', 'navigator'],
        caches: ['localStorage']
      },
      resources: {
        pl: { translation: translationPL },
        en: { translation: translationEN }
      }
    })
}

export default i18n
