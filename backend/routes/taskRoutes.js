const express = require("express");
const router = express.Router();
const TaskRequest = require("../models/TaskRequest");
const Rule = require("../models/Rule");

/* GET ALL REQUESTS */
router.get("/", async (req, res) => {
  const tasks = await TaskRequest.find().sort({ createdAt: -1 });
  res.json(tasks);
});

/* CREATE REQUEST */
router.post("/", async (req, res) => {
  const task = await TaskRequest.create(req.body);
  res.json(task);
});

/* APPROVE REQUEST */
router.put("/approve/:id", async (req, res) => {
  const task = await TaskRequest.findById(req.params.id);

  if (!task) return res.status(404).json({ message: "Not found" });

  task.status = "approved";
  await task.save();

  const rule = await Rule.findOne();
  if (rule) {
    rule.rewardMinutes += 30;
    await rule.save();
  }

  res.json(task);
});

/* REJECT REQUEST */
router.put("/reject/:id", async (req, res) => {
  const task = await TaskRequest.findById(req.params.id);

  if (!task) return res.status(404).json({ message: "Not found" });

  task.status = "rejected";
  await task.save();

  res.json(task);
});

module.exports = router;