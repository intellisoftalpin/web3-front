import { type FC } from 'react'
import cls from './DelegationPool.module.scss'
import classNames from 'classnames'
import typhon from 'shared/assets/wallets/typhon.png'
import { Button } from 'shared/ui/Button'
import { BrowserWallet, Transaction } from '@meshsdk/core'
import { LOCAL_STORAGE_WALLET_KEY } from 'shared/consts/localStorageAuthKey'
import { type LocalStorageWallet } from 'entities/Wallet/model/types/walletSchema'

interface DelegationPoolProps {
    className?: string
}

export const DelegationPool: FC<DelegationPoolProps> = ({ className }) => {
    const delegateToPool = async (poolId: string) => {
        const { walletName }: LocalStorageWallet = JSON.parse(localStorage.getItem(LOCAL_STORAGE_WALLET_KEY))
        const wallet = await BrowserWallet.enable(walletName)
        const rewardAddress = await wallet.getRewardAddresses()

        const tx = new Transaction({ initiator: wallet })
        tx.delegateStake(rewardAddress[0], poolId)

        const unsignedTx = await tx.build()
        const signedTx = await wallet.signTx(unsignedTx)
        console.log(signedTx)
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
                        <span>[BLACK] BLACK Rocket</span>
                    </div>
                    <div className={cls.poolAddress}>
                        <span>pool1q9kwa675j2z53jecrs6pn3fqsc9ypxrsypu5dgu6hammqkagy22</span>
                    </div>
                </div>
            </div>
            <div className={cls.information}>
                <div className={cls.informationItem}>
                    <span>Saturation</span>
                    <span>{'₳'}39,490.231345 (0.05%)</span>
                </div>
                <div className={cls.informationItem}>
                    <span>Pledge</span>
                    <span>{'₳'}110</span>
                </div>
                <div className={cls.informationItem}>
                    <span>Fees</span>
                    <span>0% ({'₳'}340)</span>
                </div>
                <div className={cls.informationItem}>
                    <span>ROS e12</span>
                    <span>2.25%</span>
                </div>
            </div>
            <div className={cls.delegateButton}>
                <Button className={cls.delegate} onClick={async () => { await delegateToPool('pool1fvgmxt3688a5zl6amhvaqk9tmvk3lhxkgdsta6yj3czuy5hjwfy') }}>Delegate to pool</Button>
            </div>
        </div>
    )
}
