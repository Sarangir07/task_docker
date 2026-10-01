const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,   // every task must have a title
    },
    completed: {
      type: Boolean,
      default: false,   // new tasks start as "not completed"
    },
  },
  { timestamps: true }  // auto-adds createdAt & updatedAt fields
);

module.exports = mongoose.model("Task", taskSchema);
