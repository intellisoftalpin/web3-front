import { type FC } from 'react'
import cls from './Delegation.module.scss'
import classNames from 'classnames'
import { DelegationPool, useGetPoolsQuery } from 'entities/DelegationPool'

interface DelegationProps {
    className?: string
}

export const Delegation: FC<DelegationProps> = ({ className }) => {
    const { data: dataPools } = useGetPoolsQuery('')

    return (
        <div className={classNames(cls.Delegation, {}, [className])}>
            {dataPools?.pools.map((pool) =>
                <DelegationPool pool={pool} key={pool.poolId}/>
            )}
        </div>
    )
}
