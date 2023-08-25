export function testString (str: string) {
    if (str.length >= 5) {
        return str + 'abc'
    }
    if (str.length === 0) {
        return 'abc'
    }

    return str
}
