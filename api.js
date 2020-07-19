const roles = require('./files/roles.json');
const shifts = require('./files/shifts.json');
const employees = require('./files/employees.json');
const fs = require('fs').promises;

module.exports = {
  fetchRoles: (req, res, next) => {
    res.json(roles);
  },
  fetchShifts: (req, res, next) => {
    res.json(shifts);
  },
  fetchEmployees: (req, res, next) => {
    res.json(employees);
  },
  updateShifts: (req, res, next) => {
    const shift = req.body.schedule;
    const shifts = require('./files/shifts.json');
    const newShifts = shifts.map((currentShift, index) => {
      // TODO: Use shift.id instead of shiftId
      if (index === shift.shiftId) {
        const { shiftId, ...updatedShift} = shift;
        return updatedShift;
      } else {
        return currentShift;
      }
    })
    const data = JSON.stringify(newShifts, null, 4);
    fs.writeFile('./files/shifts.json', data)
      .then(() => {
        res.json({ success: true , shifts: data });
      })
      .catch(() => {
        res.json({ success: false });
      });    
  },
};

