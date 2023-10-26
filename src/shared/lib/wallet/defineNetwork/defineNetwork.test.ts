import { defineNetwork } from './defineNetwork'

describe('define network', () => {
    test('network number = 0', () => {
        expect(defineNetwork(0, 'testnet')).toBe('testnet')
    })
    test('network number = 1', () => {
        expect(defineNetwork(1, 'mainnet')).toBe('mainnet')
    })
})
