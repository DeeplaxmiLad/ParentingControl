const express = require("express");
const router = express.Router();
const Goal = require("../models/Goal");

/* GET GOALS */
router.get("/:childId", async (req, res) => {
  const goals = await Goal.find({ childId: req.params.childId });
  res.json(goals);
});

/* CREATE GOAL */
router.post("/", async (req, res) => {
  const goal = await Goal.create(req.body);
  res.json(goal);
});

/* TOGGLE GOAL */
router.put("/:id", async (req, res) => {
  const goal = await Goal.findById(req.params.id);
  goal.completed = !goal.completed;
  await goal.save();
  res.json(goal);
});

module.exports = router;