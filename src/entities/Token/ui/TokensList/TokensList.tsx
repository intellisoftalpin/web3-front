import { type FC } from 'react'
import cls from './TokensList.module.scss'
import classNames from 'classnames'
import { type Token } from '../../model/types/tokenSchema'
import Web from 'shared/assets/social/web.svg'

interface TokensListProps {
    className?: string
    tokens: Token[]
}

export const TokensList: FC<TokensListProps> = ({ className, tokens }) => {
    return (
        <div className={classNames(cls.TokensList, {}, [className])}>
            {tokens.map(item =>
                <div className={cls.token}>
                    <div className={cls.item}>
                        <span>{item.name} ({item.ticker})</span>
                        <a href={item.homepageLink}>
                            <Web className={cls.web}/>
                        </a>
                    </div>
                    <div className={cls.item}>
                        <span>Policy:</span>
                        <span>{item.policy}</span>
                    </div>
                    <div className={cls.item}>
                        <span>Decimals:</span>
                        <span>{item.decimals}</span>
                    </div>
                    <div className={cls.item}>
                        <span>Total supply:</span>
                        <span>{item.supply}</span>
                    </div>
                    <div className={cls.item}>
                        <span>Description:</span>
                        <span>{item.description}</span>
                    </div>
                </div>
            )}
        </div>
    )
}
