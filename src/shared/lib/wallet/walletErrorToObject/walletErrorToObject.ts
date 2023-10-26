export function walletErrorToObject (message: string): { code: number, info: string } {
    return JSON.parse(`{${message.split('{')[1]}`.replace('.', ''))
}
