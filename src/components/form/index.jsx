import React, { useState } from 'react';

import { Link } from 'react-router-dom';
import { getNewShiftDate, getTime, getShiftSchedule } from '../../helpers/dateFormatter';
import { getShiftForTheDay } from '../../helpers/formatter';
import { SHIFT_SCHEDULE, DAYS } from '../schedule/constants';

async function updateSchedule({ schedule }) {
  const response = await fetch('/api/shifts/update', {
    method: 'PUT',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify({ schedule })
  })
  return await response.json();
}

function resetShiftSchedule(schedule, timeZone, hoursToAdd) {
  const start = schedule.start_time || '';
  return getNewShiftDate(start, timeZone, hoursToAdd);
}

export const Form = ({ location }) => {
  const [response, setResponse] = useState(false);
  const [shiftsFromResponse, updateShiftsFromResponse] = useState([]);
  const [saving, setSaving] = useState(false);
  const [invalid, setInvalid] = useState(false);

  const { timeZone, scheduleForAll, day } = location;
  let schedule = location.schedule || {};

  let shift = '';
  if (schedule && schedule.start_time) {
    const startDate = getTime(schedule.start_time, timeZone);
    shift = getShiftSchedule(startDate, SHIFT_SCHEDULE);
  }

  const handleChange = (e) => {
    e.preventDefault();
    setSaving(true);
    const newTime = e.target.value;

    const notAllowed = getBeforeAndAfterDays();
    if (notAllowed.includes(newTime)) {
      setInvalid(true);
      setSaving(false);
    } else {
      let hoursToAdd = 0;
      if (newTime === 'morning' && shift !== '') {
        hoursToAdd = shift === 'afternoon' ? -8 : -16;
      } else if (newTime === 'afternoon' && shift !== '') {
        hoursToAdd = shift === 'morning' ? 8 : -8;
      } else if (newTime === 'night' && shift !== '') {
        hoursToAdd = shift === 'morning' ? 16 : 8;
      } else {
        if (newTime === 'morning') {
          hoursToAdd = 5;
        }

        if (newTime === 'afternoon') {
          hoursToAdd = 13;
        }

        if (newTime === 'night') {
          hoursToAdd = 21;
        }
      }

      schedule = {
        ...schedule,
        ...resetShiftSchedule(schedule, timeZone, hoursToAdd),
      }

      updateSchedule({ shift, schedule })
        .then((data) => {
          if (data && data.success) {
            setResponse(true);
            updateShiftsFromResponse(data);
            setInvalid(true);
          }
        });
    }
  };

  const getBeforeAndAfterDays = () => {
    const dayIndex = DAYS.indexOf(day);
    const before = DAYS[dayIndex - 1];
    const after = DAYS[dayIndex + 1];
    const dayBefore = scheduleForAll[before];
    const dayAfter = scheduleForAll[after];
    
    console.log(dayBefore);
    console.log(dayBefore[schedule.employee_id]);
    console.log(dayBefore[schedule.employee_id].start_time);
    let invalidShift = [];
    if (dayBefore && 
      dayBefore[schedule.employee_id] &&
      getShiftForTheDay(dayBefore[schedule.employee_id].start_time) === 'night'
    ) {
      invalidShift = [...invalidShift, 'morning'];
    }

    if (dayAfter && 
      dayAfter[schedule.employee_id] &&
      getShiftForTheDay(dayAfter[schedule.employee_id].start_time) === 'morning'
    ) {
      invalidShift = [...invalidShift, 'night'];
    } 
    console.log(invalidShift);
    return invalidShift;
  }

  // update shifts state in Shift component 
  return (
    <div>
      <h2>Edit:</h2>
      {(invalid && !saving) && (
        <div>Not allowed. Shifts must not be consecutive.</div>
      )}
      {response && (
        <div>
          Succesfully saved. Go back to 
          <Link to={{
            pathname: '/shift',
            refreshShifts: true,
            shifts: shiftsFromResponse,
          }}>Shift Management</Link>
        </div>
      )}
      {(saving && !response) && <div>Saving changes..</div>}
      {(!saving && !response) && (
        <form>
          <label>Shift: </label>
          <select onChange={handleChange} defaultValue={shift}>
            <option value=''>Off</option>
            <option value='morning'>Morning</option>
            <option value='afternoon'>Afternoon</option>
            <option value='night'>Night</option>
          </select>
        </form>
      )}
    </div>
  );
};
