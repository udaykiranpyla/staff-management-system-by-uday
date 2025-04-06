import React, { useState, useEffect } from "react";
import axios from "axios";

const Attendance = () => {
  const [staffId, setStaffId] = useState("");
  const [logs, setLogs] = useState([]);

  const fetchLogs = () => {
    axios.get("http://localhost:5000/api/attendance").then((res) => {
      const today = new Date().toISOString().split("T")[0];
      const todayLogs = res.data.filter((log) =>
        log.time.startsWith(today)
      );
      setLogs(todayLogs);
    });
  };

  const handleAction = (action) => {
    if (!staffId) return alert("Enter Staff ID");

    axios
      .post("http://localhost:5000/api/attendance", { staffId, action })
      .then(() => {
        fetchLogs();
      });
  };

  useEffect(() => {
    fetchLogs();
  }, []);

  return (
    <div>
      <h2>Attendance</h2>
      <input
        placeholder="Enter Staff ID"
        value={staffId}
        onChange={(e) => setStaffId(e.target.value)}
      />
      <button onClick={() => handleAction("check-in")}>Check-In</button>
      <button onClick={() => handleAction("check-out")}>Check-Out</button>

      <h3>Today's Logs</h3>
      <ul>
        {logs.map((log) => (
          <li key={log.id}>
            {log.staffId} - {log.action} - {new Date(log.time).toLocaleTimeString()}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Attendance;
