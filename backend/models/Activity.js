const mongoose = require("mongoose");

const activitySchema = new mongoose.Schema(
  {
    childId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    appUsed: String,
    websiteVisited: String,
    location: {
      lat: Number,
      lng: Number,
    },
  },
  { timestamps: true } // IMPORTANT
);

module.exports = mongoose.model("Activity", activitySchema);