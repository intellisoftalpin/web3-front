import { type FC } from 'react'
import cls from './AppDescription.module.scss'
import classNames from 'classnames'

interface AppDescriptionProps {
    className?: string
}

export const AppDescription: FC<AppDescriptionProps> = ({ className }) => {
    return (
        <div className={classNames(cls.AppDescription, {}, [className])}>
            <p className={cls.description}>{window?._env_?.DESCRIPTION || process.env.DESCRIPTION}:
                <a target='_blank' href={window?._env_?.LINK || process.env.LINK} className={cls.link} rel="noreferrer">{window?._env_?.LINK_TEXT || process.env.LINK_TEXT}</a>
            </p>
        </div>
    )
}
