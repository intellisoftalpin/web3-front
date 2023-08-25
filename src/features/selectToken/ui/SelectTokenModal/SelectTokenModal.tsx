import { type FC } from 'react'
import cls from './SelectTokenModal.module.scss'
import classNames from 'classnames'
import { Modal } from 'shared/ui/Modal'
import { TokensList } from 'features/selectToken/ui/TokensList/TokensList'
import { useTranslation } from 'react-i18next'
import { type TokenSchema } from 'entities/Token'

interface SelectTokenModalProps {
    className?: string
    opened: boolean
    onClose: (opened: boolean) => void
    tokens: TokenSchema[]
}

export const SelectTokenModal: FC<SelectTokenModalProps> = (props) => {
    const { t } = useTranslation()
    const {
        className,
        opened,
        onClose,
        tokens
    } = props

    return (
        <Modal opened={opened} onClose={onClose} className={classNames(cls.SelectTokenModal, [className])}>
            <h1>{t('Select the asset')}</h1>
            <TokensList onClose={onClose} tokens={tokens}/>
        </Modal>
    )
}
