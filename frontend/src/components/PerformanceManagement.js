import React, { useEffect, useState } from 'react';

const PerformanceManagement = () => {
  const [staffList, setStaffList] = useState([]);
  const [selectedStaffId, setSelectedStaffId] = useState('');
  const [form, setForm] = useState({
    kpis: '',
    feedback: '',
    reviews: '',
    evaluation: '',
    goals: '',
    improvementPlan: '',
    rewards: '',
    rating: ''
  });

  useEffect(() => {
    fetch('http://localhost:5000/api/staff')
      .then((res) => res.json())
      .then((data) => setStaffList(data))
      .catch((err) => console.error('Error fetching staff:', err));
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedStaffId) {
      alert('Please select a staff member');
      return;
    }

    fetch('http://localhost:5000/api/performance', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ staffId: selectedStaffId, ...form })
    })
      .then((res) => res.json())
      .then(() => {
        alert('Performance saved successfully!');
        setForm({
          kpis: '',
          feedback: '',
          reviews: '',
          evaluation: '',
          goals: '',
          improvementPlan: '',
          rewards: '',
          rating: ''
        });
        setSelectedStaffId('');
      })
      .catch((err) => {
        console.error('Error saving performance:', err);
        alert('Failed to save performance.');
      });
  };

  return (
    <div className="container">
      <h2>Performance Management</h2>
      <form onSubmit={handleSubmit} className="form">
        <div className="form-group">
          <label>Select Staff:</label>
          <select
            value={selectedStaffId}
            onChange={(e) => setSelectedStaffId(e.target.value)}
            required
          >
            <option value="">Select Staff</option>
            {staffList.map((staff) => (
              <option key={staff.id} value={staff.id}>
                {staff.name}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>Indicators (KPIs):</label>
          <textarea name="kpis" value={form.kpis} onChange={handleChange} />
        </div>

        <div className="form-group">
          <label>Student Feedback:</label>
          <textarea name="feedback" value={form.feedback} onChange={handleChange} />
        </div>

        <div className="form-group">
          <label>Peer Reviews:</label>
          <textarea name="reviews" value={form.reviews} onChange={handleChange} />
        </div>

        <div className="form-group">
          <label>Evaluation Cycle:</label>
          <input
            type="text"
            name="evaluation"
            value={form.evaluation}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Goals & Objectives:</label>
          <textarea name="goals" value={form.goals} onChange={handleChange} />
        </div>

        <div className="form-group">
          <label>Performance Improvement Plan:</label>
          <textarea
            name="improvementPlan"
            value={form.improvementPlan}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Recognition & Rewards:</label>
          <textarea name="rewards" value={form.rewards} onChange={handleChange} />
        </div>

        <div className="form-group">
          <label>Performance Rating:</label>
          <select name="rating" value={form.rating} onChange={handleChange}>
            <option value="">Select Rating</option>
            <option value="Excellent">Excellent</option>
            <option value="Good">Good</option>
            <option value="Average">Average</option>
            <option value="Below Average">Below Average</option>
          </select>
        </div>

        <button type="submit">Save Performance</button>
      </form>
    </div>
  );
};

export default PerformanceManagement;
