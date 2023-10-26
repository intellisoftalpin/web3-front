export const defineNetwork = (networkId: number, networkName: string) => {
    if (networkId === 1) return 'mainnet'
    if (networkId === 0) {
        if (networkName === 'preprod' || networkName === 'testnet' || networkName === 'preview') {
            return networkName
        }
    }
}
