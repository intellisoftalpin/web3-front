export const makeRegionalNumberFormat = (number: number, decimals: number = 0) => {
    return number.toLocaleString(navigator.language, { maximumFractionDigits: decimals, minimumFractionDigits: decimals })
}
