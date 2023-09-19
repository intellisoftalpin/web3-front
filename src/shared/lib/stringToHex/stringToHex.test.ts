import { stringToHex } from './stringToHex'

describe('string to hex func', () => {
    test('random string with one word', () => {
        expect(stringToHex('test')).toBe('74657374')
    })
    test('random string with two words', () => {
        expect(stringToHex('test check')).toBe('7465737420636865636b')
    })
    test('string with number and symbols', () => {
        expect(stringToHex('hei 323 and ___ + -')).toBe('6865692033323320616e64205f5f5f202b202d')
    })
})
