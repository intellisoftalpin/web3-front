import { memo, useState } from 'react'
import cls from './TokenImage.module.scss'
import classNames from 'classnames'
import NotImage from 'shared/assets/icon/notImage.svg'

interface TokenImageProps {
    className?: string
    logo?: string
    policyId: string
    assetId: string
}

export const TokenImage = memo((props: TokenImageProps) => {
    const { className, logo, policyId, assetId } = props
    const altSrc = `https://ctokens.io/api/v1/tokens/images/${policyId}.${assetId}.png`

    const [altImage, setAltImage] = useState(true)

    return (
        <>
            {altImage && <img src={altSrc} onError={() => { setAltImage(false) }} alt='tokenImage' className={classNames(cls.TokenImage, {}, [className])}/>}
            {(!altImage && logo) && <img src={logo} alt="tokenImage" className={classNames(cls.TokenImage, {}, [className])}/>}
            {(!altImage && !logo) && <NotImage className={classNames(cls.TokenImage, {}, [className, cls.NotImage])}/>}
        </>
    )
})
