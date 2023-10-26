export interface DelegationPoolSchema {
    fixedCost: number
    margin: string
    metadata: {
        info: {
            about: {
                company: string
                me: string
                server: string
            }
            company: {
                addr: string
                city: string
                company_id: string
                country: string
                name: string
                vat_id: string
            }
            location: string
            social: Social
            url_png_icon_64x64: string
            url_png_logo: string
        }
    }
    pledge: number
    saturation: number
    saturationPercent: number
    tickerJSON: {
        description: string
        homepage: string
        name: string
        ticker: string
    }
    tickerName: string
    view: string
}

export interface Social {
    discord_handle: string
    facebook_handle: string
    github_handle: string
    telegram_handle: string
    twitch_handle: string
    twitter_handle: string
    youtube_handle: string
}

export interface AllDelegationResponse {
    pools: Array<{ poolId: string }>
}
