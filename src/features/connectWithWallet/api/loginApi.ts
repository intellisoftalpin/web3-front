import { baseApi } from 'shared/api/baseApi'
import { type LoginSchemaParams, type LoginSchemaResponse } from 'features/connectWithWallet/model/types/loginSchema'

export const loginApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        login: build.mutation<LoginSchemaResponse, LoginSchemaParams>({
            query: ({ userHash, userRuntime }) => ({
                url: 'api/v1/user/login',
                method: 'POST',
                body: {
                    userHash,
                    userRuntime
                }
            })
        })
    }),
    overrideExisting: false
})

export const { useLoginMutation } = loginApi
