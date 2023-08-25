import { ONE_ADA_LOVELACE_COUNT } from 'shared/consts/commissions'

export const convertToLovelaces = (adaCount: number) => {
    return adaCount * ONE_ADA_LOVELACE_COUNT
}
