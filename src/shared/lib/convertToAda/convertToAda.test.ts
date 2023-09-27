import { convertToAda } from 'shared/lib/convertToAda/convertToAda'

describe('convert to lovelaces', () => {
    test('1 ADA', () => {
        expect(convertToAda(1000000)).toBe(1)
    })
    test('-1 ADA', () => {
        expect(convertToAda(-1000000)).toBe(-1)
    })
    test('float ada 1.3', () => {
        expect(convertToAda(1300000)).toBe(1.3)
    })
})
