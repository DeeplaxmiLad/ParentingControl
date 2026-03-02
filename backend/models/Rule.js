const mongoose = require("mongoose");

const ruleSchema = new mongoose.Schema({
  parentId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  screenTimeLimit: Number,
  blockedApps: [String],
  blockedWebsites: [String],
  locationTracking: Boolean,

  dailyLimit: { type: Number, default: 0 },
  sleepStart: String,
  sleepEnd: String,

  rewardMinutes: { type: Number, default: 0 }, // ✅ FIXED
});

module.exports = mongoose.model("Rule", ruleSchema);




