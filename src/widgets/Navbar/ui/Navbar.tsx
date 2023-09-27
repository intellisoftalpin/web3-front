import { type FC } from 'react'
import cls from './Navbar.module.scss'
import classNames from 'classnames'
import { RoutesPath } from 'shared/config/routesConfig/routesConfig'
import { AppLink } from 'shared/ui/AppLink'
import { useTranslation } from 'react-i18next'
import { LangSwitcher } from 'widgets/LangSwitcher'
import { ThemeSwitcher } from 'widgets/ThemeSwitcher'
import { WalletConnect } from 'widgets/WalletConnect'
import { NotificationCenter } from 'widgets/NotificationCenter'

interface NavbarProps {
    className?: string
}

export const Navbar: FC<NavbarProps> = ({ className }) => {
    const { t } = useTranslation()

    return (
        <header className={classNames(cls.Navbar, {}, [className])}>
            <nav className={cls.appLinks}>
                <AppLink to={RoutesPath.trade}>
                    {t('Buy')}
                </AppLink>
                <AppLink to={RoutesPath.delegate}>
                    {t('Delegate')}
                </AppLink>
            </nav>
            <div className={cls.appFeatures}>
                <WalletConnect/>
                <ThemeSwitcher/>
                <LangSwitcher/>
                <NotificationCenter/>
            </div>
        </header>
    )
}
