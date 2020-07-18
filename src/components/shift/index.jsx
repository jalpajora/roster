import React from 'react';

import { Schedule } from '../schedule';
import { useFetchApi } from '../../helpers/useFetchApi';

export const Shift = () => {
  const [shifts] = useFetchApi('/api/shifts');
  const [employees] = useFetchApi('/api/employees');
  const showSchedule = shifts.length && employees.length;

  return (
    <div>
      {showSchedule && (
        <Schedule shifts={shifts} employees={employees}/>
      )}
    </div>
  );
};

