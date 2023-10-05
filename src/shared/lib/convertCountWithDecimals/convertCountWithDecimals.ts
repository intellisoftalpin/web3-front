import { makeRegionalNumberFormat } from 'shared/lib/makeRegionalNumberFormat/makeRegionalNumberFormat'

export const convertCountWithDecimals = (count: number, decimals: number = 0) => {
    if (decimals) {
        return makeRegionalNumberFormat((count / 10 ** decimals), decimals)
    } else {
        return makeRegionalNumberFormat((count), 0)
    }
}
