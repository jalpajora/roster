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

function getMonth(date) {
  const month = date.getMonth() + 1;
  return `${(month < 10? '0' : '')}${month}`;
}

function getStoreTimezone(newDate, options) {
  const timeZone = 'Australia/Perth';
  return newDate.toLocaleString('en-US', { ...options, timeZone });
}

export function getNewShiftDate(date, timeZone = 'Australia/Perth', hoursToAdd = 8) {
  // TODO: Add for empty date, From off to add shift
  const storeDate = new Date(date).toLocaleString('en-US', { timeZone });
  const newDate = new Date(storeDate);
  newDate.setMilliseconds(0);
  newDate.setHours(newDate.getHours() + hoursToAdd);
  const start = newDate.toISOString().split('.')[0] + '+00:00';
  newDate.setHours(newDate.getHours() + 8);
  newDate.setMinutes(newDate.getMinutes() + 30);
  const end = newDate.toISOString().split('.')[0] + '+00:00';
  return {
    start_time: start,
    end_time: end,
  }
}

// var aestTime = new Date().toLocaleString("en-US", {timeZone: "Australia/Brisbane"});
// console.log('AEST time: '+ (new Date(aestTime)).toISOString())

// var asiaTime = new Date().toLocaleString("en-US", {timeZone: "Asia/Shanghai"});
// console.log('Asia time: '+ (new Date(asiaTime)).toISOString())

// var usaTime = new Date().toLocaleString("en-US", {timeZone: "America/New_York"});
// console.log('USA time: '+ (new Date(usaTime)).toISOString())

// var indiaTime = new Date().toLocaleString("en-US", {timeZone: "Asia/Kolkata"});
// console.log('India time: '+ (new Date(indiaTime)).toISOString())

// export function updateDate(date, timeZone, timeString = '') {
//   if (timeString.length === 0) {
//     return date;
//   }

//   // TODO: revisit.
//   const unit = timeString.split(' ')[1];
//   const time = timeString.split(' ')[0];
//   const [hours, minutes] = time.split(':');
//   const newDate = new Date(date);
//   console.log(unit);
//   console.log(Number(hours) + (unit === 'PM' ? 12 : 0));
//   newDate.setHours(Number(hours) + (unit === 'PM' ? 12 : 0));
//   newDate.setMinutes(minutes);
//   // TODO: Date converted did not match date in json
//   const convertedDate = newDate.toLocaleString('en-US', { timeZone });
//   return new Date(convertedDate).toISOString();
// }

// export function updateDate(date, timeZone, timeString = '') {
//   if (timeString.length === 0) {
//     return date;
//   }

//   // TODO: revisit.
//   const unit = timeString.split(' ')[1];
//   const time = timeString.split(' ')[0];
//   const [hours, minutes] = time.split(':');
//   const newDate = new Date(date);
//   console.log(unit);
//   console.log(Number(hours) + (unit === 'PM' ? 12 : 0));
//   newDate.setHours(Number(hours) + (unit === 'PM' ? 12 : 0));
//   newDate.setMinutes(minutes);
//   newDate.setSeconds(0);
//   newDate.setMilliseconds(0);
//   // TODO: Date converted did not match date in json
//   const convertedDate = newDate.toLocaleString('en-US', { timeZone });
//   return new Date(convertedDate).toISOString();
// }

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
