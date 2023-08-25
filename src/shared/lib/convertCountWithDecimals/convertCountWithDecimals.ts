import { makeRegionalNumberFormat } from 'shared/lib/makeRegionalNumberFormat/makeRegionalNumberFormat'

export const convertCountWithDecimals = (count: number, decimals: number) => {
    return makeRegionalNumberFormat((count / 10 ** decimals), decimals)
}
