export interface LoginSchemaParams {
    userHash: string
    userRuntime?: number
}

export interface LoginSchemaResponse {
    expirationDateTime: string
    message: string
    sessionAuthorizationKey: string
    status: string
}
