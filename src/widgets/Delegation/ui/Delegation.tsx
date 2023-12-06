import { memo } from 'react'
import cls from './Delegation.module.scss'
import classNames from 'classnames'
import { DelegationPool, useGetCurrentPoolDelegatedQuery, useGetPoolsQuery } from 'entities/DelegationPool'
import { useAppSelector } from 'shared/lib/hooks/useAppSelector/useAppSelector'
import { getWallet } from 'entities/Wallet/model/selectors/getWallet/getWallet'
import { getAuth } from 'entities/Auth/model/selectors/getAuth/getAuth'
import { explorerPoolsLink } from 'shared/consts/env'

interface DelegationProps {
    className?: string
}

export const Delegation = memo(({ className }: DelegationProps) => {
    const { connected } = useAppSelector(getAuth)
    const { data: dataPools } = useGetPoolsQuery('')
    const { authHash, stakeAddress } = useAppSelector(getWallet)
    const { data: delegatedPool } = useGetCurrentPoolDelegatedQuery(authHash, { skip: !connected })

    return (
        <div className={classNames(cls.Delegation, {}, [className])}>
            {stakeAddress &&
                <div className={cls.stakeAddress}>
                    <h2>Your stake address</h2>
                    <span>{stakeAddress}</span>
                </div>
            }
            {delegatedPool &&
                <div className={cls.alreadyDelegating}>
                    <span>Already delegating: <a href={`${explorerPoolsLink}${delegatedPool.view}`} target='_blank' rel="noreferrer">
                        {delegatedPool.view}
                    </a>
                    </span>
                </div>
            }
            {dataPools?.pools.map((pool) =>
                <DelegationPool poolId={pool.poolId} key={pool.poolId} delegatedPool={delegatedPool}/>
            )}
        </div>
    )
})
