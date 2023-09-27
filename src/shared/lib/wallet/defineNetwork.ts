export const defineNetwork = (networkId: number) => {
    if (networkId === 1) {
        return 'mainnet'
    } else if (networkId === 0) {
        return 'testnet'
    } else {
        return 'unidentified net'
    }
}
