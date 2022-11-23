import dayjs from "dayjs";

export const dateOverdue = (date: string) => {
    const now = dayjs();
    return now.diff(date, "day") < 0 ? false : true;
}