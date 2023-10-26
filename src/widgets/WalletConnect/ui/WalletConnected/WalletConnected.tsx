import { memo, useEffect, useRef, useState } from 'react'
import cls from './WalletConnected.module.scss'
import classNames from 'classnames'
import Arrow from 'shared/assets/icon/arrowSelect.svg'
import { WalletDropdown } from '../WalletDropdown/WalletDropdown'
import { useAppSelector } from 'shared/lib/hooks/useAppSelector/useAppSelector'
import { getWallet } from 'entities/Wallet/model/selectors/getWallet/getWallet'
import { useOutsideElement } from 'shared/lib/hooks/useOutsideElement/useOutsideElement'
import { shortFormatText } from 'shared/lib/shortFormatText/shortFormatText'
import { useTranslation } from 'react-i18next'

interface WalletConnectedProps {
    className?: string
}

export const WalletConnected = memo(({ className }: WalletConnectedProps) => {
    const { t } = useTranslation()
    const { icon, balance, address } = useAppSelector(getWallet)

    const blockRef = useRef(null)

    const outsideElement = useOutsideElement(blockRef)

    const [openedDropdown, setOpenedDropdown] = useState(false)

    const toggleDropdown = () => {
        setOpenedDropdown(prevState => !prevState)
    }

    useEffect(() => {
        if (outsideElement) setOpenedDropdown(false)
    }, [outsideElement])

    return (
        <div className={classNames(cls.WalletConnected, {}, [className])} ref={blockRef}>
            <div className={cls.wallet} onClick={toggleDropdown}>
                <div className={cls.balance}>
                    <span className={cls.available}>{t('Available Balance')}:</span>
                    <span>{'₳'}{balance}</span>
                </div>
                <div className={cls.address}>
                    <img src={icon} alt="walletIcon"/>
                    <span>{shortFormatText(address, 9)}</span>
                </div>
                <Arrow className={classNames(cls.arrow, { [cls.arrowOpened]: openedDropdown }) }/>
            </div>
            <WalletDropdown openedDropdown={openedDropdown}/>
        </div>
    )
})
