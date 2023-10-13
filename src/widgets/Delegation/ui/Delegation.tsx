import { memo } from 'react'
import cls from './Delegation.module.scss'
import classNames from 'classnames'
import { DelegationPool, useGetPoolsQuery } from 'entities/DelegationPool'

interface DelegationProps {
    className?: string
}

export const Delegation = memo(({ className }: DelegationProps) => {
    const { data: dataPools } = useGetPoolsQuery('')

    return (
        <div className={classNames(cls.Delegation, {}, [className])}>
            {dataPools?.pools.map((pool) =>
                <DelegationPool poolId={pool.poolId} key={pool.poolId}/>
            )}
        </div>
    )
})
