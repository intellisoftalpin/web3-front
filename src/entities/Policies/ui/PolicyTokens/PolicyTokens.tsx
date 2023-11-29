import { type FC } from 'react'
import cls from './PolicyTokens.module.scss'
import classNames from 'classnames'
import { type Token } from '../../model/types/policiesSchema'

interface PolicyTokensProps {
    className?: string
    tokens: Token[]
}

export const PolicyTokens: FC<PolicyTokensProps> = ({ className, tokens }) => {
    return (
        <div className={classNames(cls.PolicyTokens, {}, [className])}>
            <h2>Tokens</h2>
            <div className={cls.tokens}>
                {tokens.map(item =>
                    <div className={cls.token}>
                        <img src={item.logo} alt={'logo'}/>
                        <span>{item.assetName}</span>
                        <span>{item.createdOn}</span>
                        <span>{item.decimals}</span>
                    </div>
                )}
            </div>
        </div>
    )
}
