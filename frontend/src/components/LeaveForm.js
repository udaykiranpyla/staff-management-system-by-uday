import React, { useState, useEffect } from 'react';
import axios from 'axios';

const LeaveForm = () => {
  const [staffList, setStaffList] = useState([]);
  const [staffId, setStaffId] = useState('');
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [reason, setReason] = useState('');
  const [leaveRecords, setLeaveRecords] = useState([]);

  // Load staff list
  useEffect(() => {
    axios.get('http://localhost:5000/api/staff')
      .then(res => setStaffList(res.data))
      .catch(err => console.error(err));
  }, []);

  // Load leave records
  useEffect(() => {
    axios.get('http://localhost:5000/api/leaves')
      .then(res => setLeaveRecords(res.data))
      .catch(err => console.error(err));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:5000/api/leaves', {
      staffId,
      fromDate,
      toDate,
      reason
    })
    .then(res => {
      alert('Leave Submitted!');
      setLeaveRecords([...leaveRecords, res.data.leave]);
      setFromDate('');
      setToDate('');
      setReason('');
    })
    .catch(err => {
      console.error(err);
      alert('Error submitting leave');
    });
  };

  const updateStatus = (id, status) => {
    axios.put(`http://localhost:5000/api/leaves/${id}/status`, { status })
      .then(() => {
        setLeaveRecords(prev =>
          prev.map(l => l.id === id ? { ...l, status } : l)
        );
      })
      .catch(err => console.error(err));
  };

  return (
    <div style={{ padding: '1rem' }}>
      <h2>Apply Leave</h2>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', maxWidth: 400, gap: '10px', marginBottom: '1rem' }}>
        <select value={staffId} onChange={(e) => setStaffId(e.target.value)} required>
          <option value="">Select Staff</option>
          {staffList.map((staff) => (
            <option key={staff.id} value={staff.id}>
              {staff.name}
            </option>
          ))}
        </select>
        <input type="date" value={fromDate} onChange={(e) => setFromDate(e.target.value)} required />
        <input type="date" value={toDate} onChange={(e) => setToDate(e.target.value)} required />
        <textarea
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          placeholder="Reason"
          required
        />
        <button type="submit">Submit Leave</button>
      </form>

      <h3>Leave Records</h3>
      <ul>
        {leaveRecords.map((leave) => {
          const staff = staffList.find(s => s.id === leave.staffId);
          return (
            <li key={leave.id} style={{ marginBottom: "10px" }}>
              <strong>{staff?.name || 'Unknown'}</strong>: {leave.fromDate} to {leave.toDate} — {leave.reason} [{leave.status}]
              <div>
                {leave.status === 'Pending' && (
                  <>
                    <button onClick={() => updateStatus(leave.id, 'Approved')} style={{ marginRight: 5 }}>Approve</button>
                    <button onClick={() => updateStatus(leave.id, 'Rejected')}>Reject</button>
                  </>
                )}
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default LeaveForm;
