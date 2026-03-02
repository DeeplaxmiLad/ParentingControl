const express = require("express");
const router = express.Router();

const Activity = require("../models/Activity"); // ✅ IMPORTANT

const {
  addActivity,
  getActivity,
} = require("../controllers/activityController");

const { protect } = require("../middleware/authMiddleware");

/* -------------------------------- */
/* CHILD ADD ACTIVITY */
/* -------------------------------- */
router.post("/", protect, addActivity);

/* -------------------------------- */
/* WEEKLY REPORT (MUST COME BEFORE :childId) */
/* -------------------------------- */
router.get("/weekly-report", protect, async (req, res) => {
  try {
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

    const report = await Activity.aggregate([
      {
        $match: {
          createdAt: { $gte: oneWeekAgo },
        },
      },
      {
        $group: {
          _id: "$appUsed",
          totalUsage: { $sum: 1 },
        },
      },
      { $sort: { totalUsage: -1 } },
    ]);

    res.json(report);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

/* -------------------------------- */
/* LOCATION HISTORY */
/* -------------------------------- */
router.get("/location-history", protect, async (req, res) => {
  try {
    const locations = await Activity.find({
      "location.lat": { $exists: true },
    })
      .sort({ createdAt: -1 })
      .limit(20);

    res.json(locations);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

/* -------------------------------- */
/* GET ACTIVITY BY CHILD */
/* -------------------------------- */
router.get("/:childId", protect, getActivity);

module.exports = router;