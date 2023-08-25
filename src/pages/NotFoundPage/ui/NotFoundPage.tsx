import React from 'react'
import { useTranslation } from 'react-i18next'

export const NotFoundPage = () => {
    const { t } = useTranslation()

    return (
        <div>
            <span>{t('Page not found')}</span>
        </div>
    )
}
