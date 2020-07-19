import React from 'react';
import { Link } from 'react-router-dom';

import { formatSchedule, getShiftForTheDay } from '../../helpers/formatter';
import { DAYS } from './constants';

const EmployeeColumn = ({ employee }) => {
  const { last_name, first_name, id } = employee;
  return <td data-id={id}>{`${last_name}, ${first_name}`}</td>;
};

const EmployeeScheduleColumn = ({ schedule, timeZone, day, scheduleForAll, roles }) => {
  const Edit = () => (
    <Link to={{
      pathname: '/edit',
      scheduleForAll,
      day,
      schedule,
      timeZone,
    }}>Edit</Link>
  );

  const WorkOff = () => <td className='schedule-legend--off'></td>;
  if (!schedule) {
    return <WorkOff />;
  }

  const shift = getShiftForTheDay(schedule.start_time, timeZone);
  if (shift === '') {
    return <WorkOff />;
  }

  const getRole = () => {
    const filterRole = roles.filter(role => role.id === schedule.role_id);
    if (filterRole.length) {
      return filterRole[0].name;
    }

    return '';
  };

  return (
    <td
      className={`schedule-legend--working${shift} employee-role__${getRole()}`}
    >
      <div>{shift}</div>
      <Edit />
    </td>
  );
}



function EmployeeSchedule({ employees, schedule, timeZone, roles }) {
  const ScheduleColumns = ({ schedule, employeeId, timeZone }) => {
    return DAYS.map((day, index) => {
      return (
        <EmployeeScheduleColumn 
          key={`employee-schedule-${employeeId}-${index}`}
          schedule={schedule[day][employeeId]}
          timeZone={timeZone}
          day={day}
          scheduleForAll={schedule}
          roles={roles}
        />
      );
    });
  };

  return employees.map(employee => (
    <tr key={`employee-schedule-${employee.id}`}>
      <EmployeeColumn employee={employee} />
      <ScheduleColumns
        employeeId={employee.id}
        schedule={schedule}
        timeZone={timeZone}
        roles={roles}
      />
    </tr>
  ));
}

export const Schedule = ({
  shifts,
  employees,
  roles,
  timeZone = 'Australia/Perth' // TODO: fetch this
}) => {
  if (!shifts.length) {
    return null;
  }
  const schedule = formatSchedule(shifts, timeZone);
  return (
    <div className='table__wrapper'>
      <table cellSpacing='0' cellPadding='0'>
        <thead>
          <tr>
            <th>Employee</th>
            {DAYS.map(day => <th key={`table-column-${day.toLowerCase()}`}>{day}</th>)}
            <th>Edit</th>
          </tr>
        </thead>
        <tbody>
          <EmployeeSchedule employees={employees} schedule={schedule} timeZone={timeZone} roles={roles}/>
        </tbody>
      </table>
    </div>
  );
};

