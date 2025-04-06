const express = require("express");
const fs = require("fs");
const path = require("path");
const router = express.Router();

const filePath = path.join(__dirname, "../data/attendance.json");

// Get all attendance records
router.get("/", (req, res) => {
  const data = JSON.parse(fs.readFileSync(filePath));
  res.json(data);
});

// Check-in or check-out
router.post("/", (req, res) => {
  const { staffId, action } = req.body;

  if (!staffId || !["check-in", "check-out"].includes(action)) {
    return res.status(400).json({ message: "Invalid request" });
  }

  const record = {
    id: Date.now(),
    staffId,
    action,
    time: new Date().toISOString(),
  };

  const data = JSON.parse(fs.readFileSync(filePath));
  data.push(record);
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));

  res.status(201).json({ message: "Attendance recorded", record });
});

module.exports = router;
