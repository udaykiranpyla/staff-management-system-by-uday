const express = require("express");
const fs = require("fs");
const path = require("path");

const router = express.Router();
const leavesFile = path.join(__dirname, "../data/leaves.json");

// Helper functions
const readLeaves = () => {
  const data = fs.readFileSync(leavesFile, "utf8");
  return JSON.parse(data);
};

const saveLeaves = (data) => {
  fs.writeFileSync(leavesFile, JSON.stringify(data, null, 2));
};

// 📥 Get all leave applications
router.get("/", (req, res) => {
  const leaves = readLeaves();
  res.json(leaves);
});

// 📝 Apply for a new leave
router.post("/", (req, res) => {
  const leaves = readLeaves();
  const newLeave = {
    id: Date.now(),
    ...req.body,
    status: "Pending",
  };
  leaves.push(newLeave);
  saveLeaves(leaves);
  res.json({ message: "Leave applied successfully", leave: newLeave });
});

// 🔁 Update leave status (approve/reject)
router.put("/:id/status", (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  let leaves = readLeaves();

  const updatedLeaves = leaves.map((leave) =>
    leave.id == id ? { ...leave, status } : leave
  );

  saveLeaves(updatedLeaves);
  res.json({ message: `Leave ${status}`, id });
});

module.exports = router;
