export const shortFormatText = (text: string, count = 10) => {
    if (text.length < count) {
        return text
    }
    return text.substring(0, count) + '...' + text.substring(text.length - count, text.length)
}
