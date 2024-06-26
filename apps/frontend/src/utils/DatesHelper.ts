export function getTimeRanges() {
    const now = new Date();

    function getStartOfWeek(date: Date): Date {
        const day = date.getDay();
        const diff = date.getDate() - day;
        const start = new Date(date.setDate(diff));
        start.setHours(0, 0, 0, 0);
        return start;
    }

    const thisWeekStart = getStartOfWeek(new Date());
    const lastWeekStart = new Date(thisWeekStart);
    lastWeekStart.setDate(thisWeekStart.getDate() - 7);
    const thisMonthStart = new Date(now.getFullYear(), now.getMonth(), 1);
    const lastMonthStart = new Date(now.getFullYear(), now.getMonth() - 1, 1);
    return {
        thisWeek: new Intl.DateTimeFormat('en-US').format(thisWeekStart),
        lastWeek: new Intl.DateTimeFormat('en-US').format(lastWeekStart),
        thisMonth: new Intl.DateTimeFormat('en-US').format(thisMonthStart),
        lastMonth: new Intl.DateTimeFormat('en-US').format(lastMonthStart)
    };
}

export function dateIsValid(date: Date) {
    return date.getTime() === date.getTime();
}
