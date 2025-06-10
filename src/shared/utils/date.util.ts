export const formatDate = (date: Date): string =>
  [
    `${date.getDate()}`.padStart(2, '0'),
    `${date.getMonth() + 1}`.padStart(2, '0'),
    date.getFullYear(),
  ].join('.');

export const formatTime = (date: Date): string =>
  [
    `${date.getHours()}`.padStart(2, '0'),
    `${date.getMinutes()}`.padStart(2, '0'),
    `${date.getSeconds()}`.padStart(2, '0'),
  ].join(':');

export const formatDateTime = (date: Date): string =>
  `${formatDate(date)}, ${formatTime(date)}`;
