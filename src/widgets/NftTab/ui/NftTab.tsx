import { type FC } from 'react'
import cls from './NftTab.module.scss'
import classNames from 'classnames'
import { CreateNftForm } from 'features/createNftForm'
import { CreatedNftList } from 'entities/Token'

interface NftTabProps {
    className?: string
}

export const NftTab: FC<NftTabProps> = ({ className }) => {
    return (
        <div className={classNames(cls.NftTab, {}, [className])}>
            <CreateNftForm className={cls.createNftForm}/>
            <div className={cls.createdNfts}>
                <CreatedNftList/>
            </div>
        </div>
    )
}
