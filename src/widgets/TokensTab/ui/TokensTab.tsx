import { type FC } from 'react'
import cls from './TokensTab.module.scss'
import classNames from 'classnames'
import { CreateTokenForm } from 'features/createToken'
import { CreatedTokensList } from 'entities/Token'

interface TokensTabProps {
    className?: string
}

export const TokensTab: FC<TokensTabProps> = ({ className }) => {
    return (
        <div className={classNames(cls.TokensTab, {}, [className])}>
            <CreateTokenForm className={cls.createTokensForm}/>
            <div className={cls.createdTokens}>
                <CreatedTokensList/>
            </div>
        </div>
    )
}
