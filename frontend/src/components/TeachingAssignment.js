// src/components/TeachingAssignment.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function TeachingAssignment() {
  const [assignment, setAssignment] = useState({
    teacherId: '',
    subject: '',
    classAssigned: '',
    workload: ''
  });

  const [assignmentsList, setAssignmentsList] = useState([]);

  const handleChange = (e) => {
    setAssignment({ ...assignment, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!assignment.teacherId || !assignment.subject || !assignment.classAssigned) {
      alert("Please fill all required fields.");
      return;
    }
    try {
      await axios.post('http://localhost:5000/api/teaching-assignments', assignment);
      setAssignment({ teacherId: '', subject: '', classAssigned: '', workload: '' });
      fetchAssignments();
    } catch (err) {
      console.error('Error saving assignment:', err);
    }
  };

  const fetchAssignments = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/teaching-assignments');
      setAssignmentsList(response.data);
    } catch (err) {
      console.error('Error fetching assignments:', err);
    }
  };

  useEffect(() => {
    fetchAssignments();
  }, []);

  return (
    <div>
      <h2>Teaching Assignment & Scheduling</h2>
      <form onSubmit={handleSubmit} className="form">
        <input
          type="text"
          name="teacherId"
          placeholder="Teacher ID"
          value={assignment.teacherId}
          onChange={handleChange}
        />
        <input
          type="text"
          name="subject"
          placeholder="Subject"
          value={assignment.subject}
          onChange={handleChange}
        />
        <input
          type="text"
          name="classAssigned"
          placeholder="Class Assigned (e.g., 10A)"
          value={assignment.classAssigned}
          onChange={handleChange}
        />
        <input
          type="text"
          name="workload"
          placeholder="Workload (e.g., 15 periods/week)"
          value={assignment.workload}
          onChange={handleChange}
        />
        <button type="submit">Assign</button>
      </form>

      <h3>Assigned Teaching Work</h3>
      <ul>
        {assignmentsList.map((a, index) => (
          <li key={index}>
            <strong>Teacher ID:</strong> {a.teacherId} |
            <strong> Subject:</strong> {a.subject} |
            <strong> Class:</strong> {a.classAssigned} |
            <strong> Workload:</strong> {a.workload}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TeachingAssignment;
