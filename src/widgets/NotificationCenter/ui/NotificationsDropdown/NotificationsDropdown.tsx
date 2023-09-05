import { type FC } from 'react'
import cls from './NotificationsDropdown.module.scss'
import classNames from 'classnames'
import { type NotificationCenterItem } from 'react-toastify/addons/use-notification-center'
import { type Id } from 'react-toastify'
import { NotificationItem } from '../NotificationItem/NotificationItem'
import { useTranslation } from 'react-i18next'

interface NotificationsDropdownProps {
    className?: string
    isDropdown: boolean
    notifications: NotificationCenterItem[]
    markAsRead: (id: Id | Id[]) => void
}

export const NotificationsDropdown: FC<NotificationsDropdownProps> = (props) => {
    const { className, isDropdown, notifications, markAsRead } = props
    const { t } = useTranslation()

    const readNotification = (id: Id, read: boolean) => { !read && markAsRead(id) }

    return (
        <div className={classNames(cls.NotificationsDropdown, { [cls.show]: isDropdown }, [className])}>
            <div className={cls.header}>
                <h2>{t('Notifications logs')}</h2>
            </div>
            <div className={cls.notifications}>
                {notifications.length > 0
                    ? notifications.map(notification =>
                        <NotificationItem notification={notification} readNotification={readNotification} key={notification.id}/>
                    )
                    : <div className={cls.nullNotifications}>
                        <h1>{t('Notifications are missing')}</h1>
                    </div>
                }
            </div>
        </div>
    )
}
