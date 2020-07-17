import React from 'react';

import { Schedule } from '../schedule';
import { useFetchApi } from '../../helpers/useFetchApi';

export const Shift = () => {
  const [shifts] = useFetchApi('/files/shifts.json');
  const [employees] = useFetchApi('/files/employees.json');
  const showSchedule = shifts.length && employees.length;

  return (
    <div>
      {showSchedule && (
        <Schedule shifts={shifts} employees={employees}/>
      )}
      Hey
    </div>
  );
};

