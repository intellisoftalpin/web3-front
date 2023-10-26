import { memo } from 'react'
import cls from './TokenItem.module.scss'
import classNames from 'classnames'
import { Button } from 'shared/ui/Button'
import { tokenActions, type TokenSchema } from 'entities/Token'
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch'
import { TokenImage } from 'shared/ui/TokenImage'

interface TokenItemProps {
    className?: string
    token: TokenSchema
    onClose: (opened: boolean) => void
}

export const TokenItem = memo((props: TokenItemProps) => {
    const { className, onClose, token } = props

    const dispatch = useAppDispatch()

    const setChosenToken = () => {
        dispatch(tokenActions.setChosenToken(token))
        onClose(false)
    }

    return (
        <Button className={classNames(cls.TokenItem, {}, [className])}
            variant="outline"
            onClick={setChosenToken}
        >
            <TokenImage logo={token.logo} policyId={token.policyId} assetId={token.assetId}/>
            <div className={cls.names}>
                <span className={cls.shortName}>{token.ticker}</span>
                <span className={cls.fullName}>{token.assetName}</span>
            </div>
        </Button>
    )
})
