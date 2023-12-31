import { memo } from 'react'
import cls from './Navbar.module.scss'
import classNames from 'classnames'
import { createRoutes } from 'shared/config/routesConfig/routesConfig'
import { AppLink } from 'shared/ui/AppLink'
import { useTranslation } from 'react-i18next'
import { ThemeSwitcher } from 'widgets/ThemeSwitcher'
import { WalletConnect } from 'widgets/WalletConnect'
import { NotificationCenter } from 'widgets/NotificationCenter'

interface NavbarProps {
    className?: string
}

export const Navbar = memo(({ className }: NavbarProps) => {
    const { t } = useTranslation()

    return (
        <header className={classNames(cls.Navbar, {}, [className])}>
            <nav className={cls.appLinks}>
                {createRoutes().map(item =>
                    <AppLink to={item.path || ''} key={item.id}>
                        {t(item.id)}
                    </AppLink>
                )}
            </nav>
            <div className={cls.appFeatures}>
                <WalletConnect/>
                <ThemeSwitcher/>
                {/* <LangSwitcher/> */}
                <NotificationCenter/>
            </div>
        </header>
    )
})
