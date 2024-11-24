export const dateText = (date, options) =>
  Intl.DateTimeFormat('en-US', {
    ...options,
    timeZone: 'America/New_York'
  }).format(date);

export const nth = (n) =>
  n > 3 && n < 21
    ? 'th'
    : n % 10 === 1
      ? 'st'
      : n % 10 === 2
        ? 'nd'
        : n % 10 === 3
          ? 'rd'
          : 'th';

export const prettyDate = (dateString) => {
  const date = new Date(dateString);

  const month = dateText(date, { month: 'long' });
  const day = dateText(date, { day: 'numeric' });
  const year = dateText(date, { year: 'numeric' });

  return `${month} ${day}${nth(day)}, ${year}`;
};

export const urlDate = (dateString) => {
  const date = new Date(dateString);

  const month = dateText(date, { month: '2-digit' });
  const day = dateText(date, { day: '2-digit' });
  const year = dateText(date, { year: 'numeric' });

  return [year, month, day];
};
