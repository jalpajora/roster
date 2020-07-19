import { getWeekDay, getTime, getShiftSchedule} from './dateFormatter';
import { SHIFT_SCHEDULE } from '../components/schedule/constants';

export function formatSchedule(shifts, timeZone) {
  const groupedByEmployeeId = shifts.reduce((reformat, shift, shiftId) => {
    const weekDay = getWeekDay(shift.start_time, timeZone);
    reformat[weekDay] = reformat[weekDay] || {};

    if (!reformat[weekDay][shift.employee_id]) {
      reformat[weekDay][shift.employee_id] = {...shift, shiftId};
    }

    return reformat;
  }, {});

  return groupedByEmployeeId;
}

export const getShiftForTheDay = (startTime, timeZone) => {
  const startDate = getTime(startTime, timeZone);
  return getShiftSchedule(startDate, SHIFT_SCHEDULE);
};
