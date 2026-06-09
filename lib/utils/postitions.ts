const getActualPosition = (number: number) => {
    const textNumber = String(number);
    if (textNumber.endsWith("1")) return 1;
    if (textNumber.endsWith("2")) return 2;
    if (textNumber.endsWith("3")) return 3;
    return number;
};

export const getPositionText = (score: number) => {
    const number = getActualPosition(score);
    switch (number) {
        case 1:
            return `${score}st`;
        case 2:
            return `${score}nd`;
        case 3:
            return `${score}rd`;
        default:
            return `${score}th`;
    }
};
