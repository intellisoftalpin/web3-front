import { type FC } from 'react'
import cls from './DelegationPool.module.scss'
import classNames from 'classnames'
import { Button } from 'shared/ui/Button'
import { BrowserWallet, Transaction } from '@meshsdk/core'
import { LOCAL_STORAGE_WALLET_KEY } from 'shared/consts/localStorageAuthKey'
import { type LocalStorageWallet } from 'entities/Wallet/model/types/walletSchema'
import { notify } from 'shared/lib/notify/notify'
import {
    useDelegateToPoolMutation,
    useGetCurrentPoolDelegatedQuery,
    useGetPoolByIdQuery
} from 'entities/DelegationPool'
import { convertToAda } from 'shared/lib/convertToAda/convertToAda'
import { convertCountWithDecimals } from 'shared/lib/convertCountWithDecimals/convertCountWithDecimals'
import { getAuth } from 'entities/Auth/model/selectors/getAuth/getAuth'
import { useAppSelector } from 'shared/lib/hooks/useAppSelector/useAppSelector'
import { getWallet } from 'entities/Wallet/model/selectors/getWallet/getWallet'

interface DelegationPoolProps {
    className?: string
    poolId: string
}

export const DelegationPool: FC<DelegationPoolProps> = ({ className, poolId }) => {
    const { connected } = useAppSelector(getAuth)
    const { authHash } = useAppSelector(getWallet)
    const { data: pool } = useGetPoolByIdQuery(poolId)
    const { data: delegatedPool } = useGetCurrentPoolDelegatedQuery(authHash, { skip: !connected })
    const [conductDelegation] = useDelegateToPoolMutation()

    const delegateToPool = async (poolId: string) => {
        try {
            const { walletName }: LocalStorageWallet = JSON.parse(localStorage.getItem(LOCAL_STORAGE_WALLET_KEY))
            const wallet = await BrowserWallet.enable(walletName)
            const rewardAddress = await wallet.getRewardAddresses()

            console.log(rewardAddress)

            const tx = new Transaction({ initiator: wallet })
            tx.delegateStake(rewardAddress[0], poolId)

            const unsignedTx = await tx.build()
            const signedTx = await wallet.signTx(unsignedTx)
            await conductDelegation({ cbor: signedTx })
        } catch (e) {
            notify(e.toString(), 'error')
        }
    }

    if (pool) {
        return (
            <div className={classNames(cls.DelegationPool, {}, [className])}>
                <div className={cls.titleInformation}>
                    <div className={cls.poolIcon}>
                        <img src={pool.metadata.info.url_png_icon_64x64} alt="poolLogo"/>
                    </div>
                    <div className={cls.poolName}>
                        <div className={cls.name}>
                            <a href={pool.tickerJSON.homepage} target='_blank' rel="noreferrer">[{pool.tickerJSON.ticker}] {pool.tickerJSON.name}</a>
                            {/* <SocialLinks social={pool.metadata.info.social}/> */}
                        </div>
                        <div className={cls.poolAddress}>
                            <a href={`https://cardanoscan.io/pool/${pool.view}`} target='_blank' rel="noreferrer" >{pool.view}</a>
                        </div>
                    </div>
                </div>
                <div className={cls.description}>
                    <p>{pool.tickerJSON.description}</p>
                </div>
                <div className={cls.information}>
                    <div className={cls.informationItem}>
                        <span>Saturation</span>
                        <span>{'₳'}{convertCountWithDecimals(convertToAda(pool.saturation))} ({pool.saturationPercent}%)</span>
                    </div>
                    <div className={cls.informationItem}>
                        <span>Pledge</span>
                        <span>{'₳'}{convertCountWithDecimals(convertToAda(+pool.pledge))}</span>
                    </div>
                    <div className={cls.informationItem}>
                        <span>Fees</span>
                        <span>{pool.margin}% ({'₳'}{convertCountWithDecimals(convertToAda(pool.fixedCost))})</span>
                    </div>
                    {/* <div className={cls.informationItem}> */}
                    {/*    <span>ROS e12</span> */}
                    {/*    <span>{pool.rose12}</span> */}
                    {/* </div> */}
                </div>
                {(connected && delegatedPool) &&
                    <div className={cls.delegateButton}>
                        {delegatedPool.view === pool.view
                            ? <span className={cls.delegated}>Already delegated</span>
                            : <Button className={cls.delegate} onClick={async () => { await delegateToPool(pool.view) }}>Delegate to pool</Button>
                        }

                    </div>
                }
            </div>
        )
    }
}
