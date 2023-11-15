import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react'
import { apiSettings } from 'shared/config/apiSettings/apiSettings'
import { LOCAL_STORAGE_SESSION_AUTH_KEY } from 'shared/consts/localStorageAuthKey'
import { authActions } from 'entities/Auth/model/slice/authSlice'
import { toast } from 'react-toastify'

type BaseQueryType = ReturnType<typeof fetchBaseQuery>
interface ErrorLogging {
    status: number
    data: {
        msg: string
        status: string
        errorCode: string
    }
}

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

const baseQueryWithErrorLogging: (baseQuery: BaseQueryType) => BaseQueryType = (
    baseQuery
) => async (args, api, extraOptions) => {
    const result = await baseQuery(args, api, extraOptions)
    const error: ErrorLogging = result.error as ErrorLogging
    if (error) {
        toast(`${error.status} - ${error.data.msg}`, { type: 'error' })
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
    baseQuery: baseQueryWithErrorLogging(baseQueryWithReauth(baseQuery)),
    tagTypes: ['Transaction'],
    endpoints: () => ({})
})
