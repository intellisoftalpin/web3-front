import { type FC } from 'react'
import cls from './TokensTab.module.scss'
import classNames from 'classnames'

interface TokensTabProps {
    className?: string
}

export const TokensTab: FC<TokensTabProps> = ({ className }) => {
    return (
        <div className={classNames(cls.TokensTab, {}, [className])}>
            Tokens tab
        </div>
    )
}
