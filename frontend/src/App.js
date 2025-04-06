import React, { useEffect, useState } from "react";
import axios from "axios";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import PayrollManagement from "./components/PayrollManagement";
import LeaveForm from "./components/LeaveForm";
import TeachingAssignment from "./components/TeachingAssignment";
import PerformanceManagement from "./components/PerformanceManagement";
import DocumentUpload from "./components/DocumentUpload";
import DocumentList from "./components/DocumentList";

import "./styles.css";

function App() {
  return (
    <Router>
      <div className="container">
        <h1>Staff Management System</h1>

        <nav className="nav">
          <Link to="/">Dashboard</Link>
          <Link to="/payroll">Payroll</Link>
          <Link to="/leave">Apply Leave</Link>
          <Link to="/performance">Performance</Link>
          <Link to="/teaching">Teaching</Link>
          <Link to="/documents">Documents</Link>
        </nav>

        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/payroll" element={<PayrollManagement />} />
          <Route path="/leave" element={<LeaveForm />} />
          <Route path="/performance" element={<PerformanceManagement />} />
          <Route path="/teaching" element={<TeachingAssignment />} />
          <Route path="/documents" element={<DocumentManagement />} />
        </Routes>
      </div>
    </Router>
  );
}

// ------------------------------
// Dashboard Section
// ------------------------------
function Dashboard() {
  const [staff, setStaff] = useState([]);
  const [attendanceLogs, setAttendanceLogs] = useState([]);
  const [selectedStaffId, setSelectedStaffId] = useState("");

  const fetchStaff = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/staff");
      const data = Array.isArray(res.data) ? res.data : [];
      setStaff(data.filter((s) => s && s.personal));
    } catch (error) {
      console.error("Failed to fetch staff:", error);
      setStaff([]);
    }
  };

  const fetchAttendance = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/attendance");
      const today = new Date().toISOString().split("T")[0];
      setAttendanceLogs(res.data.filter((log) => log.time.startsWith(today)));
    } catch (error) {
      console.error("Failed to fetch attendance:", error);
    }
  };

  useEffect(() => {
    fetchStaff();
    fetchAttendance();
  }, []);

  const markAttendance = (action) => {
    if (!selectedStaffId) return alert("Select staff");

    axios
      .post("http://localhost:5000/api/attendance", {
        staffId: selectedStaffId,
        action,
      })
      .then(() => {
        fetchAttendance();
        setSelectedStaffId("");
      });
  };

  return (
    <>
      <StaffForm onAdd={fetchStaff} />

      <h2>Staff List</h2>
      <StaffList staff={staff} />

      <h2>Attendance</h2>
      <select
        value={selectedStaffId}
        onChange={(e) => setSelectedStaffId(e.target.value)}
      >
        <option value="">Select Staff</option>
        {staff.map((s) => (
          <option key={s.id} value={s.id}>
            {s.personal?.fullName || "Unnamed"} ({s.id})
          </option>
        ))}
      </select>
      <button onClick={() => markAttendance("check-in")}>Check-In</button>
      <button onClick={() => markAttendance("check-out")}>Check-Out</button>

      <h3>Today's Attendance Logs</h3>
      <ul>
        {attendanceLogs.map((log) => (
          <li key={log.id}>
            Staff ID: {log.staffId} | {log.action} at{" "}
            {new Date(log.time).toLocaleTimeString()}
          </li>
        ))}
      </ul>
    </>
  );
}

// ------------------------------
// Staff Form
// ------------------------------
function StaffForm({ onAdd }) {
  const [form, setForm] = useState({
    personal: {
      fullName: "",
      dob: "",
      gender: "",
      address: "",
      phone: "",
      email: "",
      emergencyContact: "",
    },
    professional: {
      qualification: "",
      experience: "",
      specialization: "",
      joiningDate: "",
      status: "",
      department: "",
    },
    health: {
      history: "",
      insurance: "",
      vaccination: "",
      allergies: "",
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post("http://localhost:5000/api/staff", form).then(() => {
      setForm({
        personal: {
          fullName: "",
          dob: "",
          gender: "",
          address: "",
          phone: "",
          email: "",
          emergencyContact: "",
        },
        professional: {
          qualification: "",
          experience: "",
          specialization: "",
          joiningDate: "",
          status: "",
          department: "",
        },
        health: {
          history: "",
          insurance: "",
          vaccination: "",
          allergies: "",
        },
      });
      onAdd();
    });
  };

  const update = (section, field, value) => {
    setForm((prev) => ({
      ...prev,
      [section]: { ...prev[section], [field]: value },
    }));
  };

  return (
    <div>
      <h2>Add Staff</h2>
      <form onSubmit={handleSubmit} className="form-grid">
        <fieldset>
          <legend>Personal Info</legend>
          <input placeholder="Full Name" value={form.personal.fullName} onChange={(e) => update("personal", "fullName", e.target.value)} />
          <input type="date" value={form.personal.dob} onChange={(e) => update("personal", "dob", e.target.value)} />
          <input placeholder="Gender" value={form.personal.gender} onChange={(e) => update("personal", "gender", e.target.value)} />
          <input placeholder="Address" value={form.personal.address} onChange={(e) => update("personal", "address", e.target.value)} />
          <input placeholder="Phone" value={form.personal.phone} onChange={(e) => update("personal", "phone", e.target.value)} />
          <input placeholder="Email" value={form.personal.email} onChange={(e) => update("personal", "email", e.target.value)} />
          <input placeholder="Emergency Contact" value={form.personal.emergencyContact} onChange={(e) => update("personal", "emergencyContact", e.target.value)} />
        </fieldset>

        <fieldset>
          <legend>Professional Info</legend>
          <input placeholder="Qualification" value={form.professional.qualification} onChange={(e) => update("professional", "qualification", e.target.value)} />
          <input placeholder="Experience" value={form.professional.experience} onChange={(e) => update("professional", "experience", e.target.value)} />
          <input placeholder="Specialization" value={form.professional.specialization} onChange={(e) => update("professional", "specialization", e.target.value)} />
          <input type="date" value={form.professional.joiningDate} onChange={(e) => update("professional", "joiningDate", e.target.value)} />
          <input placeholder="Status" value={form.professional.status} onChange={(e) => update("professional", "status", e.target.value)} />
          <input placeholder="Department" value={form.professional.department} onChange={(e) => update("professional", "department", e.target.value)} />
        </fieldset>

        <fieldset>
          <legend>Health Records</legend>
          <input placeholder="Medical History" value={form.health.history} onChange={(e) => update("health", "history", e.target.value)} />
          <input placeholder="Insurance" value={form.health.insurance} onChange={(e) => update("health", "insurance", e.target.value)} />
          <input placeholder="Vaccination" value={form.health.vaccination} onChange={(e) => update("health", "vaccination", e.target.value)} />
          <input placeholder="Allergies" value={form.health.allergies} onChange={(e) => update("health", "allergies", e.target.value)} />
        </fieldset>

        <button type="submit">Add Staff</button>
      </form>
    </div>
  );
}

// ------------------------------
// Staff List
// ------------------------------
function StaffList({ staff }) {
  return (
    <ul>
      {staff.map((s) => (
        <li key={s.id}>
          {s.personal?.fullName || "Unnamed"} - {s.personal?.email || "No Email"} - {s.professional?.department || "No Department"}
        </li>
      ))}
    </ul>
  );
}

// ------------------------------
// Document Management Wrapper
// ------------------------------
function DocumentManagement() {
  return (
    <div>
      <h2>Document Management</h2>
      <DocumentUpload />
      <DocumentList />
    </div>
  );
}

export default App;
