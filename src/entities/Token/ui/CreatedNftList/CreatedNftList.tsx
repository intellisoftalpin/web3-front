import { type FC } from 'react'
import cls from './CreatedNftList.module.scss'
import classNames from 'classnames'
import { TokensList } from 'entities/Token/ui/TokensList/TokensList'
import { type Token } from 'entities/Token/model/types/tokenSchema'

interface CreatedNftListProps {
    className?: string
}

const nfts: Token[] = [
    {
        name: 'testNft1',
        description: 'BKV coin is the token minted on the Cardano blockchain just a few days after the Mary hardfork. This token is one of the oldest on the Cardano network. The token contains the spirit of the bull prepared for the bull run! :) Visit our website and Discord channel to get more info. May the Bull be with you!',
        homepageLink: 'gdsgsd',
        policy: 'fdspgffdgp[fdspgsd[gsd32fdsgdfgl;sfl;',
        ticker: 'T1',
        supply: '1',
        decimals: 4
    },
    {
        name: 'testNft2',
        description: 'test token2',
        homepageLink: 'gdsgsd',
        policy: '8bbe29d43fa1da348ccad87f4dc42105be23d54c26bc99d230df8620',
        ticker: 'T2',
        supply: '100000',
        decimals: 6
    }
]

export const CreatedNftList: FC<CreatedNftListProps> = ({ className }) => {
    return (
        <div className={classNames(cls.CreatedNftList, {}, [className])}>
            <h1>Created nfts</h1>
            <TokensList tokens={nfts}/>
        </div>
    )
}
