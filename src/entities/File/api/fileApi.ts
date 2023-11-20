import { baseApi } from 'shared/api/baseApi'

export const fileApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        getFileMetadata: build.mutation<unknown[], { key: string, value: string }>({
            query: ({ key, value }) => ({
                url: `https://ctokens.io/api/v1/transactions/metadata/${key}/${value}`,
                method: 'GET'
            })
        }),
        submitFileTransaction: build.mutation<{ txHash: string }, { cbor: string }>({
            query: (data) => ({
                url: 'api/v1/proxy/transactions',
                method: 'POST',
                body: data
            })
        })
    }),
    overrideExisting: false
})
