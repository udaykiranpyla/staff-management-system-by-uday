import React from 'react';

function AttendanceReport({ attendance, staff }) {
  const getName = (id) => staff.find((s) => s.id === id)?.personal.fullName || "Unknown";

  const grouped = attendance.reduce((acc, curr) => {
    const date = curr.time.split("T")[0];
    if (!acc[date]) acc[date] = [];
    acc[date].push(curr);
    return acc;
  }, {});

  return (
    <div>
      <h3>Attendance Report</h3>
      {Object.keys(grouped).map((date) => (
        <div key={date}>
          <h4>{date}</h4>
          <ul>
            {grouped[date].map((log) => (
              <li key={log.id}>{getName(log.staffId)} - {log.action} at {new Date(log.time).toLocaleTimeString()}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

export default AttendanceReport;
