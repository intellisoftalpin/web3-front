import { type FC, useEffect } from 'react'
import cls from './WalletSelection.module.scss'
import classNames from 'classnames'
import { BrowserWallet } from '@meshsdk/core'
import { Button } from 'shared/ui/Button'
import { useLoginMutation } from '../../api/loginApi'
import { SIGNATURE_PAYLOAD } from '../../model/consts/signaturePayload'
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch'
import { walletActions } from 'entities/Wallet'
import { LOCAL_STORAGE_SESSION_AUTH_KEY, LOCAL_STORAGE_WALLET_KEY } from 'shared/consts/localStorageAuthKey'
import { type LocalStorageWallet } from 'entities/Wallet/model/types/walletSchema'
import { authActions } from 'entities/Auth/model/slice/authSlice'
import { useTranslation } from 'react-i18next'
import { notify } from 'shared/lib/notify/notify'

interface WalletItem {
    name: string
    icon: string
}

interface WalletChooseProps {
    className?: string
    onClose: (active: boolean) => void
}

export const WalletSelection: FC<WalletChooseProps> = ({
    className,
    onClose
}) => {
    const { t } = useTranslation()
    const [login, { data: loginResponse }] = useLoginMutation()
    const availableWallets: WalletItem[] = BrowserWallet.getInstalledWallets()

    const sortedWallets = availableWallets.filter((el, id) => {
        return availableWallets.map((item) => item.name).indexOf(el.name) === id
    })

    const dispatch = useAppDispatch()

    const connectToWallet = async (walletInformation: WalletItem) => {
        const { name, icon } = walletInformation
        try {
            const wallet = await BrowserWallet.enable(name)
            const changeAddress = await wallet.getChangeAddress()
            const { signature } = await wallet.signData(changeAddress, SIGNATURE_PAYLOAD)

            const walletInformation: LocalStorageWallet = { walletName: name, icon, authHash: signature }

            await login({ userHash: signature })
                .then(() => {
                    dispatch(walletActions.connectWallet(walletInformation))
                    dispatch(authActions.auth({ connected: true }))
                    localStorage.setItem(LOCAL_STORAGE_WALLET_KEY, JSON.stringify(walletInformation))
                    onClose(false)
                })
        } catch (e: unknown) {
            notify(JSON.stringify(e), 'error')
        }
    }

    useEffect(() => {
        if (loginResponse) {
            localStorage.setItem(LOCAL_STORAGE_SESSION_AUTH_KEY, loginResponse.sessionAuthorizationKey)
        }
    }, [loginResponse])

    if (availableWallets.length === 0) return null

    return (
        <div className={classNames(cls.WalletChoose, {}, [className])}>
            <span className={cls.headerText}>{t('Available Wallets')}:</span>
            {sortedWallets.map(item =>
                <Button variant="outline"
                    key={item.name}
                    className={cls.button}
                    onClick={async () => {
                        await connectToWallet({
                            name: item.name,
                            icon: item.icon
                        })
                    }}>
                    <img src={item.icon} alt="" className={cls.icon}/>
                    <span>{item.name}</span>
                </Button>
            )}
        </div>
    )
}
