import { baseApi } from 'shared/api/baseApi'
import { type TokenSchema } from 'entities/Token'

const tokenApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        getTokens: build.query<TokenSchema[], string>({
            query: () => ({
                url: 'api/v1/tokens',
                method: 'GET'
            })
        })
    }),
    overrideExisting: false
})

export const {
    useGetTokensQuery
} = tokenApi
