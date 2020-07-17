import React from 'react';
import { Link } from 'react-router-dom';

import { getWeekDay, getTime, getShiftSchedule } from '../../helpers/dateFormatter';
import { DAYS, SHIFT_SCHEDULE } from './constants';

function formatSchedule(shifts, timeZone) {
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

const EmployeeColumn = ({ employee }) => {
  const { last_name, first_name} = employee;
  return <td>{`${last_name}, ${first_name}`}</td>;
};

const EmployeeScheduleColumn = ({ schedule, timeZone }) => {
  const Edit = () => (
    <Link to={{
      pathname: '/edit',
      schedule,
      timeZone
    }}>Edit</Link>
  );

  const WorkOff = () => <td className='schedule-legend--off'><Edit /></td>;
  if (!schedule) {
    return <WorkOff />;
  }

  const startDate = getTime(schedule.start_time, timeZone);
  // const endDate = getTime(schedule.end_time, timeZone);
  const shift = getShiftSchedule(startDate, SHIFT_SCHEDULE);
  if (shift === '') {
    return <WorkOff />;
  }

  return (
    <td className={`schedule-legend--working${shift}`}>
      <span>{shift}</span>
      <Edit />
    </td>
  );
}

const ScheduleColumns = ({ schedule, employeeId, timeZone }) => {
  return DAYS.map((day, index) => {
    return (
      <EmployeeScheduleColumn 
        key={`employee-schedule-${employeeId}-${index}`}
        schedule={schedule[day][employeeId]}
        timeZone={timeZone}
      />
    );
  });
};

function EmployeeSchedule({ employees, schedule, timeZone }) {
  return employees.map(employee => (
    <tr key={`employee-schedule-${employee.id}`}>
      <EmployeeColumn employee={employee} />
      <ScheduleColumns
        employeeId={employee.id}
        schedule={schedule}
        timeZone={timeZone}
      />
    </tr>
  ));
}

export const Schedule = ({
  shifts,
  employees,
  timeZone = 'Australia/Perth' // TODO: fetch this
}) => {
  const schedule = formatSchedule(shifts, timeZone);

  return (
    <table>
      <thead>
        <tr>
          <th>Employee</th>
          {DAYS.map(day => <th key={`table-column-${day.toLowerCase()}`}>{day}</th>)}
          <th>Edit</th>
        </tr>
      </thead>
      <tbody>
        <EmployeeSchedule employees={employees} schedule={schedule} timeZone={timeZone} />
      </tbody>
    </table>
  );
};

