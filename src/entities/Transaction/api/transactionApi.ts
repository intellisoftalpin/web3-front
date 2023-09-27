import { baseApi } from 'shared/api/baseApi'
import {
    type ActiveTransaction,
    type ChangeTransactionStatus,
    type DeleteTransactionResponse,
    type ResponseSaveTransaction,
    type SaveTransaction, type SingleTransaction, type Transaction, type TransactionNewStatus,
    type UpdateTransaction
} from 'entities/Transaction/model/types/transactionSchema'

export const transactionApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        getTransactions: build.query<{ transactions: Transaction[] }, string>({
            query: () => ({
                url: 'api/v1/transactions',
                method: 'GET'
            }),
            providesTags: ['Transaction']
        }),
        getSingleTransaction: build.query<SingleTransaction, number>({
            query: (transactionId) => ({
                url: `api/v1/transactions/${transactionId}`,
                method: 'GET'
            })
        }),
        getTransactionActive: build.query<ActiveTransaction, string>({
            query: () => ({
                url: 'api/v1/transactions/active',
                method: 'GET'
            })
        }),
        saveTransaction: build.mutation<ResponseSaveTransaction, SaveTransaction>({
            query: ({ data, type }) => ({
                url: 'api/v1/transactions',
                method: 'POST',
                body: {
                    data,
                    type
                }
            }),
            invalidatesTags: ['Transaction']
        }),
        updateTransaction: build.mutation<ResponseSaveTransaction, UpdateTransaction>({
            query: ({
                data: {
                    transactionId,
                    type,
                    ...data
                }
            }) => ({
                url: `api/v1/transactions/${transactionId}`,
                method: 'PUT',
                body: {
                    type,
                    data: { ...data }
                }
            }),
            invalidatesTags: ['Transaction']
        }),
        deleteTransaction: build.mutation<DeleteTransactionResponse, number>({
            query: (transactionId) => ({
                url: `api/v1/transactions/${transactionId}`,
                method: 'DELETE'
            }),
            invalidatesTags: ['Transaction']
        }),
        changeTransactionStatus: build.mutation<TransactionNewStatus, ChangeTransactionStatus>({
            query: ({
                transactionId,
                status
            }) => ({
                url: `api/v1/transactions/${transactionId}/status`,
                method: 'PUT',
                body: {
                    status
                }
            }),
            invalidatesTags: ['Transaction']
        })
    }),
    overrideExisting: false
})

export const {
    useSaveTransactionMutation,
    useChangeTransactionStatusMutation,
    useDeleteTransactionMutation,
    useUpdateTransactionMutation,
    useGetSingleTransactionQuery,
    useGetTransactionsQuery,
    useGetTransactionActiveQuery
} = transactionApi
