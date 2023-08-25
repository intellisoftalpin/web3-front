declare module '*.scss' {
    type IClassNames = Record<string, string>

    const classNames: IClassNames
    export = classNames
}

declare module '*.png'
declare module '*.jpg'
declare module '*.jpeg'
declare module '*.svg' {
    import type React from 'react'
    const SVG: React.VFC<React.SVGProps<SVGSVGElement>>
    export default SVG
}

declare const __IS_DEV__: boolean

declare interface Window {
    _env_: {
        BACKEND_URL_KEY: string
        WALLET_NETWORK_KEY: string
    }
}
