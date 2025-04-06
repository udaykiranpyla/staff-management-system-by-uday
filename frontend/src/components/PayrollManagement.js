import React, { useState, useEffect } from "react";
import axios from "axios";
import jsPDF from "jspdf";
import "jspdf-autotable";

const PayrollManagement = () => {
  const [staffList, setStaffList] = useState([]);
  const [payrollRecords, setPayrollRecords] = useState([]);
  const [payroll, setPayroll] = useState({
    staffId: "",
    basicPay: 0,
    hra: 0,
    da: 0,
    travel: 0,
    pf: 0,
    tax: 0,
    loan: 0,
    bankAccount: "",
    directDeposit: false,
    month: "2025-04",
  });

  const fetchStaff = async () => {
    const res = await axios.get("http://localhost:5000/api/staff");
    setStaffList(res.data);
  };

  const fetchPayroll = async () => {
    const res = await axios.get("http://localhost:5000/api/payroll");
    setPayrollRecords(res.data);
  };

  useEffect(() => {
    fetchStaff();
    fetchPayroll();
  }, []);

  const calculateSalary = () => {
    const { basicPay, hra, da, travel, pf, tax, loan } = payroll;
    const gross =
      Number(basicPay) + Number(hra) + Number(da) + Number(travel);
    const deductions = Number(pf) + Number(tax) + Number(loan);
    return gross - deductions;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setPayroll({
      ...payroll,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async () => {
    const netSalary = calculateSalary();
    await axios.post("http://localhost:5000/api/payroll", {
      ...payroll,
      netSalary,
    });
    alert("Payroll saved successfully");
    fetchPayroll(); // refresh list
  };

  const generatePayslip = (record) => {
    const doc = new jsPDF();
    const staff = staffList.find((s) => s.id === record.staffId);
    const staffName = staff?.name || "Unknown";

    doc.setFontSize(16);
    doc.text("Pay Slip", 14, 20);
    doc.setFontSize(12);
    doc.text(`Name: ${staffName}`, 14, 30);
    doc.text(`Month: ${record.month}`, 14, 38);
    doc.text(`Bank Account: ${record.bankAccount}`, 14, 46);

    doc.autoTable({
      startY: 55,
      head: [["Component", "Amount"]],
      body: [
        ["Basic Pay", Number(record.basicPay).toFixed(2)],
        ["HRA", Number(record.hra).toFixed(2)],
        ["DA", Number(record.da).toFixed(2)],
        ["Travel", Number(record.travel).toFixed(2)],
        ["PF", `-${Number(record.pf).toFixed(2)}`],
        ["Tax", `-${Number(record.tax).toFixed(2)}`],
        ["Loan", `-${Number(record.loan).toFixed(2)}`],
        ["Net Salary", Number(record.netSalary).toFixed(2)],
      ],
    });

    doc.save(`Payslip_${staffName}_${record.month}.pdf`);
  };

  return (
    <div>
      <h2>Payroll Management</h2>

      <select name="staffId" value={payroll.staffId} onChange={handleChange}>
        <option value="">Select Staff</option>
        {staffList.map((staff) => (
          <option key={staff.id} value={staff.id}>
            {staff.name}
          </option>
        ))}
      </select>

      <input
        type="number"
        name="basicPay"
        placeholder="Basic Pay"
        onChange={handleChange}
      />
      <input
        type="number"
        name="hra"
        placeholder="HRA"
        onChange={handleChange}
      />
      <input
        type="number"
        name="da"
        placeholder="DA"
        onChange={handleChange}
      />
      <input
        type="number"
        name="travel"
        placeholder="Travel"
        onChange={handleChange}
      />
      <input
        type="number"
        name="pf"
        placeholder="PF"
        onChange={handleChange}
      />
      <input
        type="number"
        name="tax"
        placeholder="Tax"
        onChange={handleChange}
      />
      <input
        type="number"
        name="loan"
        placeholder="Loan Deduction"
        onChange={handleChange}
      />
      <input
        type="text"
        name="bankAccount"
        placeholder="Bank Account"
        onChange={handleChange}
      />
      <label>
        <input
          type="checkbox"
          name="directDeposit"
          onChange={handleChange}
        />{" "}
        Direct Deposit
      </label>
      <p>Net Salary: ₹{calculateSalary().toFixed(2)}</p>
      <button onClick={handleSubmit}>Save Payroll</button>

      <hr />
      <h3>Payroll Records</h3>
      <ul>
        {payrollRecords.map((record, index) => {
          const staff = staffList.find((s) => s.id === record.staffId);
          return (
            <li key={index}>
              <strong>{staff?.name || "Unknown"}</strong> - ₹
              {Number(record.netSalary).toFixed(2)} - {record.month}
              <button
                onClick={() => generatePayslip(record)}
                style={{ marginLeft: "1rem" }}
              >
                Generate Pay Slip
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default PayrollManagement;
