const Rule = require("../models/Rule");

exports.setRule = async (req, res) => {
  try {
    const rule = await Rule.findOneAndUpdate(
      { parentId: req.body.parentId },
      req.body,
      { upsert: true, new: true }
    );

    res.json(rule);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getRule = async (req, res) => {
  try {
    const rule = await Rule.findOne({ parentId: req.params.parentId });
    res.json(rule);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};