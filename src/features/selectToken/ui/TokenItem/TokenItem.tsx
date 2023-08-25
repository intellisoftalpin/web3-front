import { type FC } from 'react'
import cls from './TokenItem.module.scss'
import classNames from 'classnames'
import { Button } from 'shared/ui/Button'
import { tokenActions, type TokenSchema } from 'entities/Token'
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch'

interface TokenItemProps {
    className?: string
    token: TokenSchema
    onClose: (opened: boolean) => void
}

export const TokenItem: FC<TokenItemProps> = (props) => {
    const {
        className,
        onClose,
        token
    } = props

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
            {token.logo &&
                <img src={token.logo}
                    alt={token.ticker}
                    className={cls.tokenItemIcon}
                />
            }
            <div className={cls.names}>
                <span className={cls.shortName}>{token.ticker}</span>
                <span className={cls.fullName}>{token.assetName}</span>
            </div>
        </Button>
    )
}
