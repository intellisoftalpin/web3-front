import { convertToLovelaces } from './convertToLovelaces'

describe('convert to lovelaces', () => {
    test('1 ADA', () => {
        expect(convertToLovelaces(1)).toBe(1000000)
    })
    test('-1 ADA', () => {
        expect(convertToLovelaces(-1)).toBe(-1000000)
    })
    test('float ada 1.3', () => {
        expect(convertToLovelaces(1.3)).toBe(1300000)
    })
})
