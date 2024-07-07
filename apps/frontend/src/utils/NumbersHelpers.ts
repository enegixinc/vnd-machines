export function isValidNumber(number: any) {
    const newNumber = +number;
    return !Number.isNaN(newNumber)
}

export function formatNumber(number: number) {
    return new Intl.NumberFormat().format(number)
}
