import { memo, useMemo } from 'react'
import classNames from 'classnames'
import cls from './SecretPage.module.scss'
import { useAppSelector } from 'shared/lib/hooks/useAppSelector/useAppSelector'
import { getAuth } from 'entities/Auth/model/selectors/getAuth/getAuth'
import { getWallet } from 'entities/Wallet/model/selectors/getWallet/getWallet'
import { tokenAssetId } from 'shared/consts/env'

interface TokenPageProps {
    className?: string
}

const SecretPage = memo((props: TokenPageProps) => {
    const { className } = props

    const { connected } = useAppSelector(getAuth)
    const { tokens } = useAppSelector(getWallet)

    const validToken = useMemo(() => {
        return connected && !!tokens.find(item => item.unit === tokenAssetId)
    }, [connected, tokens])

    return (
        <div className={classNames(cls.TokenPage, {}, [className])}>
            {validToken
                ? <div className={cls.secretBlock}>
                    <h1>Welcome to Your Exclusive Demo Page!</h1>
                    <p className={cls.block}>Greetings! You've landed on a special demo page designed to showcase the unique experience of accessing privileged content through Cardano wallet authentication. This is a simulated environment, giving you a taste of the exclusivity and advanced features our platform offers to its valued members.</p>
                    <p className={cls.block}>Experience the Future – A Demo Overview
                        Simulation of Secure Access: While this is a demo, it's designed to replicate the secure process users undergo when connecting their Cardano wallet. Experience how easy and secure it is to access exclusive content.</p>
                    <p className={cls.block}>Preview of Exclusive Content: Get a glimpse of the type of premium content, discussions, and opportunities that become available upon actual secure login with the required Cardano token.</p>
                    <p className={cls.block}>What You Would Typically Find Here
                        Latest Updates & Insights: In a real scenario, this section would be filled with cutting-edge insights and the latest news from the blockchain world, exclusively for our members.</p>
                    <p className={cls.block}>Interactive Community Features: Imagine engaging with interactive polls, discussions, and feedback channels, contributing to the community's growth and direction.</p>
                    <p className={cls.block}>Early Access & Special Offers: This area would typically offer early access to upcoming projects, special member discounts, and more.</p>
                    <p className={cls.block}>Enhanced Security Features: While this is just a simulation, our platform is committed to ensuring the utmost security and privacy for our users in the actual environment.</p>
                    <h1>Demo Disclaimer</h1>
                    <p className={cls.block}>Please note that this is a demo page, and all content, interactions, and features are simulated for demonstration purposes. No actual transactions or secure connections are taking place. This is an opportunity to visualize and understand how the platform operates and the value it offers to its users upon actual login.</p>
                    <p className={cls.block}>We hope you enjoy this simulated journey into what's possible when technology meets community. If you have any questions or would like a detailed walkthrough, our team is here to assist.</p>
                </div>
                : <div className={cls.withoutConnectBlock}>
                    <p>
                        You need to connect a wallet and have a token with the following assetId - {tokenAssetId}
                    </p>
                </div>
            }

        </div>
    )
})

export default SecretPage
