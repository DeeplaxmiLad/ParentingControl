const mongoose = require("mongoose");

const taskRequestSchema = new mongoose.Schema(
  {
    childId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    message: String,
    status: { type: String, default: "pending" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("TaskRequest", taskRequestSchema);