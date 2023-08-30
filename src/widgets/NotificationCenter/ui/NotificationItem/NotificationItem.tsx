import { type FC } from 'react'
import cls from './NotificationItem.module.scss'
import classNames from 'classnames'
import { type NotificationCenterItem } from 'react-toastify/addons/use-notification-center'
import { NotificationIcon } from '../NotificationIcon/NotificationIcon'
import moment from 'moment'
import { useTranslation } from 'react-i18next'
import { type Id } from 'react-toastify'

interface NotificationItemProps {
    className?: string
    notification: NotificationCenterItem
    readNotification: (id: Id, read: boolean) => void
}

export const NotificationItem: FC<NotificationItemProps> = ({ className, notification, readNotification }) => {
    const { i18n } = useTranslation()

    return (
        <div className={classNames(cls.NotificationItem, {}, [className])} onMouseMove={() => { readNotification(notification.id, notification.read) }}>
            <div className={cls.iconBlock}>
                <NotificationIcon theme={notification.theme} type={notification.type} className={cls.icon}/>
            </div>
            <div className={cls.text}>
                <p>{String(notification.content)}</p>
                <span>{moment(notification.createdAt).locale(i18n.language).format('MMMM Do, h:mm:ss A')}</span>
            </div>
            <div className={classNames(cls.unread, { [cls.read]: notification.read })}/>
        </div>
    )
}
