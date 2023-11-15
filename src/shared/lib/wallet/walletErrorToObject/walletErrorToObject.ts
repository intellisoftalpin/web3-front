export function walletErrorToObject (message: string): { code: number, info: string } {
    const code = +message.split('"code":')[1][0]
    const info = message.split('"info":')[1].split('"')[1]
    console.log(info)

    return { code, info }
}
