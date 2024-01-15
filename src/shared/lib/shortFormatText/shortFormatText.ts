export const shortFormatText = (text: string, count = 10) => {
    if (text.length <= count) {
        return text
    }
    return text.slice(0, Math.floor(count / 2)) + '...' + text.slice(Math.floor(-count / 2))
}
