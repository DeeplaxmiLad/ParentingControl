const express = require("express");
const router = express.Router();
const Rule = require("../models/Rule");

/* CREATE OR UPDATE RULE */
router.post("/", async (req, res) => {
  try {
    let rule = await Rule.findOne();

    if (rule) {
      rule = await Rule.findByIdAndUpdate(rule._id, req.body, {
        new: true,
      });
    } else {
      rule = await Rule.create(req.body);
    }

    res.json(rule);
  } catch (error) {
    res.status(500).json({ message: "Error saving rule" });
  }
});

/* GET RULE */
router.get("/", async (req, res) => {
  try {
    let rule = await Rule.findOne();

    if (!rule) {
      rule = await Rule.create({
        dailyLimit: 0,
        rewardMinutes: 0,
        blockedApps: [],
        blockedWebsites: [],
        locationTracking: false,
      });
    }

    res.json(rule);
  } catch (error) {
    res.status(500).json({ message: "Error fetching rule" });
  }
});

/* ADD REWARD */
router.put("/reward/:id", async (req, res) => {
  try {
    const rule = await Rule.findById(req.params.id);

    if (!rule) {
      return res.status(404).json({ message: "Rule not found" });
    }

    rule.rewardMinutes += 30; // ✅ FIXED
    await rule.save();

    res.json(rule);
  } catch (error) {
    res.status(500).json({ message: "Error updating reward" });
  }
});

module.exports = router;