import { memo } from 'react'
import cls from './NotificationItem.module.scss'
import classNames from 'classnames'
import { type NotificationCenterItem } from 'react-toastify/addons/use-notification-center'
import { NotificationIcon } from '../NotificationIcon/NotificationIcon'
import moment from 'moment'
import { useTranslation } from 'react-i18next'

interface NotificationItemProps {
    className?: string
    notification: NotificationCenterItem
}

export const NotificationItem = memo((props: NotificationItemProps) => {
    const { className, notification } = props
    const { i18n } = useTranslation()

    return (
        <div className={classNames(cls.NotificationItem, {}, [className])}>
            <div className={cls.iconBlock}>
                <NotificationIcon theme={notification.theme || 'dark'} type={notification.type || 'default'} className={cls.icon}/>
            </div>
            <div className={cls.text}>
                <p>{String(notification.content)}</p>
                <span>{moment(notification.createdAt).locale(i18n.language).format('MMMM Do, h:mm:ss A')}</span>
            </div>
            <div className={classNames(cls.unread, { [cls.read]: notification.read })}/>
        </div>
    )
})
