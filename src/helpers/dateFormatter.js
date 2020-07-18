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

export function updateDate(date, timeZone, timeString = '') {
  if (timeString.length === 0) {
    return date;
  }

  // TODO: revisit.
  const unit = timeString.split(' ')[1];
  const time = timeString.split(' ')[0];
  const [hours, minutes] = time.split(':');
  const newDate = new Date(date);
  console.log(unit);
  console.log(Number(hours) + (unit === 'PM' ? 12 : 0));
  newDate.setHours(Number(hours) + (unit === 'PM' ? 12 : 0));
  newDate.setMinutes(minutes);
  // TODO: Date converted did not match date in json
  const convertedDate = newDate.toLocaleString('en-US', { timeZone });
  return new Date(convertedDate).toISOString();
}

export function getShiftSchedule(startDate, timeframe) {
  const { morning, afternoon, night } = timeframe;
  if (startDate === morning.start) {
    return 'morning';
  }

  if (startDate === afternoon.start) {
    return 'afternoon';
  }

  if (startDate === night.start) {
    return 'night';
  }

  return '';
}
