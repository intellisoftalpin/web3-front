import { memo } from 'react'
import cls from './NotificationsDropdown.module.scss'
import classNames from 'classnames'
import { type NotificationCenterItem } from 'react-toastify/addons/use-notification-center'
import { NotificationItem } from '../NotificationItem/NotificationItem'
import { useTranslation } from 'react-i18next'

interface NotificationsDropdownProps {
    className?: string
    isDropdown: boolean
    notifications: NotificationCenterItem[]
}

export const NotificationsDropdown = memo((props: NotificationsDropdownProps) => {
    const { className, isDropdown, notifications } = props
    const { t } = useTranslation()

    return (
        <div className={classNames(cls.NotificationsDropdown, { [cls.show]: isDropdown }, [className])}>
            <div className={cls.header}>
                <h2>{t('Notifications logs')}</h2>
            </div>
            <div className={cls.notifications}>
                {notifications.length > 0
                    ? notifications.map(notification =>
                        <NotificationItem notification={notification} key={notification.id}/>
                    )
                    : <div className={cls.nullNotifications}>
                        <h1>{t('Notifications are missing')}</h1>
                    </div>
                }
            </div>
        </div>
    )
})
