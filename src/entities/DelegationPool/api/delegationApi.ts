import { baseApi } from 'shared/api/baseApi'
import { type AllDelegationResponse } from 'entities/DelegationPool/model/types/delegationSchema'

const delegationApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        getPools: build.query<AllDelegationResponse, string>({
            query: () => ({
                url: 'api/v1/pools',
                method: 'GET'
            })
        })
    }),
    overrideExisting: false
})

export const {
    useGetPoolsQuery
} = delegationApi
