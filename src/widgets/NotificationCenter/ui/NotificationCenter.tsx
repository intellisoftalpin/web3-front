import { memo, useEffect, useRef, useState } from 'react'
import cls from './NotificationCenter.module.scss'
import classNames from 'classnames'
import Bell from 'shared/assets/icon/bell.svg'
import { useNotificationCenter } from 'react-toastify/addons/use-notification-center'
import { NotificationsDropdown } from './NotificationsDropdown/NotificationsDropdown'
import { useOutsideElement } from 'shared/lib/hooks/useOutsideElement/useOutsideElement'

interface NotificationCenterProps {
    className?: string
}

export const NotificationCenter = memo(({ className }: NotificationCenterProps) => {
    const { notifications, unreadCount, markAllAsRead } = useNotificationCenter()
    const [isDropdown, setDropdown] = useState(false)
    const ref = useRef(null)
    const outside = useOutsideElement(ref)

    useEffect(() => {
        if (outside) {
            setDropdown(false)
        }
    }, [outside])

    const openDropdown = () => {
        markAllAsRead()
        setDropdown(prevState => !prevState)
    }

    return (
        <div ref={ref} className={classNames(cls.NotificationCenter, {}, [className])}>
            <div className={cls.notificationBell} onClick={openDropdown}>
                <Bell className={cls.bell}/>
                {unreadCount > 0 &&
                    <div className={cls.countNotifications}>
                        <span>{unreadCount}</span>
                    </div>
                }

            </div>
            <NotificationsDropdown isDropdown={isDropdown} notifications={notifications}/>
        </div>
    )
})
