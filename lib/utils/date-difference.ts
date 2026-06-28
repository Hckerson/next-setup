export function dateDifference(endDate: string) {
    if (!endDate) return;
    const today = new Date();
    const finish = new Date(endDate);
    const diffTime = Math.abs(finish.getTime() - today.getTime());
    const oneDayInMilliSeconds = 1000 * 60 * 60 * 24;
    const daysRemaining = Math.ceil(diffTime / oneDayInMilliSeconds);
    return daysRemaining;
}
