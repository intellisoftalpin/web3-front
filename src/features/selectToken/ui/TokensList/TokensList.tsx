import { type FC } from 'react'
import cls from './TokensList.module.scss'
import classNames from 'classnames'
import { TokenItem } from '../TokenItem/TokenItem'
import { type TokenSchema } from 'entities/Token'

interface TokensListProps {
    className?: string
    onClose: (opened: boolean) => void
    tokens: TokenSchema[]
}

export const TokensList: FC<TokensListProps> = ({ className, onClose, tokens }) => {
    return (
        <div className={classNames(cls.TokensList, {}, [className])}>
            {tokens.map((item: TokenSchema) =>
                <TokenItem token={item} key={item.policyId + item.assetId} onClose={onClose}/>
            )}
        </div>
    )
}
