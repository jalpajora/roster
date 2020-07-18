import React, { useState, useEffect } from 'react';

import { Link } from 'react-router-dom';
import { updateDate, getTime, getShiftSchedule } from '../../helpers/dateFormatter';
import { SHIFT_SCHEDULE } from '../schedule/constants';

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

function resetShiftSchedule(schedule, timeZone, timeSchedule) {
  const start = schedule.start_time;
  const end = schedule.end_time;

  return {
    start_time: updateDate(start, timeZone, timeSchedule.start),
    end_time: updateDate(end, timeZone, timeSchedule.end)
  };
}

export const Form = ({ location }) => {
  const [response, setResponse] = useState(false);
  const [saving, setSaving] = useState(false);

  const { timeZone } = location;
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
    schedule = {
      ...schedule,
      ...resetShiftSchedule(schedule, timeZone, SHIFT_SCHEDULE[newTime]),
    }

    updateSchedule({ shift, schedule })
      .then((data) => {
        if (data && data.success) {
          setResponse(true);
        }
      });
  };

  return (
    <div>
      <h2>Edit:</h2>
      {response && (
        <div>
          Succesfully saved. Go back to 
          <Link to={{
            pathname: '/shift'
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
