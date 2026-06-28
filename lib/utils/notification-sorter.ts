import { Notification } from "../interface";

export function notificationSorter(data: Notification[]) {
    const today = [];
    const earlier = [];
    const yesterday = [];
    for (let i = 0; i < data.length; i++) {
        const currentNotification = data[i];
        const { createdAt } = currentNotification;
        const timeInNumbers = new Date(createdAt).getTime();

        const todayDate = new Date();
        const yesterdayDate = new Date().setDate(todayDate.getDate() - 1);
        if (timeInNumbers > todayDate.getTime()) {
            today.push(currentNotification);
        } else if (timeInNumbers > yesterdayDate) {
            yesterday.push(currentNotification);
        } else {
            earlier.push(currentNotification);
        }
    }
    return { today, yesterday, earlier };
}
