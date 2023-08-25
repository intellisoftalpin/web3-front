import React from 'react'
import { useTranslation } from 'react-i18next'

export const PageErrorBoundary = () => {
    const { t } = useTranslation()

    return (
        <div>
            <span>{t('Unexpected error')}</span>
        </div>
    )
}
