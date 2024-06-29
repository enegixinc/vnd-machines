export const getPeriods = () => [
  {
    label: 'Today',
    key: 'today',
    start: new Date(new Date().setHours(0, 0, 0, 0)),
    end: new Date(new Date().setHours(23, 59, 59, 999)),
  },
  {
    label: 'Last 7 days',
    key: 'last7Days',
    start: new Date(new Date().setDate(new Date().getDate() - 6)),
    end: new Date(new Date().setHours(23, 59, 59, 999)),
  },
  {
    label: 'Last month',
    key: 'lastMonth',
    start: new Date(
      new Date(new Date().setMonth(new Date().getMonth() - 1)).setDate(1)
    ),
    end: new Date(new Date(new Date().setDate(0)).setHours(23, 59, 59, 999)),
  },
  {
    label: 'Last year',
    key: 'lastYear',
    start: new Date(
      new Date(
        new Date().setFullYear(new Date().getFullYear() - 1, 0, 1)
      ).setHours(0, 0, 0, 0)
    ),
    end: new Date(
      new Date(
        new Date().setFullYear(new Date().getFullYear() - 1, 11, 31)
      ).setHours(23, 59, 59, 999)
    ),
  },
];
