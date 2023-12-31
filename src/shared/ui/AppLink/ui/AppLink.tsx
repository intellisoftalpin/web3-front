import { memo, type ReactNode } from 'react'
import cls from './AppLink.module.scss'
import classNames from 'classnames'
import { NavLink } from 'react-router-dom'

interface AppLinkProps {
    to: string
    className?: string
    children: ReactNode
}

export const AppLink = memo((props: AppLinkProps) => {
    const { className, to, children } = props

    return (
        <NavLink
            to={to}
            className={({ isActive }) => classNames(cls.AppLink, { [cls.active]: isActive }, [className])}
        >
            {children}
        </NavLink>
    )
})
