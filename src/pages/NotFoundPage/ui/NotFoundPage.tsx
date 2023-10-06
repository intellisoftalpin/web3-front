import React, { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

export const NotFoundPage = () => {
    const { t } = useTranslation()
    const navigate = useNavigate()

    useEffect(() => {
        navigate('/')
    }, [navigate])

    return (
        <div>
            <span>{t('Page not found')}</span>
        </div>
    )
}
