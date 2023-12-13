import { memo } from 'react'
import cls from './DelegationPool.module.scss'
import classNames from 'classnames'
import { Button } from 'shared/ui/Button'
import { BrowserWallet, Transaction } from '@meshsdk/core'
import { LOCAL_STORAGE_WALLET_KEY } from 'shared/consts/localStorageAuthKey'
import { type LocalStorageWallet } from 'entities/Wallet/model/types/walletSchema'
import {
    type DelegationPoolSchema,
    useDelegateToPoolMutation,
    useGetPoolByIdQuery
} from 'entities/DelegationPool'
import { convertToAda } from 'shared/lib/convertToAda/convertToAda'
import { convertCountWithDecimals } from 'shared/lib/convertCountWithDecimals/convertCountWithDecimals'
import { SocialLinks } from './SocialLinks/SocialLinks'
import { Tooltip } from 'shared/ui/Tooltip'
import { toast } from 'react-toastify'
import { explorerPoolsLink } from 'shared/consts/env'
import { CheckAuthButton } from 'widgets/CheckAuthButton'

interface DelegationPoolProps {
    className?: string
    poolId: string
    delegatedPool?: DelegationPoolSchema
}

export const DelegationPool = memo(({ className, poolId, delegatedPool }: DelegationPoolProps) => {
    const { data: pool } = useGetPoolByIdQuery(poolId)
    const [conductDelegation] = useDelegateToPoolMutation()

    const delegateToPool = async (poolId: string) => {
        try {
            const { walletName }: LocalStorageWallet = JSON.parse(localStorage.getItem(LOCAL_STORAGE_WALLET_KEY) as string)
            const wallet = await BrowserWallet.enable(walletName)
            const rewardAddress = await wallet.getRewardAddresses()

            const tx = new Transaction({ initiator: wallet })
            tx.delegateStake(rewardAddress[0], poolId)

            const unsignedTx = await tx.build()
            const signedTx = await wallet.signTx(unsignedTx).catch((data: Error) => {
                toast(data.message, { type: 'error' })
            })
            if (signedTx) {
                await conductDelegation({ cbor: signedTx }).then(() => {
                    toast('Delegation transaction successfully created', { type: 'success' })
                })
            }
        } catch (e: any) {
            toast(e.message, { type: 'error' })
        }
    }

    return (
        <>
            {pool &&
                <div className={classNames(cls.DelegationPool, {}, [className])}>
                    <div className={cls.titleInformation}>
                        <div className={cls.poolIcon}>
                            <img src={pool.metadata.info.url_png_icon_64x64} alt="poolLogo"/>
                        </div>
                        <div className={cls.poolName}>
                            <div className={cls.name}>
                                <a href={pool.tickerJSON.homepage} target='_blank' rel="noreferrer">[{pool.tickerJSON.ticker}] {pool.tickerJSON.name}</a>
                                <SocialLinks social={pool.metadata.info.social} homepage={pool.tickerJSON.homepage}/>
                            </div>
                            <div className={cls.poolAddress}>
                                <a href={`${explorerPoolsLink}${pool.view}`} target='_blank' rel="noreferrer">{pool.view}</a>
                            </div>
                        </div>
                    </div>
                    <div className={cls.description}>
                        <p>{pool.tickerJSON.description}</p>
                    </div>
                    <div className={cls.information}>
                        <div className={cls.informationItem}>
                            <div className={cls.tooltip}>
                                <span>Saturation</span>
                                <Tooltip text={'Saturation is a term used to indicate that a particular stake pool has more stake delegated to it than is ideal for the network'} id={'saturation'}/>
                            </div>
                            <span>{'₳'}{convertCountWithDecimals(convertToAda(pool.saturation))} ({pool.saturationPercent}%)</span>
                        </div>
                        <div className={cls.informationItem}>
                            <div className={cls.tooltip}>
                                <span>Pledge</span>
                                <Tooltip text={'This pool meets the registered pledge and earn rewards'} id={'pledge'}/>
                            </div>
                            <span>{'₳'}{convertCountWithDecimals(convertToAda(+pool.pledge))}</span>
                        </div>
                        <div className={cls.informationItem}>
                            <div className={cls.tooltip}>
                                <span>Fees</span>
                                <Tooltip text={'Variable margin fee (fixed cost)'} id={'fees'}/>
                            </div>
                            <span>{pool.margin}% ({'₳'}{convertCountWithDecimals(convertToAda(pool.fixedCost))})</span>
                        </div>
                        {/* <div className={cls.informationItem}> */}
                        {/*    <span>ROS e12</span> */}
                        {/*    <span>{pool.rose12}</span> */}
                        {/* </div> */}
                    </div>
                    <CheckAuthButton>
                        { delegatedPool && delegatedPool?.view === pool.view
                            ? <span className={cls.delegated}>Already delegated</span>
                            : <Button className={cls.delegate} onClick={async () => { await delegateToPool(pool.view) }}>Delegate to pool</Button>}
                    </CheckAuthButton>
                </div>
            }
        </>
    )
})
