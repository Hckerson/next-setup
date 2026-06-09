export function convertCurrency(number: number) {
    if (number == 0) {
        return 0;
    }

    if (number > 9999999) {
        const part = cutOff(number, 3, "M");
        return Number.parseFloat(part).toFixed(2);
    } else if (number > 999999) {
        const part = cutOff(number, 2, "M");
        return Number.parseFloat(part).toFixed(2);
    } else if (number > 99999) {
        const part = cutOff(number, 4, "K");
        return Number.parseFloat(part).toFixed(2);
    }
    return Number.parseFloat(`${number}`).toFixed(2);
}

const cutOff = (digit: number, order: number, symbol: "M" | "B" | "K") => {
    const stringified = `${digit}`;
    const number = stringified.substring(0, order);
    return `${number.substring(0, number.length - 1)}.${number[number.length - 1]}${symbol}`;
};
