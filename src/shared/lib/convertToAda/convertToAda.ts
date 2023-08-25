import { ONE_ADA_LOVELACE_COUNT } from 'shared/consts/commissions'

export const convertToAda = (lovalaces: number) => {
    return +((lovalaces / ONE_ADA_LOVELACE_COUNT).toFixed(6))
}
