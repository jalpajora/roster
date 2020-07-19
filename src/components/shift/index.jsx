import React, { useState } from 'react';

import { Schedule } from '../schedule';
import { useFetchApi } from '../../helpers/useFetchApi';
import { getStoreDate } from '../../helpers/dateFormatter';

const Legend = () => (
  <table cellSpacing='0' cellPadding='0'>
    <thead>
      <tr><th>Legend</th></tr>
    </thead>
    <tbody>
      <tr>
        <td width='20' className='employee-role__Supervisor'>Supervisor</td>
      </tr>
      <tr>
        <td width='20' className='employee-role__Checkouts'>Checkouts</td>
      </tr>
      <tr>
        <td width='20' className='employee-role__Stacker'>Stacker</td>
      </tr>
    </tbody>
  </table>
);

export const Shift = () => {
  const [shifts] = useFetchApi('./files/shifts.json');
  const [employees] = useFetchApi('/api/employees');
  const [roles] = useFetchApi('/api/roles');

  return (
    <>
      <Legend />
      <Schedule shifts={shifts} employees={employees} roles={roles} />
    </>
  );
};

