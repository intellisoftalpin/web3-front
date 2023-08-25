export const shortFormatText = (text: string, count = 10) => {
    return text.substring(0, count) + '...' + text.substring(text.length - count, text.length)
}
