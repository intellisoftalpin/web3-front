import { hexToString } from './hexToString'

describe('hex to string func', () => {
    test('random string with one word', () => {
        expect(hexToString('74657374')).toBe('test')
    })
    test('random string with two words', () => {
        expect(hexToString('7465737420636865636b')).toBe('test check')
    })
    test('string with number and symbols', () => {
        expect(hexToString('6865692033323320616e64205f5f5f202b202d')).toBe('hei 323 and ___ + -')
    })
})
