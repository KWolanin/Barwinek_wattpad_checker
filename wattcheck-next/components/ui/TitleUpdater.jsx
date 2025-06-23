'use client'

import { useTranslation } from 'react-i18next'
import { useEffect } from 'react'

export default function TitleUpdater() {
  const { i18n, t } = useTranslation()

  useEffect(() => {
    const updateTitle = () => {
      document.title = t('title')
    }

    updateTitle()

    i18n.on('languageChanged', updateTitle)

    return () => {
      i18n.off('languageChanged', updateTitle)
    }
  }, [i18n, t])

  return null
}
