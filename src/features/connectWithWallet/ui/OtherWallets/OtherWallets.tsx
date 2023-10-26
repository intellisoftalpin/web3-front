import { memo, useEffect, useState } from 'react'
import cls from './OtherWallets.module.scss'
import classNames from 'classnames'
import Arrow from 'shared/assets/icon/arrow.svg'
import typhon from 'shared/assets/wallets/typhon.png'
import flint from 'shared/assets/wallets/flint.png'
import nami from 'shared/assets/wallets/nami.png'
import { BrowserWallet } from '@meshsdk/core'
import { useTranslation } from 'react-i18next'

interface OtherWalletsProps {
    className?: string
}

interface wallet {
    name: string
    icon: string
    link: string
}

const walletList: wallet[] = [
    {
        name: 'Typhon Wallet',
        icon: typhon,
        link: 'https://typhonwallet.io/#/download'
    },
    {
        name: 'Flint Wallet',
        icon: flint,
        link: 'https://flint-wallet.com/'
    },
    {
        name: 'Nami',
        icon: nami,
        link: 'https://namiwallet.io/'
    }
]

export const OtherWallets = memo(({ className }: OtherWalletsProps) => {
    const { t } = useTranslation()

    const [openWallets, setOpenWallets] = useState(false)

    const installedWallets = BrowserWallet.getInstalledWallets()

    const sortedWallets: wallet[] = walletList.filter(item => !installedWallets.find(instWallet => instWallet.name === item.name))

    const openHandler = () => { setOpenWallets(state => !state) }

    useEffect(() => {
        if (installedWallets.length === 0) {
            setOpenWallets(true)
        }
    }, [installedWallets.length])

    if (sortedWallets.length === 0) return null

    return (
        <div className={classNames(cls.OtherWallets, {}, [className])}>
            {installedWallets.length > 0 &&
                <div className={cls.header} onClick={openHandler}>
                    <span>{t('Other wallets')}:</span>
                    <div className={cls.arrowBlock}>
                        <Arrow className={classNames(cls.arrow, { [cls.arrowActive]: openWallets })}/>
                    </div>
                </div>
            }
            {openWallets &&
                <div className={cls.wallets}>
                    {sortedWallets.map(item =>
                        <a href={item.link} target="_blank" key={item.name} className={cls.button} rel="noreferrer">
                            <img src={item.icon} alt=""/>
                            <span>{item.name}</span></a>
                    )}
                </div>
            }
        </div>
    )
})
