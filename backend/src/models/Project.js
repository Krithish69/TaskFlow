const mongoose = require("mongoose");

const ProjectSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String },
    team: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Team",
      required: true,
    },
    deadline: { type: Date },
    status: {
      type: String,
      enum: ["Active", "Archived", "Completed"],
      default: "Active",
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Project", ProjectSchema);
