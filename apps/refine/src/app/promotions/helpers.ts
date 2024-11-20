import moment from 'moment';

export const timezoneDateFormatter = (date: string) => {
  return moment(date).subtract(2, 'hours').format('YYYY-MM-DD hh:mm A');
};

export const timezoneTimeFormatter = (date: string) => {
  return moment(date).subtract(2, 'hours').format('hh:mm');
};
