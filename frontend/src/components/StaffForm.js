import React, { useState } from "react";
import axios from "axios";
import "./Form.css";

function StaffForm({ onStaffAdded }) {
  const [form, setForm] = useState({
    fullName: "",
    dob: "",
    gender: "",
    address: "",
    phone: "",
    email: "",
    emergencyContact: "",
    qualifications: "",
    experience: "",
    specialization: "",
    dateOfJoining: "",
    employmentStatus: "",
    department: "",
    medicalHistory: "",
    insurance: "",
    vaccination: "",
    allergies: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post("http://localhost:5000/api/staff", form).then(() => {
      onStaffAdded();
      setForm({
        fullName: "",
        dob: "",
        gender: "",
        address: "",
        phone: "",
        email: "",
        emergencyContact: "",
        qualifications: "",
        experience: "",
        specialization: "",
        dateOfJoining: "",
        employmentStatus: "",
        department: "",
        medicalHistory: "",
        insurance: "",
        vaccination: "",
        allergies: ""
      });
    });
  };

  return (
    <form className="staff-form" onSubmit={handleSubmit}>
      <h2>Personal Information</h2>
      <input name="fullName" placeholder="Full Name" value={form.fullName} onChange={handleChange} />
      <input name="dob" type="date" placeholder="DOB" value={form.dob} onChange={handleChange} />
      <input name="gender" placeholder="Gender" value={form.gender} onChange={handleChange} />
      <input name="address" placeholder="Address" value={form.address} onChange={handleChange} />
      <input name="phone" placeholder="Phone" value={form.phone} onChange={handleChange} />
      <input name="email" placeholder="Email" value={form.email} onChange={handleChange} />
      <input name="emergencyContact" placeholder="Emergency Contact" value={form.emergencyContact} onChange={handleChange} />

      <h2>Professional Info</h2>
      <input name="qualifications" placeholder="Qualifications" value={form.qualifications} onChange={handleChange} />
      <input name="experience" placeholder="Experience" value={form.experience} onChange={handleChange} />
      <input name="specialization" placeholder="Specialization" value={form.specialization} onChange={handleChange} />
      <input name="dateOfJoining" type="date" value={form.dateOfJoining} onChange={handleChange} />
      <input name="employmentStatus" placeholder="Employment Status" value={form.employmentStatus} onChange={handleChange} />
      <input name="department" placeholder="Department" value={form.department} onChange={handleChange} />

      <h2>Health Records</h2>
      <input name="medicalHistory" placeholder="Medical History" value={form.medicalHistory} onChange={handleChange} />
      <input name="insurance" placeholder="Insurance Details" value={form.insurance} onChange={handleChange} />
      <input name="vaccination" placeholder="Vaccination Records" value={form.vaccination} onChange={handleChange} />
      <input name="allergies" placeholder="Allergies" value={form.allergies} onChange={handleChange} />

      <button type="submit">Add Staff</button>
    </form>
  );
}

export default StaffForm;
