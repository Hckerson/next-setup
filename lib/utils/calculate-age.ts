export const calculateAge = (dateString: string | Date) => {
    const today = new Date();
    const inputDate = new Date(dateString);
    const yearInMilliSeconds = 31536000000; // 365.25 * 24 * 60 * 60 * 1000;
    const monthInMilliSeconds = 2678400000;
    const dayInMilliSeconds = 86400000; // 24 * 60 * 60 * 1000

    // Calculate the difference in milliseconds
    const diffInMs = today.getTime() - inputDate.getTime();

    if (diffInMs < dayInMilliSeconds) {
        return "0d";
    }

    if (diffInMs < monthInMilliSeconds) {
        return Math.floor(diffInMs / dayInMilliSeconds) + "d";
    }

    if (diffInMs < yearInMilliSeconds) {
        return Math.floor(diffInMs / monthInMilliSeconds) + "mo";
    }
    const ageInYears = Math.floor(diffInMs / yearInMilliSeconds);

    return ageInYears + "y";
};
