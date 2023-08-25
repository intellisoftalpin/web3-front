export const hexToString = (hex: string) => {
    let str = ''
    for (let i = 0; i < hex.length; i += 2) {
        const v = parseInt(hex.substr(i, 2), 16)
        if (v) str += String.fromCharCode(v)
    }
    return str
}
