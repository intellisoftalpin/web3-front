import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react'
import { apiSettings } from 'shared/config/apiSettings/apiSettings'
import { LOCAL_STORAGE_SESSION_AUTH_KEY } from 'shared/consts/localStorageAuthKey'
import { authActions } from 'entities/Auth/model/slice/authSlice'

type BaseQueryType = ReturnType<typeof fetchBaseQuery>

const baseQueryWithReauth: (baseQuery: BaseQueryType) => BaseQueryType = (
    baseQuery
) => async (args, api, extraOptions) => {
    const result = await baseQuery(args, api, extraOptions)
    if (result.error && result.error.status === 401) {
        localStorage.removeItem(LOCAL_STORAGE_SESSION_AUTH_KEY)
        api.dispatch(authActions.auth({ connected: false }))
    }
    return result
}

const baseQuery = fetchBaseQuery({
    baseUrl: apiSettings.url,
    prepareHeaders: (headers) => {
        const sessionAuthKey = localStorage.getItem(LOCAL_STORAGE_SESSION_AUTH_KEY)
        if (sessionAuthKey) headers.set('session_id', sessionAuthKey)
        return headers
    }
})

export const baseApi = createApi({
    baseQuery: baseQueryWithReauth(baseQuery),
    tagTypes: ['Transaction'],
    endpoints: () => ({})
})
