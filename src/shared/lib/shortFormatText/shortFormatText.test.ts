import { shortFormatText } from './shortFormatText'

describe('short format text', () => {
    test('short word without separator', () => {
        expect(shortFormatText('test')).toBe('test')
    })
    test('short word with separator', () => {
        expect(shortFormatText('test', 10)).toBe('test')
    })
    test('long word without separator', () => {
        expect(shortFormatText('onetwothreefourfivesixseven')).toBe('onetwothre...vesixseven')
    })
    test('short word with separator = 5', () => {
        expect(shortFormatText('onetwothreefourfivesixseven', 3)).toBe('one...ven')
    })
    test('null string', () => {
        expect(shortFormatText('')).toBe('')
    })
})
