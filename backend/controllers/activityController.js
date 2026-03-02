const Activity = require("../models/Activity");

exports.addActivity = async (req, res) => {
  try {
    const { appUsed, websiteVisited, location } = req.body;

    const activity = await Activity.create({
      childId: req.user._id,
      appUsed,
      websiteVisited,
      location,
    });

    res.json(activity);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getActivity = async (req, res) => {
  try {
    const activities = await Activity.find({
      childId: req.params.childId,
    }).sort({ createdAt: -1 });

    res.json(activities);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};