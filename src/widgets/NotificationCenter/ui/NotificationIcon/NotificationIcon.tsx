import { type FC } from 'react'
import cls from './NotificationIcon.module.scss'
import classNames from 'classnames'
import { Icons, type Theme, type TypeOptions } from 'react-toastify'

interface NotificationIconProps {
    className?: string
    type: TypeOptions
    theme: Theme
}

export const NotificationIcon: FC<NotificationIconProps> = ({ className, type, theme }) => {
    return (
        <>
            {type === 'info' && <Icons.info type={type} theme={theme} className={classNames(cls.NotificationIcon, [className])}/>}
            {type === 'error' && <Icons.error type={type} theme={theme} className={classNames(cls.NotificationIcon, [className])}/>}
            {type === 'warning' && <Icons.warning type={type} theme={theme} className={classNames(cls.NotificationIcon, [className])}/>}
            {type === 'success' && <Icons.success type={type} theme={theme} className={classNames(cls.NotificationIcon, [className])}/>}
        </>
    )
}
