import { baseApi } from 'shared/api/baseApi'
import { type AllDelegationResponse, type DelegationPoolSchema } from 'entities/DelegationPool/model/types/delegationSchema'

const delegationApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        getPools: build.query<AllDelegationResponse, string>({
            query: () => ({
                url: 'api/v1/pools',
                method: 'GET'
            })
        }),
        delegateToPool: build.mutation<string, { cbor: string }>({
            query: (body) => ({
                url: 'api/v1/pools/delegate',
                method: 'POST',
                body: { cbor: body.cbor }
            })
        }),
        getPoolById: build.query<DelegationPoolSchema, string>({
            query: (poolId: string) => ({
                url: `https://ctokens.io/api/v1/pools/${poolId}`,
                method: 'GET'
            })
        }),
        getCurrentPoolDelegated: build.query<DelegationPoolSchema, string>({
            query: (stakeAddress: string) => ({
                url: `https://ctokens.io/api/v1/pools/stake/${stakeAddress}`,
                method: 'GET'
            })
        })

    }),
    overrideExisting: false
})

export const {
    useGetPoolsQuery,
    useGetPoolByIdQuery,
    useGetCurrentPoolDelegatedQuery,
    useDelegateToPoolMutation
} = delegationApi
