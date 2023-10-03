import { type FC } from 'react'
import cls from './DelegationPool.module.scss'
import classNames from 'classnames'
import typhon from 'shared/assets/wallets/typhon.png'
import { Button } from 'shared/ui/Button'
import { BrowserWallet, Transaction } from '@meshsdk/core'
import { LOCAL_STORAGE_WALLET_KEY } from 'shared/consts/localStorageAuthKey'
import { type LocalStorageWallet } from 'entities/Wallet/model/types/walletSchema'
import { type DelegationPoolSchema } from 'entities/DelegationPool'
import { notify } from 'shared/lib/notify/notify'

interface DelegationPoolProps {
    className?: string
    pool: DelegationPoolSchema
}

export const DelegationPool: FC<DelegationPoolProps> = ({ className, pool }) => {
    const delegateToPool = async (poolId: string) => {
        try {
            const { walletName }: LocalStorageWallet = JSON.parse(localStorage.getItem(LOCAL_STORAGE_WALLET_KEY))
            const wallet = await BrowserWallet.enable(walletName)
            const rewardAddress = await wallet.getRewardAddresses()

            const tx = new Transaction({ initiator: wallet })
            tx.delegateStake(rewardAddress[0], poolId)

            const unsignedTx = await tx.build()
            const signedTx = await wallet.signTx(unsignedTx)
            console.log(signedTx)
        } catch (e) {
            notify(e.toString(), 'error')
        }
    }

    return (
        <div className={classNames(cls.DelegationPool, {}, [className])}>
            <div className={cls.titleInformation}>
                <div className={cls.poolNumber}>
                    <span>1616.</span>
                    <span>0</span>
                </div>
                <div className={cls.poolIcon}>
                    <img src={typhon} alt=""/>
                </div>
                <div className={cls.poolName}>
                    <div className={cls.name}>
                        <span>[{pool.ticker}] {pool.name}</span>
                    </div>
                    <div className={cls.poolAddress}>
                        <span>{pool.poolId}</span>
                    </div>
                </div>
            </div>
            <div className={cls.information}>
                <div className={cls.informationItem}>
                    <span>Saturation</span>
                    <span>{'₳'}{pool.saturation}</span>
                </div>
                <div className={cls.informationItem}>
                    <span>Pledge</span>
                    <span>{'₳'}{pool.pledge}</span>
                </div>
                <div className={cls.informationItem}>
                    <span>Fees</span>
                    <span>{pool.fee}</span>
                </div>
                <div className={cls.informationItem}>
                    <span>ROS e12</span>
                    <span>{pool.rose12}</span>
                </div>
            </div>
            <div className={cls.delegateButton}>
                <Button className={cls.delegate} onClick={async () => { await delegateToPool(pool.poolId) }}>Delegate to pool</Button>
            </div>
        </div>
    )
}
