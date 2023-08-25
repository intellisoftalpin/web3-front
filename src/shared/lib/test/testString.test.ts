import { testString } from './testString'

describe('test string', () => {
    test('str length === 0', () => {
        expect(testString('')).toBe('abc')
    })
    test('str length > 5', () => {
        expect(testString('stasy')).toBe('stasyabc')
    })
    test('str length > 0, < 5', () => {
        expect(testString('stas')).toBe('stas')
    })
})
