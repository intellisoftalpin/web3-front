import { type PoliciesSchema } from '../model/types/policiesSchema'
import image from 'shared/assets/wallets/typhon.png'

export const policiesData: PoliciesSchema = {
    policies: [
        {
            name: 'test1',
            expiredDate: '19.05.2112',
            policyId: 'ds32rf3gf3rfc23rfrbe3rfw2t43gewdf34w4egt4rfdwg3ewedg5r2gfd',
            tokens: [
                { assetName: 'test1', createdOn: '19.06.2023', decimals: 3, logo: image, policyId: 'ds32rf3gf3rfc23rfrbe3rfw2t43gewdf34w4egt4rfdwg3ewedg5r2gfd', assetId: '3213123', assetUnit: 't1' },
                { assetName: 'test2', createdOn: '19.06.2023', decimals: 3, logo: image, policyId: 'ds32rf3gf3rfc23rfrbe3rfw2t43gewdf34w4egt4rfdwg3ewedg5r2gfd', assetId: '3213123', assetUnit: 't32' },
                { assetName: 'test3', createdOn: '19.06.2023', decimals: 3, logo: image, policyId: 'ds32rf3gf3rfc23rfrbe3rfw2t43gewdf34w4egt4rfdwg3ewedg5r2gfd', assetId: '3213123', assetUnit: 't3' }
            ]
        },
        {
            name: 'test2',
            expiredDate: '19.05.2111',
            policyId: 'flfkekenjbkedlbenbelbenblebneblenbelbenelnelblbeenblbeneblbenl',
            tokens: [
                { assetName: 'test1', createdOn: '19.06.2023', decimals: 3, logo: image, policyId: 'ds32rf3gf3rfc23rfrbe3rfw2t43gewdf34w4egt4rfdwg3ewedg5r2gfd', assetId: '3213123', assetUnit: 't1' },
                { assetName: 'test2', createdOn: '19.06.2023', decimals: 3, logo: image, policyId: 'ds32rf3gf3rfc23rfrbe3rfw2t43gewdf34w4egt4rfdwg3ewedg5r2gfd', assetId: '3213123', assetUnit: 't32' },
                { assetName: 'test3', createdOn: '19.06.2023', decimals: 3, logo: image, policyId: 'ds32rf3gf3rfc23rfrbe3rfw2t43gewdf34w4egt4rfdwg3ewedg5r2gfd', assetId: '3213123', assetUnit: 't3' }
            ]
        },
        {
            name: 'test3',
            expiredDate: '19.05.2113',
            policyId: 'kffkeogererpbymirmibhpmotyupmprouoprupynurm[nmiutryonurpmyinumrp',
            tokens: [
                { assetName: 'test1', createdOn: '19.06.2023', decimals: 3, logo: image, policyId: 'ds32rf3gf3rfc23rfrbe3rfw2t43gewdf34w4egt4rfdwg3ewedg5r2gfd', assetId: '3213123', assetUnit: 't1' },
                { assetName: 'test2', createdOn: '19.06.2023', decimals: 3, logo: image, policyId: 'ds32rf3gf3rfc23rfrbe3rfw2t43gewdf34w4egt4rfdwg3ewedg5r2gfd', assetId: '3213123', assetUnit: 't32' },
                { assetName: 'test3', createdOn: '19.06.2023', decimals: 3, logo: image, policyId: 'ds32rf3gf3rfc23rfrbe3rfw2t43gewdf34w4egt4rfdwg3ewedg5r2gfd', assetId: '3213123', assetUnit: 't3' }
            ]
        }
    ]
}
