// backend/routes/staff.js
const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = "./data/staff.json";

// Get all staff
router.get("/", (req, res) => {
  const data = JSON.parse(fs.readFileSync(path));
  res.json(data);
});

// Add staff
router.post("/", (req, res) => {
  const data = JSON.parse(fs.readFileSync(path));
  const newStaff = { id: Date.now(), ...req.body };
  data.push(newStaff);
  fs.writeFileSync(path, JSON.stringify(data, null, 2));
  res.status(201).json({ message: "Staff added", staff: newStaff });
});

module.exports = router;
