import { memo } from 'react'
import cls from './AppDescription.module.scss'
import classNames from 'classnames'
import InformationLogo from 'shared/assets/icon/informationIcon.svg'

interface AppDescriptionProps {
    className?: string
}

export const AppDescription = memo(({ className }: AppDescriptionProps) => {
    return (
        <div className={classNames(cls.AppDescription, {}, [className])}>
            <div className={cls.blockDescription}>
                <InformationLogo className={cls.logo}/>
                <h2>Information</h2>
                <p className={cls.description}>
                    {window?._env_?.DESCRIPTION || process.env.DESCRIPTION}
                    <a target='_blank' href={window?._env_?.LINK || process.env.LINK} className={cls.link} rel="noreferrer">{window?._env_?.LINK_TEXT || process.env.LINK_TEXT}</a>
                </p>
            </div>
        </div>
    )
})
