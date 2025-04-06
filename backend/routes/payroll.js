import React, { useState, useEffect } from 'react';
import './Payroll.css';

const Payroll = () => {
  const [staffList, setStaffList] = useState([]);
  const [selectedStaff, setSelectedStaff] = useState('');
  const [payroll, setPayroll] = useState({
    basicPay: '',
    hra: '',
    da: '',
    travel: '',
    pf: '',
    tax: '',
    loanDeduction: '',
    bankAccount: '',
    directDeposit: false,
  });

  const [netSalary, setNetSalary] = useState(0);

  useEffect(() => {
    fetch('http://localhost:5000/api/staff')
      .then((res) => res.json())
      .then((data) => setStaffList(data))
      .catch((err) => console.error('Error fetching staff:', err));
  }, []);

  useEffect(() => {
    const {
      basicPay,
      hra,
      da,
      travel,
      pf,
      tax,
      loanDeduction,
    } = payroll;

    const totalEarnings =
      Number(basicPay || 0) +
      Number(hra || 0) +
      Number(da || 0) +
      Number(travel || 0);

    const totalDeductions =
      Number(pf || 0) +
      Number(tax || 0) +
      Number(loanDeduction || 0);

    setNetSalary(totalEarnings - totalDeductions);
  }, [payroll]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newPayroll = { ...payroll, staffId: selectedStaff, netSalary };

    fetch('http://localhost:5000/api/payroll', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newPayroll),
    })
      .then((res) => res.json())
      .then((data) => alert('Payroll saved successfully!'))
      .catch((err) => alert('Error saving payroll'));
  };

  return (
    <div className="payroll-container">
      <h2>Payroll Management</h2>
      <form onSubmit={handleSubmit}>
        <select
          value={selectedStaff}
          onChange={(e) => setSelectedStaff(e.target.value)}
        >
          <option value="">Select Staff</option>
          {staffList.map((staff) => (
            <option key={staff.id} value={staff.id}>
              {staff.name}
            </option>
          ))}
        </select>

        <input
          type="number"
          placeholder="Basic Pay"
          value={payroll.basicPay}
          onChange={(e) => setPayroll({ ...payroll, basicPay: e.target.value })}
        />
        <input
          type="number"
          placeholder="HRA"
          value={payroll.hra}
          onChange={(e) => setPayroll({ ...payroll, hra: e.target.value })}
        />
        <input
          type="number"
          placeholder="DA"
          value={payroll.da}
          onChange={(e) => setPayroll({ ...payroll, da: e.target.value })}
        />
        <input
          type="number"
          placeholder="Travel"
          value={payroll.travel}
          onChange={(e) => setPayroll({ ...payroll, travel: e.target.value })}
        />
        <input
          type="number"
          placeholder="PF"
          value={payroll.pf}
          onChange={(e) => setPayroll({ ...payroll, pf: e.target.value })}
        />
        <input
          type="number"
          placeholder="Tax"
          value={payroll.tax}
          onChange={(e) => setPayroll({ ...payroll, tax: e.target.value })}
        />
        <input
          type="number"
          placeholder="Loan Deduction"
          value={payroll.loanDeduction}
          onChange={(e) => setPayroll({ ...payroll, loanDeduction: e.target.value })}
        />
        <input
          type="text"
          placeholder="Bank Account"
          value={payroll.bankAccount}
          onChange={(e) => setPayroll({ ...payroll, bankAccount: e.target.value })}
        />

        {/* Direct Deposit checkbox */}
        <div className="checkbox-row">
          <label htmlFor="directDeposit">Direct Deposit</label>
          <input
            type="checkbox"
            id="directDeposit"
            checked={payroll.directDeposit}
            onChange={(e) =>
              setPayroll({ ...payroll, directDeposit: e.target.checked })
            }
          />
        </div>

        <p>Net Salary: ₹{netSalary}</p>

        <button type="submit">Save Payroll</button>
      </form>
    </div>
  );
};

export default Payroll;
