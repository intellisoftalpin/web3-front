import { type FC } from 'react'
import cls from './CreatedTokensList.module.scss'
import classNames from 'classnames'
import { type Token } from '../../model/types/tokenSchema'
import { TokensList } from '../TokensList/TokensList'

interface CreatedTokensListProps {
    className?: string
}

const tokens: Token[] = [
    {
        name: 'test1',
        description: 'BKV coin is the token minted on the Cardano blockchain just a few days after the Mary hardfork. This token is one of the oldest on the Cardano network. The token contains the spirit of the bull prepared for the bull run! :) Visit our website and Discord channel to get more info. May the Bull be with you!',
        homepageLink: 'gdsgsd',
        policy: 'fdspgffdgp[fdspgsd[gsd32fdsgdfgl;sfl;',
        ticker: 'T1',
        supply: '100000',
        decimals: 4
    },
    {
        name: 'test2',
        description: 'test token2',
        homepageLink: 'gdsgsd',
        policy: '8bbe29d43fa1da348ccad87f4dc42105be23d54c26bc99d230df8620',
        ticker: 'T2',
        supply: '100000',
        decimals: 6
    }
]

export const CreatedTokensList: FC<CreatedTokensListProps> = ({ className }) => {
    return (
        <div className={classNames(cls.CreatedTokensList, {}, [className])}>
            <h1>Created tokens</h1>
            <TokensList tokens={tokens}/>
        </div>
    )
}
