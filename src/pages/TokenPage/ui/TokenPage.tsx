import { memo, useMemo } from 'react'
import classNames from 'classnames'
import cls from './TokenPage.module.scss'
import { useAppSelector } from 'shared/lib/hooks/useAppSelector/useAppSelector'
import { getAuth } from 'entities/Auth/model/selectors/getAuth/getAuth'
import { getWallet } from 'entities/Wallet/model/selectors/getWallet/getWallet'
import { tokenAssetId } from 'shared/consts/env'

interface TokenPageProps {
    className?: string
}

const TokenPage = memo((props: TokenPageProps) => {
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
                    <h1>Secret page</h1>
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

export default TokenPage
