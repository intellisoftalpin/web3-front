import { type FC } from 'react'
import cls from './NftTab.module.scss'
import classNames from 'classnames'

interface NftTabProps {
    className?: string
}

export const NftTab: FC<NftTabProps> = ({ className }) => {
    return (
        <div className={classNames(cls.NftTab, {}, [className])}>
            Nft tab
        </div>
    )
}
