import { defineNetwork } from './defineNetwork'

describe('define network', () => {
    test('network number = 0', () => {
        expect(defineNetwork(0)).toBe('testnet')
    })
    test('network number = 1', () => {
        expect(defineNetwork(1)).toBe('mainnet')
    })
    test('network number no 1 or 0', () => {
        expect(defineNetwork(-10)).toBe('unidentified net')
    })
})
