function getDate(date, options) {
  return new Date(date)
    .toLocaleString('en-US', options);
}

export function getWeekDay(date, timeZone) {
  return getDate(date, { timeZone, weekday: 'long' });
}

export function getTime(date, timeZone) {
  return getDate(date, { timeZone, hour: '2-digit', minute: '2-digit' });
}

export function getShiftSchedule(startDate, timeframe) {
  const { morning, afternoon, night } = timeframe;
  if (startDate === morning) {
    return 'Morning';
  }

  if (startDate === afternoon) {
    return 'Afternoon';
  }

  if (startDate === night) {
    return 'Night';
  }

  return '';
}
