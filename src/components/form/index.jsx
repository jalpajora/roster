import React, { useState } from 'react';

import { getWeekDay, getTime, getShiftSchedule } from '../../helpers/dateFormatter';
import { SHIFT_SCHEDULE } from '../schedule/constants';

async function updateSchedule() {

  const response = await fetch('/public/test.json', {
    method: 'PUT',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify({ test: 'hey'})
  })
  return await response.json();
}

export const Form = ({ location }) => {
  const [response, setResponse] = useState([]);
  const { schedule, timeZone } = location;

  const handleChange = (e) => {
    e.preventDefault();
    updateSchedule()
      .then((data) => setResponse(data));
  };

  let shift = '';
  if (schedule && schedule.start_time) {
    const startDate = getTime(schedule.start_time, timeZone);
    shift = getShiftSchedule(startDate, SHIFT_SCHEDULE);
  }

  return (
    <div>
      <h2>Edit:</h2>
      <form>
        <label>Shift: </label>
        <select onChange={handleChange} defaultValue={shift}>
          <option value=''>Off</option>
          <option value='Morning'>Morning</option>
          <option value='Afternoon'>Afternoon</option>
          <option value='Night'>Night</option>
        </select>
      </form>
    </div>
  );
};
