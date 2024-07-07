export function getTimeRanges() {
    const now = new Date();

    function getStartOfWeek(date: Date): Date {
        const day = date.getDay();
        const diff = date.getDate() - day;
        const start = new Date(date.setDate(diff));
        start.setHours(0, 0, 0, 0);
        return start;
    }

    const currentDate = new Date();
    currentDate.setDate(currentDate.getDate() + 1)
    const thisWeekStart = getStartOfWeek(new Date());
    const lastWeekStart = new Date(thisWeekStart);
    lastWeekStart.setDate(thisWeekStart.getDate() - 7);
    const thisMonthStart = new Date(now.getFullYear(), now.getMonth(), 1);
    const thisYearStart = new Date(now.getFullYear(), 0, 1);
    const lastMonthStart = new Date(now.getFullYear(), now.getMonth() - 1, 1);
    return {
        thisWeek: formatDate(thisWeekStart),
        lastWeek: formatDate(lastWeekStart),
        thisMonth: formatDate(thisMonthStart),
        lastMonth: formatDate(lastMonthStart),
        currentDate: formatDate(currentDate),
        thisYear: formatDate(thisYearStart)
    };
}

export function formatDate(date: Date) {
    return new Intl.DateTimeFormat('en-US').format(date)
}

export function dateIsValid(date: Date) {
    return date.getTime() === date.getTime();
}

export function generateDateRange(startDate: string, endDate: string) {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const days: string[] = [];
    for (let d = start; d < end; d.setDate(d.getDate() + 1)) {
        days.push(formatDate(new Date(d)));
    }
    return days;
}

export function getWeekNumberLocal(date: Date | string) {
    const newDate = new Date(date);
    if (!dateIsValid(newDate)) {
        return null
    }
    const yearStart = new Date(newDate.getFullYear(), 0, 1);
    if (yearStart.getDay() !== 0) {
        yearStart.setDate(yearStart.getDate() - yearStart.getDay());
    }
    const diffMilliseconds = newDate.getTime() - yearStart.getTime();
    const diffDays = diffMilliseconds / (1000 * 60 * 60 * 24)
    return Math.ceil((diffDays + 1) / 7)
}

export function getMonthName(date: Date | string) {
    const newDate = new Date(date)
    return dateIsValid(newDate) ? newDate.toLocaleDateString('en-US', {month: 'short'}).toLowerCase() : null
}

export function getFullyYear(date: Date | string) {
    const newDate = new Date(date)
    return dateIsValid(newDate) ? newDate.getFullYear() : null
}

